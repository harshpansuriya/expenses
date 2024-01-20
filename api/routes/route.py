from fastapi import APIRouter, HTTPException, Query
from models.expenses import Expense
from config.database import collection_name
from schema.schemas import list_serial
from bson import ObjectId, Decimal128

from datetime import datetime, timedelta
from collections import defaultdict


router = APIRouter()


def calculate_total_expenses(expenses):
    total_expenses = sum(float(expense["price"]) for expense in expenses)
    return str(total_expenses)


def calculate_category_analytics(expenses):
    category_analytics = defaultdict(float)
    for expense in expenses:
        category_analytics[expense["category"]] += float(str(expense["price"]))
    return {category: (str(total)) for category, total in category_analytics.items()}


def calculate_expenses_over_time(expenses, interval):
    start_date = datetime.now() - timedelta(days=interval - 1)
    expenses_over_time = defaultdict(float)

    for expense in expenses:
        expense_date = datetime.strptime(
            expense["date"], "%Y-%m-%dT%H:%M:%S.%fZ")
        if start_date <= expense_date <= datetime.now():
            expenses_over_time[expense_date.strftime(
                "%Y-%m-%d")] += float(str(expense["price"]))

    return {date: (str(total)) for date, total in expenses_over_time.items()}


def calculate_multi_month_analytics(expenses, months):
    # Filter expenses for the specified months
    selected_months_expenses = [
        expense for expense in expenses
        if datetime.strptime(expense["date"], "%Y-%m-%dT%H:%M:%S.%fZ").month in months
    ]

    # Calculate total expenses and category-wise analytics for the specified months
    total_expenses = calculate_total_expenses(selected_months_expenses)
    category_analytics = calculate_category_analytics(selected_months_expenses)

    return {"total_expenses": total_expenses, "category_analytics": category_analytics}


@router.get("/")
async def get_expenses(month: int = None):
    expenses = list_serial(collection_name.find())

    # If month is provided, filter expenses for that month
    if month:
        current_month_expenses = [
            expense for expense in expenses
            if datetime.strptime(expense["date"], "%Y-%m-%dT%H:%M:%S.%fZ").month == month
        ]
    else:
        # Otherwise, return all expenses
        current_month_expenses = expenses

    total_expenses = calculate_total_expenses(current_month_expenses)

    return {"expenses": current_month_expenses, "total_expenses": total_expenses}


@router.get("/current_month")
async def get_current_month_expenses():
    expenses = list_serial(collection_name.find())

    # Filter expenses for the current month
    current_month_expenses = [
        expense for expense in expenses
        if datetime.strptime(expense["date"], "%Y-%m-%dT%H:%M:%S.%fZ").month == datetime.now().month
    ]

    total_expenses = calculate_total_expenses(current_month_expenses)

    return {"expenses": current_month_expenses, "total_expenses": total_expenses}


@router.get("/category_analytics")
async def get_category_analytics():
    expenses = list_serial(collection_name.find())

    # Filter expenses for the current month
    current_month_expenses = [
        expense for expense in expenses
        if datetime.strptime(expense["date"], "%Y-%m-%dT%H:%M:%S.%fZ").month == datetime.now().month
    ]

    category_analytics = calculate_category_analytics(current_month_expenses)

    return {"category_analytics": category_analytics}


@router.get("/expenses_over_time")
async def get_expenses_over_time(interval: int = 7):
    expenses = list_serial(collection_name.find())

    # Calculate total expenses over time for the specified interval
    expenses_over_time = calculate_expenses_over_time(expenses, interval)

    return {"expenses_over_time": expenses_over_time}


@router.get("/current_month_analytics")
async def get_current_month_analytics():
    expenses = list_serial(collection_name.find())

    months = [datetime.now().month]

    # Calculate analytics for the specified months
    multi_month_analytics = calculate_multi_month_analytics(expenses, months)

    return {"selected_months": months, "analytics": multi_month_analytics}


@router.post("/")
async def post_expenses(expense: Expense):
    try:
        inserted_result = collection_name.insert_one(expense.dict())
        expense.id = str(inserted_result.inserted_id)
        return expense
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{id}")
async def put_expense(id: str, expense: Expense):
    try:
        result = collection_name.find_one_and_update(
            {"_id": ObjectId(id)}, {"$set": expense.dict()}, return_document=True
        )
        if result:
            return expense
        else:
            raise HTTPException(status_code=404, detail="Expense not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{id}")
async def delete_expense(id: str):
    try:
        result = collection_name.find_one_and_delete({"_id": ObjectId(id)})
        if result:
            return {"message": "Expense deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Expense not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

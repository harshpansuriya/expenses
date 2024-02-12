from fastapi import APIRouter, HTTPException, status, Depends
from models.expenses import Expense
from config.database import collection_name, users_collection
from schema.schemas import list_serial
from bson import ObjectId
from models.user import User

from datetime import datetime, timedelta
from collections import defaultdict

from utils.auth import ACCESS_TOKEN_EXPIRE_MINUTES, authenticate_user, pwd_context, create_access_token, get_current_user
from fastapi.security import OAuth2PasswordRequestForm


from datetime import datetime


router = APIRouter()

# All Functions


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
        expense_date = datetime.strptime(expense["date"], "%d/%m/%Y")
        if start_date <= expense_date <= datetime.now():
            expenses_over_time[expense_date.strftime(
                "%d/%m/%Y")] += float(str(expense["price"]))

    return {date: (str(total)) for date, total in expenses_over_time.items()}


def calculate_multi_month_analytics(expenses, months):
    # Filter expenses for the specified months
    selected_months_expenses = [
        expense for expense in expenses
        if datetime.strptime(expense["date"], "%d/%m/%Y").month in months
    ]

    # Calculate total expenses and category-wise analytics for the specified months
    total_expenses = calculate_total_expenses(selected_months_expenses)
    category_analytics = calculate_category_analytics(selected_months_expenses)

    return {"total_expenses": total_expenses, "category_analytics": category_analytics}


# All Routes

@router.get("/")
async def get_expenses(month: int = None):
    expenses = list_serial(collection_name.find())

    # If month is provided, filter expenses for that month
    if month:
        current_month_expenses = [
            expense for expense in expenses
            if datetime.strptime(expense["date"], "%d/%m/%Y").month == month
        ]
    else:
        # Otherwise, return all expenses
        current_month_expenses = expenses

    if current_month_expenses:
        total_expenses = calculate_total_expenses(current_month_expenses)

    else:
        raise HTTPException(
            status_code=404, detail="No Expenses Found For This Month!")

    # return {"expenses": current_month_expenses, "total_expenses": total_expenses}

    return current_month_expenses


@router.get("/current_month")
async def get_current_month_expenses():
    expenses = list_serial(collection_name.find())

    # Filter expenses for the current month
    current_month_expenses = [
        expense for expense in expenses
        if datetime.strptime(expense["date"], "%d/%m/%Y").month == datetime.now().month
    ]

    total_expenses = calculate_total_expenses(current_month_expenses)

    return {"expenses": current_month_expenses, "total_expenses": total_expenses}


@router.get("/monthly_expenses")
async def get_monthly_expenses(month: int = None):
    expenses = list_serial(collection_name.find())

    # If month is provided, filter expenses for that month
    if month:
        current_month_expenses = [
            expense for expense in expenses
            if datetime.strptime(expense["date"], "%d/%m/%Y").month == month
        ]
    else:
        # Otherwise, return all expenses
        current_month_expenses = expenses

    if current_month_expenses:
        total_expenses = calculate_total_expenses(current_month_expenses)

    else:
        raise HTTPException(
            status_code=404, detail="No Expenses Found For This Month!")

    return {"expenses": current_month_expenses, "total_expenses": total_expenses}


@router.get("/category_analytics")
async def get_category_analytics():
    expenses = list_serial(collection_name.find())

    # Filter expenses for the current month
    current_month_expenses = [
        expense for expense in expenses
        if datetime.strptime(expense["date"], "%d/%m/%Y").month == datetime.now().month
    ]

    category_analytics = calculate_category_analytics(current_month_expenses)
    total_expenses = calculate_total_expenses(current_month_expenses)

    return {"category_expense": category_analytics, "total_expenses": total_expenses}


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
        # Convert the date string to a datetime object
        expense_date = datetime.strptime(expense.date, "%Y-%m-%dT%H:%M:%S.%fZ")

        # Format the date according to "DD/MM/YYYY"
        formatted_date = expense_date.strftime("%d/%m/%Y")

        # Update the expense object with the formatted date
        expense.date = formatted_date

        # Insert the updated expense object into the database
        inserted_result = collection_name.insert_one(expense.dict())

        # Update the expense object with the inserted ID
        expense.id = str(inserted_result.inserted_id)

        # Return the updated expense object
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


# Endpoint for user login
@router.post("/login")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# Endpoint for user registration
@router.post("/register")
async def register_user(user: User):
    # Hash user password before storing in the database
    hashed_password = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password
    # Check if username already exists
    existing_user = await users_collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(
            status_code=400, detail="Username already registered")
    # Insert user into the database
    await users_collection.insert_one(user_dict)
    return {"message": "User registered successfully"}


# Example protected route
@router.get("/protected_route")
async def protected_route(user: User = Depends(get_current_user)):
    # If the user is authenticated, the user object will be available
    # You can now access user data and perform actions accordingly
    return {"message": "This is a protected route", "user": user}

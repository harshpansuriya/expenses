from fastapi import APIRouter
from models.expenses import Expense
from config.database import collection_name
from schema.schemas import list_serial
from bson import ObjectId

router = APIRouter()


@router.get('/')
async def get_expenses():
    expenses = list_serial(collection_name.find())
    return expenses


@router.post("/")
async def post_expenses(expense: Expense):
    collection_name.insert_one(dict(expense))


@router.put("/{id}")
async def put_expense(id: str, expense: Expense):
    collection_name.find_one_and_update(
        {"_id": ObjectId(id)}, {"$set": dict(expense)})


@router.delete("/{id}")
async def delete_expense(id: str):
    collection_name.find_one_and_delete(
        {"_id": ObjectId(id)})

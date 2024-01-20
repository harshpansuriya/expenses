from bson import ObjectId
from typing import List
from models.expenses import Expense


def individual_serial(expense) -> dict:
    return {
        "id": str(expense["_id"]),
        "name": expense["name"],
        "price": expense["price"],
        "description": expense["description"],
        "date": expense["date"],
        "category": expense["category"]
    }


def list_serial(expenses) -> List[dict]:
    return [individual_serial(expense) for expense in expenses]

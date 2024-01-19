def individual_serial(expense) -> dict:
    return {
        "id": str(expense["_id"]),
        "name": expense["name"],
        "price": expense["price"],
        "description": expense["description"],
        "date": expense["date"],
        "category": expense["category"]
    }


def list_serial(expenses) -> list:
    return [individual_serial(expense) for expense in expenses]

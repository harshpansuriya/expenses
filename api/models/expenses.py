from pydantic import BaseModel


class Expense(BaseModel):
    name: str
    price: float
    description: str
    date: str
    category: str
    id: str = None

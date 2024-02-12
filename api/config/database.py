from pymongo import MongoClient
from motor.motor_asyncio import AsyncIOMotorClient

client = MongoClient(
    "mongodb+srv://hbpans:apunKing%407434@cluster0.t1elsch.mongodb.net/")

db = client.expense_db

collection_name = db["expense_collection"]
# users_collection = db["users"]


# MongoDB connection string
MONGODB_URI = "mongodb+srv://hbpans:apunKing%407434@cluster0.t1elsch.mongodb.net/"

# Create a MotorClient instance
client1 = AsyncIOMotorClient(MONGODB_URI)

# Access the database
db = client1.your_database_name

# Access the collection
users_collection = db.users

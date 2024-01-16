from pymongo import MongoClient

client = MongoClient(
    "mongodb+srv://hbpans:apunKing%407434@cluster0.t1elsch.mongodb.net/")

db = client.expense_db

collection_name = db["expense_collection"]

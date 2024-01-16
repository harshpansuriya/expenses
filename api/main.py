# mongodb+srv://hbpans:<password>@cluster0.t1elsch.mongodb.net/?retryWrites=true&w=majority


from fastapi import FastAPI
from pymongo.mongo_client import MongoClient
from routes.route import router

app = FastAPI()

app.include_router(router)

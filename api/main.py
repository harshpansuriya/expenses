# # mongodb+srv://hbpans:<password>@cluster0.t1elsch.mongodb.net/?retryWrites=true&w=majority


from fastapi import FastAPI
from pymongo.mongo_client import MongoClient
from routes.route import router

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # Update with your specific origins
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

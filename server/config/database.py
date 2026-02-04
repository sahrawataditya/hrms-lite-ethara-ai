import os
from pymongo import MongoClient
try:
    from dotenv import load_dotenv
except ImportError as e:
    raise ImportError("Missing dependency: install with 'python -m pip install python-dotenv'") from e

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

employee_collection = db["employees"]
attendance_collection = db["attendance"]

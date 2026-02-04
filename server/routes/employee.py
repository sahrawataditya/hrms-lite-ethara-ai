from fastapi import APIRouter, HTTPException, status
from config.database import employee_collection
from config.database import attendance_collection
from config.models import EmployeeCreate

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate):
    if employee_collection.find_one({"employee_id": employee.employee_id}):
        raise HTTPException(
            status_code=400,
            detail="Employee with this ID already exists"
        )

    if employee_collection.find_one({"email": employee.email}):
        raise HTTPException(
            status_code=400,
            detail="Email already in use"
        )

    employee_collection.insert_one(employee.dict())
    return {"message": "Employee created successfully"}


@router.get("/")
def get_all_employees():
    employees = list(employee_collection.find({}, {"_id": 0}))
    total_employees = employee_collection.count_documents({})
    return {"employees": employees, "total_employees": total_employees}


@router.delete("/{employee_id}")
def delete_employee(employee_id: str):
    result = employee_collection.delete_one({"employee_id": employee_id})
    attendance_collection.delete_many({"employee_id": employee_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return {"message": "Employee deleted successfully"}

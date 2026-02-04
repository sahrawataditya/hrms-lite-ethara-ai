from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum


class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class AttendanceStatus(str, Enum):
    present = "Present"
    absent = "Absent"


class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: AttendanceStatus

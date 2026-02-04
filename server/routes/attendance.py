from fastapi import APIRouter, HTTPException, status
from config.database import attendance_collection, employee_collection
from config.models import AttendanceCreate

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/", status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: AttendanceCreate):
    employee = employee_collection.find_one(
        {"employee_id": attendance.employee_id}
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee does not exist"
        )

    existing = attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": attendance.date.isoformat()
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    attendance_data = attendance.dict()
    attendance_data["date"] = attendance.date.isoformat()

    attendance_collection.insert_one(attendance_data)

    return {"message": "Attendance marked successfully"}


@router.get("/{employee_id}")
def get_attendance(employee_id: str):
    records = list(
        attendance_collection.find(
            {"employee_id": employee_id},
            {"_id": 0}
        )
    )

    if not records:
        raise HTTPException(
            status_code=404,
            detail="No attendance records found"
        )

    return records

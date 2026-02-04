import { tryCatchWrapper } from "@/utils/request";
import { axiosService } from "..";

// mark attendance
export const markAttendance = async <T = { message: string }>(
  data: AttendanceRecord,
): Promise<T | null> => {
  return tryCatchWrapper(() => axiosService.post("/attendance", data));
};

// get attendance by employee id
export const getAttendanceOfEmployee = async <T = AttendanceRecord[]>(
  id: string,
): Promise<T | null> => {
  return tryCatchWrapper(() => axiosService.get(`/attendance/${id}`));
};

"use client";
import { FC } from "react";

const ErrorPage: FC<{ error: Error }> = ({ error }) => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <h3 className="capitalize text-red-500">{error?.message}</h3>
    </div>
  );
};

export default ErrorPage;

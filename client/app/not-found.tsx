import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
        <Link href={"/"}>Go Back</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

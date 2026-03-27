import { Link, useRouteError } from "react-router-dom";
import Button from "../components/common/Button";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
        Error
      </p>
      <h1 className="mt-3 text-4xl font-bold">Đã xảy ra lỗi</h1>
      <p className="mt-4 text-gray-500">
        {error?.statusText || error?.message || "Có lỗi không xác định."}
      </p>

      <Link to="/" className="mt-6">
        <Button>Quay về trang chủ</Button>
      </Link>
    </section>
  );
}

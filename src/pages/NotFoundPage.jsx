import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
        404
      </p>
      <h1 className="mt-3 text-4xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-4 text-gray-500">
        Trang bạn đang tìm có thể đã bị xóa hoặc đường dẫn không đúng.
      </p>

      <Link to="/" className="mt-6">
        <Button>Quay về trang chủ</Button>
      </Link>
    </section>
  );
}

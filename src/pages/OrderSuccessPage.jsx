import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { formatPrice } from "../utils/format";
import { orderApi } from "../services/orderApi";

export default function OrderSuccessPage() {
  const [order, setOrder] = useState(undefined);

  useEffect(() => {
    async function loadOrder() {
      const data = await orderApi.getLastOrder();
      setOrder(data);
    }

    loadOrder();
  }, []);

  if (order === undefined) {
    return <div className="py-10 text-center">Đang tải...</div>;
  }

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>

        <h1 className="mt-4 text-3xl font-bold">Đặt hàng thành công</h1>
        <p className="mt-3 text-gray-500">Đơn hàng của bạn đã được ghi nhận.</p>

        <div className="mt-8 rounded-xl border bg-gray-50 p-5 text-left">
          <h2 className="text-lg font-semibold">Thông tin đơn hàng</h2>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span>Mã đơn hàng</span>
              <span className="font-medium">{order.id}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Khách hàng</span>
              <span className="font-medium">{order.customer.fullName}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Email</span>
              <span className="font-medium">{order.customer.email}</span>
            </div>
            <div className="flex justify-between gap-4 border-t pt-3">
              <span>Tổng tiền</span>
              <span className="font-bold">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/orders"
            className="rounded-lg bg-black px-5 py-3 font-medium text-white"
          >
            Xem đơn hàng
          </Link>
          <Link
            to="/products"
            className="rounded-lg border px-5 py-3 font-medium"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </section>
  );
}

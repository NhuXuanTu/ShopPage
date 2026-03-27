import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/format";
import { orderApi } from "../services/orderApi";

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    async function loadOrders() {
      const data = await orderApi.getOrdersByUserId(user.id);
      setOrders(data);
    }

    loadOrders();
  }, [user.id]);

  if (orders === undefined) {
    return <div className="py-10 text-center">Đang tải...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Đơn hàng của tôi</h1>

      {!orders.length ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          <Link
            to="/products"
            className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 border-b pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-gray-500">Mã đơn hàng</p>
                  <h2 className="text-lg font-semibold">{order.id}</h2>
                </div>

                <div className="flex flex-col gap-2 text-sm md:items-end">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-yellow-700">
                    {order.status === "pending" ? "Chờ xử lý" : order.status}
                  </span>
                  <span className="text-gray-500">
                    {new Date(order.createdAt).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={`${order.id}-${item.id}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                    </div>

                    <div className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="mt-2 flex justify-between text-sm">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(order.shippingFee)}</span>
                </div>
                <div className="mt-3 flex justify-between text-base font-bold">
                  <span>Tổng tiền</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

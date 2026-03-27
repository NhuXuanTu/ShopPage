import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";
import { orderApi } from "../services/orderApi";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalPrice, clearCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    paymentMethod: "cod",
    note: "",
  });

  const shippingFee = useMemo(() => {
    return cartItems.length ? 30000 : 0;
  }, [cartItems.length]);

  const finalTotal = totalPrice + shippingFee;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Vui lòng nhập họ tên.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Email không hợp lệ.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phone.replace(/\s/g, ""))) {
      nextErrors.phone = "Số điện thoại không hợp lệ.";
    }

    if (!form.address.trim()) {
      nextErrors.address = "Vui lòng nhập địa chỉ.";
    } else if (form.address.trim().length < 10) {
      nextErrors.address = "Địa chỉ quá ngắn.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cartItems.length) return;
    if (!validate()) return;

    try {
      setSubmitting(true);

      await orderApi.createOrder({
        userId: user.id,
        customer: form,
        items: cartItems,
        subtotal: totalPrice,
        shippingFee,
        total: finalTotal,
      });

      clearCart();
      navigate("/order-success");
    } finally {
      setSubmitting(false);
    }
  };

  if (!cartItems.length) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="mb-4 text-3xl font-bold">Thanh toán</h1>
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-gray-500">Giỏ hàng của bạn đang trống.</p>
          <Link
            to="/cart"
            className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
          >
            Quay lại giỏ hàng
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Thanh toán</h1>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 text-xl font-semibold">Thông tin nhận hàng</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Họ và tên
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="w-full rounded-lg border px-4 py-2 outline-none"
              />
              {errors.fullName ? (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-lg border px-4 py-2 outline-none"
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Số điện thoại
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full rounded-lg border px-4 py-2 outline-none"
              />
              {errors.phone ? (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Phương thức thanh toán
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                className="w-full rounded-lg border px-4 py-2 outline-none"
              >
                <option value="cod">Thanh toán khi nhận hàng</option>
                <option value="banking">Chuyển khoản</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium">Địa chỉ</label>
            <textarea
              rows="4"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full rounded-lg border px-4 py-2 outline-none"
            />
            {errors.address ? (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            ) : null}
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium">Ghi chú</label>
            <textarea
              rows="3"
              value={form.note}
              onChange={(e) => handleChange("note", e.target.value)}
              className="w-full rounded-lg border px-4 py-2 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-lg bg-black px-5 py-3 font-medium text-white disabled:opacity-60"
          >
            {submitting ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </form>

        <div className="h-fit rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Đơn hàng của bạn</h2>

          <div className="mt-4 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b pb-3 last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                </div>

                <p className="font-medium">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-3 border-t pt-4 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Tổng cộng</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

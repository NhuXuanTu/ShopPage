import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";
import Button from "../components/common/Button";
import QuantitySelector from "../components/product/QuantitySelector";

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart,
  } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Giỏ hàng</h1>

      {!cartItems.length ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="text-gray-500">Chưa có sản phẩm nào trong giỏ hàng.</p>
          <Link to="/products" className="mt-4 inline-block">
            <Button>Xem sản phẩm</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-[120px_1fr_auto]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-full rounded-xl object-cover"
                />

                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                  <p className="mt-3 font-bold">{formatPrice(item.price)}</p>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end">
                  <QuantitySelector
                    value={item.quantity}
                    onDecrease={() => decreaseItem(item.id)}
                    onIncrease={() => increaseItem(item.id)}
                  />

                  <button
                    className="text-sm text-red-500 hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-bold">Tóm tắt đơn hàng</h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>Chưa tính</span>
              </div>
              <div className="flex justify-between border-t pt-3 text-base font-bold">
                <span>Tổng cộng</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block">
              <Button className="mt-5 w-full">Thanh toán</Button>
            </Link>

            <Button
              variant="secondary"
              className="mt-3 w-full"
              onClick={clearCart}
            >
              Xóa toàn bộ giỏ hàng
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

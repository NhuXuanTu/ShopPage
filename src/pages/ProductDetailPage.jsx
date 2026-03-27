import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../utils/format";
import Button from "../components/common/Button";
import QuantitySelector from "../components/product/QuantitySelector";
import { useCart } from "../contexts/CartContext";
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find((item) => String(item.id) === String(id)),
    [id],
  );

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-black">
          Sản phẩm
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 leading-7 text-gray-600">{product.description}</p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-medium">Số lượng</p>
            <QuantitySelector
              value={quantity}
              onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
              onIncrease={() => setQuantity((prev) => prev + 1)}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <Button onClick={() => addToCart(product, quantity)}>
              Thêm vào giỏ hàng
            </Button>
            <Link to="/cart">
              <Button variant="secondary">Xem giỏ hàng</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

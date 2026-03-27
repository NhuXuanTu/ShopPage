import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/format";
import { useCart } from "../../contexts/CartContext";
import Button from "../common/Button";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="overflow-hidden rounded-2xl  bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        className="block aspect-square overflow-hidden bg-gray-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="p-4">
        <p className="text-sm text-gray-500">{product.category}</p>

        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold hover:underline">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 text-xl font-bold">{formatPrice(product.price)}</p>

        <div className="mt-4 flex gap-2">
          <Link to={`/products/${product.id}`} className="flex-1">
            <Button variant="secondary" className="w-full">
              Chi tiết
            </Button>
          </Link>

          <Button className="flex-1" onClick={() => addToCart(product, 1)}>
            Thêm giỏ
          </Button>
        </div>
      </div>
    </div>
  );
}

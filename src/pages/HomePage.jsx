import { Link } from "react-router-dom";
import HeroBanner from "../components/product/HeroBanner";
import ProductGrid from "../components/product/ProductGrid";
import SectionTitle from "../components/common/SectionTitle";
import { products } from "../data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <HeroBanner />

      <section className="mx-auto mt-8 max-w-7xl px-4 pb-10">
        <SectionTitle
          title="Sản phẩm nổi bật"
          action={
            <Link
              to="/products"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              Xem tất cả
            </Link>
          }
        />
        <ProductGrid products={featuredProducts} />
      </section>
    </>
  );
}

import { useMemo, useState } from "react";
import FilterBar from "../components/product/FilterBar";
import ProductGrid from "../components/product/ProductGrid";
import SectionTitle from "../components/common/SectionTitle";
import { products } from "../data/products";

export default function ProductsPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "Tất cả") {
      result = result.filter((item) => item.category === category);
    }

    if (keyword.trim()) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    if (sort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [keyword, category, sort]);

  return (
    <>
      <FilterBar
        keyword={keyword}
        setKeyword={setKeyword}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <section className="mx-auto mt-8 max-w-7xl px-4 pb-10">
        <SectionTitle title="Tất cả sản phẩm" />
        <ProductGrid products={filteredProducts} />
      </section>
    </>
  );
}

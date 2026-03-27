export default function FilterBar({
  keyword,
  setKeyword,
  category,
  setCategory,
  sort,
  setSort,
}) {
  const categories = ["Tất cả", "Audio", "Accessories", "Monitor"];

  return (
    <section className="mx-auto mt-8 max-w-7xl px-4">
      <div className="flex flex-col gap-4 rounded-xl  bg-white p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                category === item
                  ? "bg-black text-white"
                  : "border bg-white hover:bg-gray-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 outline-none md:w-64"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-4 py-2 outline-none"
          >
            <option value="default">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
            <option value="name">Tên A-Z</option>
          </select>
        </div>
      </div>
    </section>
  );
}

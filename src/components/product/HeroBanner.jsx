import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function HeroBanner() {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="grid items-center gap-8 px-6 py-10 md:grid-cols-2 md:px-10 md:py-14">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-400">
              New Collection 2026
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
              Thiết bị công nghệ cho góc làm việc hiện đại
            </h1>

            <p className="mt-4 max-w-md text-gray-400">
              Khám phá các sản phẩm giúp bạn học tập, làm việc và giải trí tốt
              hơn.
            </p>

            <div className="mt-6 flex gap-3">
              <Link to="/products">
                <Button
                  variant="secondary"
                  className="border-0 bg-white text-black hover:bg-gray-200"
                >
                  Xem sản phẩm
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-transparent border border-white/30 hover:bg-white/10">
                  Đăng ký ngay
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80"
              alt="banner"
              className="mx-auto w-full max-w-md rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

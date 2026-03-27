import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import Button from "../common/Button";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive ? "font-semibold text-black" : "text-gray-600 hover:text-black";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold">
          ShopX
        </Link>

        <nav className="hidden gap-6 md:flex">
          <NavLink to="/" className={navClass}>
            Trang chủ
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Sản phẩm
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Giỏ hàng
          </NavLink>
          {isAuthenticated ? (
            <NavLink to="/orders" className={navClass}>
              Đơn hàng
            </NavLink>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <Button variant="secondary">Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button>Đăng ký</Button>
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-sm text-gray-600 md:block">
                Xin chào, <strong>{user.name}</strong>
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          )}

          <Link
            to="/cart"
            className="relative rounded-lg bg-black px-4 py-2 text-white"
          >
            Giỏ hàng
            {totalCount > 0 ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                {totalCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}

import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");

  const redirectTo = location.state?.from || "/";

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  const handleRegister = (form) => {
    try {
      setServerError("");
      register(form);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold mx-auto text-center">Đăng ký</h1>
      <p className="mb-6 text-gray-500 text-center">
        Tạo tài khoản để mua sắm nhanh hơn.
      </p>

      <AuthForm
        type="register"
        onSubmit={handleRegister}
        serverError={serverError}
      />

      <p className="mt-4 text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link to="/login" className="font-medium text-black hover:underline">
          Đăng nhập
        </Link>
      </p>
    </section>
  );
}

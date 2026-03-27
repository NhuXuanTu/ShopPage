import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (form) => {
    try {
      setServerError("");
      login({
        email: form.email,
        password: form.password,
      });
      navigate("/");
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-center">Đăng nhập</h1>
      <p className="mb-6 text-gray-500 text-center">Chào mừng bạn quay lại.</p>

      <AuthForm type="login" onSubmit={handleLogin} serverError={serverError} />

      <p className="mt-4 text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="font-medium text-black hover:underline">
          Đăng ký
        </Link>
      </p>
    </section>
  );
}

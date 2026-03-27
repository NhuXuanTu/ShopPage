import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function AuthForm({
  type,
  onSubmit,
  loading = false,
  serverError = "",
}) {
  const isRegister = type === "register";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (isRegister && !form.name.trim()) {
      nextErrors.name = "Vui lòng nhập họ tên.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Vui lòng nhập email.";
    }

    if (!form.password.trim()) {
      nextErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (form.password.length < 6) {
      nextErrors.password = "Mật khẩu tối thiểu 6 ký tự.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div className="space-y-4">
        {isRegister ? (
          <Input
            label="Họ tên"
            placeholder="Nhập họ tên"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
          />
        ) : null}

        <Input
          label="Email"
          type="email"
          placeholder="Nhập email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
        />

        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          error={errors.password}
        />

        {serverError ? (
          <p className="text-sm text-red-500">{serverError}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? "Đang xử lý..."
            : isRegister
              ? "Tạo tài khoản"
              : "Đăng nhập"}
        </Button>
      </div>
    </form>
  );
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const baseClass =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition";
  const variantClass =
    variant === "primary"
      ? "bg-black text-white hover:bg-gray-800"
      : "border bg-white hover:bg-gray-50";

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

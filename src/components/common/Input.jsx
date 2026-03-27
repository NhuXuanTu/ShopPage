export default function Input({ label, error, ...props }) {
  return (
    <div>
      {label ? (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      ) : null}
      <input
        className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        {...props}
      />
      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export default function QuantitySelector({ value, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center rounded-lg border">
      <button className="px-3 py-2 hover:bg-gray-50" onClick={onDecrease}>
        -
      </button>
      <span className="min-w-10 text-center">{value}</span>
      <button className="px-3 py-2 hover:bg-gray-50" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

export default function SectionTitle({ title, action }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      {action}
    </div>
  );
}

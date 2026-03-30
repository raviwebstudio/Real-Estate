export function AdminField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-ink">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
      />
    </label>
  );
}

export function AdminTextarea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 5,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="grid gap-2 text-sm text-ink">
      <span className="font-medium">{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        rows={rows}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
      />
    </label>
  );
}

export function AdminSelect({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  defaultValue?: string | null;
}) {
  return (
    <label className="grid gap-2 text-sm text-ink">
      <span className="font-medium">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? ""}
        className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

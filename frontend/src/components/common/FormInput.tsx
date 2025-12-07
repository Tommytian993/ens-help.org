interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
}: FormInputProps) {
  return (
    <div className="mb-4">
      <input
        type={type}
        id={label}
        className="form-control form-control-custom"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

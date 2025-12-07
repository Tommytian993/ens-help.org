/**
 * FormInput 组件的属性接口
 * 定义输入框组件接收的参数
 */
interface FormInputProps {
  label: string; // 标签文字（用于显示和关联输入框）
  type?: string; // 输入类型（可选，默认为 "text"）
  value: string; // 输入框的值
  onChange: (value: string) => void; // 值变化时的回调函数
  onFocus?: () => void; // 获得焦点时的回调（可选）
  onBlur?: () => void; // 失去焦点时的回调（可选）
  placeholder?: string; // 占位符文字（可选）
  required?: boolean; // 是否必填（可选，默认 false）
}

/**
 * FormInput 组件
 * 统一的表单输入框组件，提供一致的样式和功能
 */
export default function FormInput({
  label,
  type = "text",
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  required = false,
}: FormInputProps) {
  return (
    <div className="mb-4">
      {/* 标签 */}
      <label htmlFor={label} className="form-label fw-medium text-dark small">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {/* 输入框 */}
      <input
        type={type}
        id={label}
        className="form-control form-control-custom"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

import { TextField } from "@mui/material";

interface CustomFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string | false | undefined;
  [rest: string]: any;
}
function CustomField({
  id,
  label,
  value,
  onChange,
  type,
  required = true,
  error,
  helperText,
  ...rest
}: CustomFieldProps) {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      type={type}
      required={required}
      error={error}
      helperText={helperText}
      onChange={onChange}
      {...rest}
    ></TextField>
  );
}

export default CustomField;

import Button from "@mui/material/Button";

interface ContainedButtonProps {
  variant?: "contained" | "text" | "outlined";
  color?: "primary" | "secondary" | "error" | "inherit" | "success" | "warning";
  text: string;
  onClick: () => void;
  [propName: string]: any;
}

function ContainedButton({
  variant = "contained",
  color = "primary",
  text,
  onClick,
  ...rest
}: ContainedButtonProps) {
  return (
    <Button variant={variant} color={color} onClick={onClick} {...rest}>
      {text}
    </Button>
  );
}

export default ContainedButton;

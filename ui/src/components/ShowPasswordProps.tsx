import { VisibilityOff, Visibility } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

export const showPasswordInputProps = (
  showPassword: boolean,
  func: () => void
) => {
  return {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={func}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    ),
  };
};

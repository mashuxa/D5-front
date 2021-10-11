import React, { useCallback, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";

const PasswordField: React.FC<TextFieldProps> = ({ type, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = useCallback(() => setShowPassword((value) => !value), [setShowPassword]);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" onClick={togglePasswordVisibility}>
            <IconButton>
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>)
      }}
    />
  );
}

export default PasswordField;

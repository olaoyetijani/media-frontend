/* eslint-disable react/prop-types */
//import { TextField, Grid, InputAdornment, IconButton } from "@mui/core";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  half,
  handleChange,
  label,
  type,
  autoFocus,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;

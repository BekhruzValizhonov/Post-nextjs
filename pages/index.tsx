import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";
import style from "../styles/main.module.css";

interface State {
  password: string;
  showPassword: boolean;
}
const Login: React.FC = () => {
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });
  const { push } = useRouter();

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLoginClick = () => {
    push(`/posts`);
  };

  return (
    <>
      <Head>
        <title>Post.com</title>
        <link
          rel="icon"
          href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPMMrz1O09fU_EOSF7kQzHNoqIHgJLg5k2kw&usqp=CAU"
        />
      </Head>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          margin: "auto",
        }}
      >
        <Card
          sx={{
            mt: "25vh",
            p: 10,
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
            Welcome to the library
          </h1>
          <TextField fullWidth label="User name" id="fullWidth1" />

          <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <div className={style.login}>
            <Button type="submit" variant="outlined" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </Card>
      </Box>
    </>
  );
};

export default Login;

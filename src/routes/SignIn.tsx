import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";

import { useNavigate } from "react-router-dom";
import * as Types from "../@types";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password ? values : {},
    errors: !values.email
      ? {
          email: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.password
      ? {
          password: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  email: string;
  password: string;
};

export default function Signin() {
  const navigate = useNavigate();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  console.log("user", user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    await apiService.signIn({
      email: data.email,
      password: data.password,
    });

    navigate("/");
  });
  const signOut = async () => {
    apiService
      .revokeToken(user.uid)
      .then((result) => {
        console.log("Revoke token", result);
        navigate("/");
      })
      .catch((err) => {
        console.log("Revoke token Error", err);
      });
  };

  if (user.token) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          paddingTop: "100px",
          fontWeight: "bold",
        }}
      >
        You are signed in. To sign up, you need to sign out.
        <Button
          onClick={signOut}
          style={{ border: "1px solid lightgrey", marginTop: "30px" }}
        >
          Sign out
        </Button>
        <Link to="/">
          <Button sx={{ border: "1px solid lightgrey", mt: 2 }}>
            Go back to index
          </Button>
        </Link>
      </Box>
    );
  } else {
    return (
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <input
          {...register("email")}
          placeholder="Email"
          style={{ width: "200px", height: "30px" }}
        />
        {errors?.email && <p>{errors.email.message}</p>}

        <input
          {...register("password")}
          placeholder="password"
          style={{ width: "200px", height: "30px", marginTop: "10px" }}
        />
        {errors?.password && <p>{errors.password.message}</p>}

        <Button
          type="submit"
          style={{ marginTop: "10px", border: "1px solid lightgrey" }}
        >
          Submit
        </Button>
        <Link to="/">
          <Button
            type="submit"
            style={{ marginTop: "10px", border: "1px solid lightgrey" }}
          >
            Go to index
          </Button>
        </Link>
      </form>
    );
  }
}

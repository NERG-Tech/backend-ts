import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as apiService from "../api-service";
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
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    await apiService
      .signIn({
        email: data.email,
        password: data.password,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  });
  const signOut = async () => {
    setLoading(true);
    console.log(" .revokeToken(user.accessToken)", user.accessToken);
    apiService
      .revokeToken(user.accessToken)
      .then((result) => {
        console.log("Revoke token", result);
        navigate("/");
      })
      .catch((err) => {
        console.log("Revoke token Error", err);
      });
    setLoading(false);
  };

  if (user.accessToken) {
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

        {loading && (
          <Box sx={{ fontSize: "20px", fontWeight: "bold", mt: 3 }}>
            ...Loading
          </Box>
        )}
      </form>
    );
  }
}

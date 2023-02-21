import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import {
  getAuth,
  signInWithCustomToken,
  signOut as firebaseSignOut,
} from "firebase/auth";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.email && values.password && values.secureNote ? values : {},
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
      : !values.secureNote
      ? {
          secureNote: {
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
  secureNote: string;
};

export interface userType {
  accessToken: string;
  email: string;
  uid: string;
}
export default function Signup() {
  const auth = getAuth();
  const [user, setUser] = useState<userType | any>(auth.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  console.log("user in signup", user);

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data);
    await apiService.signUp({
      email: data.email,
      password: data.password,
      secureNote: data.secureNote,
    });

    const auth = getAuth();
    if (auth.currentUser) setUser(auth.currentUser);
  });

  const signOut = async () => {
    await apiService.revokeToken(user.uid);
    window.location.reload();
  };

  if (user !== null) {
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
        <input
          {...register("secureNote")}
          placeholder="Secure Note"
          style={{ width: "200px", height: "30px", marginTop: "10px" }}
        />
        {errors?.secureNote && <p>{errors.secureNote.message}</p>}

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

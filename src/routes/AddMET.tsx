import React, { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import * as Types from "../@types";
import axios from "axios";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.minutes && values.seconds ? values : {},
    errors: !values.minutes
      ? {
          minutes: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.seconds
      ? {
          seconds: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  minutes: number;
  seconds: number;
};

type metType = { value: number; unit: string };
type localListType = { met: metType };

export default function Addminutesseconds() {
  const [error, setError] = React.useState("");
  const [localList, setList] = React.useState<localListType>();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    if (user.accessToken) {
      await apiService
        .getMET(data.minutes, data.seconds, user.accessToken)
        .then((result) => {
          console.log("result", result);
          if (result) setList(result.list);
        })
        .catch((error) => console.log(error));
    } else {
      setError("Please log in to add information");
    }
  });

  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://oauth2.googleapis.com/tokeninfo?id_token=${user.accessToken}`
  //       )
  //       .then((result) => {
  //         console.log(result);
  //       });

  //     return () => {};
  //   }, []);

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
      <Box sx={{ color: "red", pb: 3 }}>{error && error}</Box>
      <input
        {...register("minutes")}
        placeholder="minutes"
        style={{ width: "200px", height: "30px" }}
      />
      {errors?.minutes && <p>{errors.minutes.message}</p>}

      <input
        {...register("seconds")}
        placeholder="seconds"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.seconds && <p>{errors.seconds.message}</p>}

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
      <div>
        {localList && (
          <Box sx={{ pt: 3, lineHeight: "180%" }}>
            <Box>
              {localList.met.value} {localList.met.unit}
            </Box>
          </Box>
        )}
      </div>
    </form>
  );
}

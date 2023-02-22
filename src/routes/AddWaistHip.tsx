import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import * as Types from "../@types";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.waist && values.hip ? values : {},
    errors: !values.waist
      ? {
          waist: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.hip
      ? {
          hip: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  waist: number;
  hip: number;
};

type localListType = { waist: number; hip: number; ratio: number };
export default function AddWaistHip() {
  const [error, setError] = React.useState("");
  const [localList, setList] = React.useState<localListType>();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    // console.log({ ...data });
    if (user.accessToken) {
      //   await apiService
      //     .validateToken({ userIdToken: user.accessToken })
      //     .then((result) => {
      //       console.log("result", result);
      //     })
      //     .catch((error) => console.log(error));

      await apiService
        .addWaistAndHip(data.waist, data.hip, user.accessToken)
        .then((result) => {
          console.log("result", result);
          if (result) setList(result.ratio);
        })
        .catch((error) => console.log(error));
    } else {
      setError("Please log in to add information");
    }
  });

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
        {...register("waist")}
        placeholder="waist"
        style={{ width: "200px", height: "30px" }}
      />
      {errors?.waist && <p>{errors.waist.message}</p>}

      <input
        {...register("hip")}
        placeholder="hip"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.hip && <p>{errors.hip.message}</p>}

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
            <Box>Hip: {localList.hip}</Box>
            <Box>Waist: {localList.waist}</Box>
            <Box>Ratio: {localList.ratio}</Box>
          </Box>
        )}
      </div>
    </form>
  );
}

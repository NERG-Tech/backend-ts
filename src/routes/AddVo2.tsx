import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import * as Types from "../@types";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.pulse ? values : {},
    errors: !values.pulse
      ? {
          pulse: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  pulse: number;
  hip: number;
};

type vo2Type = { pulse: number; vo2: number; unit: string };
type localListType = { vo2: vo2Type };

export default function AddpulseHip() {
  const [error, setError] = React.useState("");
  const [localList, setList] = React.useState<localListType>();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    console.log({ ...data });
    if (user.accessToken) {
      await apiService
        .addVo2(data.pulse, user.accessToken)
        .then((result) => {
          console.log("result", result);
          if (result) setList(result.list);
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
        {...register("pulse")}
        placeholder="pulse"
        style={{ width: "200px", height: "30px" }}
      />
      {errors?.pulse && <p>{errors.pulse.message}</p>}

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
            <Box>Pulse (input): {localList.vo2.pulse}</Box>
            <Box>
              vo2 (result): {localList.vo2.vo2} {localList.vo2.unit}
            </Box>
          </Box>
        )}
      </div>
    </form>
  );
}

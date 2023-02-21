// import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.weight && values.height ? values : {},
    errors: !values.weight
      ? {
          weight: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.height
      ? {
          height: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  weight: number;
  height: number;
  sex: string;
  age: number;
};

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  let name = "";
  let sport = "";
  let position = "";

  const onSubmit = handleSubmit(async (data) => {
    await apiService.addPlayer({
      sex: data.sex,
      age: data.age,
      weight: data.weight,
      height: data.height,
      name: name,
      sport: sport,
      position: position,
    });
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
      <input
        {...register("weight")}
        placeholder="weight"
        style={{ width: "200px", height: "30px" }}
      />
      {errors?.weight && <p>{errors.weight.message}</p>}

      <Box sx={{ mt: 2 }}>height: 55 means 5 feet and 5 inches</Box>
      <input
        {...register("height")}
        placeholder="height"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.height && <p>{errors.height.message}</p>}

      <Box sx={{ mt: 2 }}>Gender: Male or Female</Box>
      <input
        {...register("sex")}
        placeholder="sex"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.sex && <p>{errors.sex.message}</p>}

      <input
        {...register("age")}
        placeholder="age"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.age && <p>{errors.age.message}</p>}

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

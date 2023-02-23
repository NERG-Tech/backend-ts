import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import * as Types from "../@types";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.ethnicity && values.complexion ? values : {},
    errors: !values.ethnicity
      ? {
          ethnicity: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.complexion
      ? {
          complexion: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  ethnicity: string;
  complexion: string;
  bloodType: string;
};

type metType = { value: number; unit: string };
type localListType = { met: metType };

export default function AddGenetics() {
  const [error, setError] = React.useState("");
  const [localList, setList] = React.useState<localListType>();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    // ethnicity, complexion, bloodType
    if (user.accessToken) {
      await apiService
        .getGenetics(
          data.ethnicity,
          data.complexion,
          data.bloodType,
          user.accessToken
        )
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
        {...register("ethnicity")}
        placeholder="ethnicity"
        style={{ width: "200px", height: "30px" }}
      />
      {errors?.ethnicity && <p>{errors.ethnicity.message}</p>}

      <input
        {...register("complexion")}
        placeholder="complexion"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.complexion && <p>{errors.complexion.message}</p>}

      <input
        {...register("bloodType")}
        placeholder="bloodType"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.bloodType && <p>{errors.bloodType.message}</p>}

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
            <Box>{/* {localList.met.value} {localList.met.unit} */}</Box>
          </Box>
        )}
      </div>
    </form>
  );
}

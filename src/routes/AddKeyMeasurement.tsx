import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import * as Types from "../@types";

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.neckCircumference && values.wingSpan ? values : {},
    errors: !values.neckCircumference
      ? {
          neckCircumference: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.wingSpan
      ? {
          wingSpan: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

type FormValues = {
  neckCircumference: number;
  wingSpan: number;
  handSize: number;
  hipsCircumference: number;
  gluteCircumference: number;
  waistCircumference: number;
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
    // neckCircumference, wingSpan, handSize
    if (user.accessToken) {
      await apiService
        .getKeyMeasurements(
          data.neckCircumference,
          data.wingSpan,
          data.handSize,
          data.hipsCircumference,
          data.gluteCircumference,
          data.waistCircumference,
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
      <Box sx={{ pb: 2 }}>All inputs are numbers in inches</Box>
      <input
        {...register("neckCircumference")}
        placeholder="neckCircumference"
        style={{ width: "200px", height: "30px" }}
      />
      {errors?.neckCircumference && <p>{errors.neckCircumference.message}</p>}

      <input
        {...register("wingSpan")}
        placeholder="wingSpan"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.wingSpan && <p>{errors.wingSpan.message}</p>}

      <input
        {...register("handSize")}
        placeholder="handSize"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.handSize && <p>{errors.handSize.message}</p>}

      <input
        {...register("hipsCircumference")}
        placeholder="hipsCircumference"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.hipsCircumference && <p>{errors.hipsCircumference.message}</p>}

      <input
        {...register("gluteCircumference")}
        placeholder="gluteCircumference"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.gluteCircumference && <p>{errors.gluteCircumference.message}</p>}

      <input
        {...register("waistCircumference")}
        placeholder="waistCircumference"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.waistCircumference && <p>{errors.waistCircumference.message}</p>}

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

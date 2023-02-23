import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Resolver } from "react-hook-form";
import * as apiService from "../api-service";
import * as Types from "../@types";

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
  name: string;
  sport: string;
  position: string;
};

export default function Signin() {
  const [error, setError] = React.useState("");
  const [localList, setList] = React.useState<Types.localListType>();
  const [loading, setLoading] = React.useState(false);

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    // console.log({ ...data });
    if (user.accessToken) {
      await apiService
        .addPlayer({
          sex: data.sex,
          age: parseFloat(data.age + ""),
          weight: parseFloat(data.weight + ""),
          height: parseFloat(data.height + ""),
          name: data.name,
          sport: data.sport,
          position: data.position,
          accessToken: user.accessToken,
        })
        .then((result) => {
          console.log(result);
          setList(result.list);
        })
        .catch((error) => console.log(error));
    } else {
      setError("Please log in to add information");
    }
    setLoading(false);
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

      <input
        {...register("name")}
        placeholder="name"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.name && <p>{errors.name.message}</p>}

      <input
        {...register("sport")}
        placeholder="sport"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.sport && <p>{errors.sport.message}</p>}

      <input
        {...register("position")}
        placeholder="position"
        style={{ width: "200px", height: "30px", marginTop: "10px" }}
      />
      {errors?.position && <p>{errors.position.message}</p>}

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
      <Box sx={{ fontSize: "32px", pt: 3 }}>
        {loading ? <Box>...Loading</Box> : ""}
      </Box>
      {localList && !loading && (
        <div style={{ paddingTop: "10px", lineHeight: "210%" }}>
          <div>Age: {localList.age}</div>
          <div>bmi: {localList.bmi}</div>
          <div>sex: {localList.sex}</div>
          <div>name: {localList.name}</div>
          <div>sport: {localList.sport}</div>
          <div>position: {localList.position}</div>
          <hr />
          <div>height: {localList.height.cm} cm</div>
          <div>
            height: {localList.height.feet.feet} feet{" "}
            {localList.height.feet.inch} inch
          </div>
          <hr />
          <div>weight: {localList.weight.kg} kg</div>
          <div>weight: {localList.weight.pounds} pounds</div>
          <hr />
          <div>adjustedBodyWeight: {localList.adjustedBodyWeight.kg} kg</div>
          <div>
            adjustedBodyWeight: {localList.adjustedBodyWeight.pounds} pounds
          </div>
          <hr />
          <div>
            bloodVolumn: {localList.bloodVolumn.value}{" "}
            {localList.bloodVolumn.unit}
          </div>
          <hr />
          <div>bodyWaterWeight: {localList.bodyWaterWeight.kg} kg</div>
          <div>bodyWaterWeight: {localList.bodyWaterWeight.pounds} pounds</div>
          <hr />
          <div>idealWeight: {localList.idealWeight.kg} kg</div>
          <div>idealWeight: {localList.idealWeight.pounds} pounds</div>
          <hr />
          <div>leanBodyMass: {localList.leanBodyMass.kg} kg</div>
          <div>leanBodyMass: {localList.leanBodyMass.pounds} pounds</div>
          <hr />
          <div>
            RMR: {localList.rmr.value} {localList.rmr.unit}
          </div>
          <hr />
        </div>
      )}
    </form>
  );
}

import React from "react";
import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

import * as apiService from "../api-service";
import * as Types from "../@types";

export default function ShowPlayer() {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [localList, setList] = React.useState<Types.localListType>();

  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  console.log(user);

  const getPlayer = async () => {
    setLoading(true);
    let token: Types.tokenType = { accessToken: user.accessToken };

    if (user.accessToken) {
      await apiService.getPlayer(token).then((res) => {
        if (res !== "no-access") {
          console.log("getPlayer res", res);
          setList(res);
        } else {
          setError("Your token is expired. Please log in again.");
        }
      });
    } else {
      setError("Please log in to add information");
    }
    setLoading(false);
  };

  console.log("localList >> ", localList);

  return (
    <Box
      sx={{
        textAlign: "center",
        pt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <Button sx={{ border: "1px solid lightgrey" }}>
          Go back to index page
        </Button>
      </Link>
      <Button
        sx={{ border: "1px solid lightgrey", mt: 2, color: "green" }}
        onClick={getPlayer}
      >
        Get User Info From DB
      </Button>
      <Box sx={{ pt: 2 }}>{error && error}</Box>
      <Box sx={{ pt: 3, width: "400px" }}>
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
            <div>
              bodyWaterWeight: {localList.bodyWaterWeight.pounds} pounds
            </div>
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
            {/*  
            <div>
              Vo2 Max: {vo2} ml/kg/min ** with beats: {beats} per 20 seconds
            </div>
            <div>
              MET: {met} METs ** with {minutes} minutes {seconds} seconds
            </div> */}
          </div>
        )}
      </Box>
    </Box>
  );
}

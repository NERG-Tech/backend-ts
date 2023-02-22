import React, { useEffect, useState } from "react";

import * as Types from "../@types";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const UserTokenStatus = () => {
  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");

  const [status, setStatus] = useState("");
  const [today, setToday] = useState("");
  const [expire, setExpire] = useState("");

  const nowInMilliseconds = Date.now(); // Today Now

  const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${user.accessToken}`;

  useEffect(() => {
    setNow();
  }, []);

  const setNow = () => {
    let today = new Date(nowInMilliseconds);
    setToday(today.toString());
    // console.log("today", today);
  };

  useEffect(() => {
    const expirationTime = user.expirationTime;

    if (Date.now() >= expirationTime) {
      setStatus("&#128561; expired");
    } else {
      setStatus("&#128562; NOT expired");
    }

    // console.log("expirationTime", expirationTime);
    // console.log("Date.now()", nowInMilliseconds);

    let exp = new Date(expirationTime);
    setExpire(exp.toString());
    console.log("exp", exp);
  }, []);

  return (
    <Box sx={{ textAlign: "center", pt: 3, lineHeight: "180%" }}>
      <Box>
        Token status:{" "}
        <div
          style={{ color: "blue" }}
          dangerouslySetInnerHTML={{ __html: status }}
        ></div>
      </Box>
      <Box sx={{ pt: 3 }}>Expire At: {expire}</Box>
      <Box>Now: {today}</Box>

      <Link to="/">
        <Button sx={{ border: "1px solid lightgrey", mt: 2 }}>
          Go back to index
        </Button>
      </Link>
    </Box>
  );
};

export default UserTokenStatus;

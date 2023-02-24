import "./App.css";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as Types from "./@types";

const color1 = "#5F9EA0";
const color2 = "#FF7F50";
const color3 = "#8FBC8F";

function App() {
  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  console.log("user", user);

  // localStorage.removeItem("@user");
  return (
    <Box className="App" sx={{ pt: 10 }}>
      <Box sx={{ pb: 3 }}>
        User Status:{" "}
        {user.accessToken ? (
          <Box sx={{ pt: 2, color: "green" }}>User Signed In</Box>
        ) : (
          <Box sx={{ pt: 2, color: "red" }}>Not Signed In</Box>
        )}
      </Box>
      <Link to="/signin">
        <Button sx={{ border: "1px solid lightgrey" }}>Sign In</Button>
      </Link>
      <Link to="/signup">
        <Button sx={{ border: "1px solid lightgrey", ml: 1 }}>Sign Up</Button>
      </Link>
      <Box sx={{ pt: 3 }}>
        <Box sx={{ pb: 3 }}>
          <Link to="/add-player">
            <Button
              sx={{
                border: "1px solid lightgrey",
                color: color1,
                fontWeight: "bold",
              }}
            >
              Add a player
            </Button>
          </Link>

          <Link to="/show-player">
            <Button
              sx={{
                border: "1px solid lightgrey",
                ml: 1,
                color: color1,
                fontWeight: "bold",
              }}
            >
              Get Player Info
            </Button>
          </Link>

          <Link to="/update-player">
            <Button
              sx={{
                border: "1px solid lightgrey",
                ml: 1,
                color: color1,
                fontWeight: "bold",
              }}
            >
              Update a player
            </Button>
          </Link>
        </Box>

        <Link to="/add-waist-hip">
          <Button
            sx={{
              border: "1px solid lightgrey",
              ml: 1,
              color: color2,
              fontWeight: "bold",
            }}
          >
            Add waist/hip ratio
          </Button>
        </Link>

        <Link to="/add-vo2">
          <Button
            sx={{
              border: "1px solid lightgrey",
              ml: 1,
              color: color2,
              fontWeight: "bold",
            }}
          >
            Add vo2
          </Button>
        </Link>

        <Link to="/add-met">
          <Button
            sx={{
              border: "1px solid lightgrey",
              ml: 1,
              color: color2,
              fontWeight: "bold",
            }}
          >
            Add MET
          </Button>
        </Link>

        <Box sx={{ pt: 2 }}>
          <Link to="/add-genetics">
            <Button
              sx={{
                border: "1px solid lightgrey",
                ml: 1,
                color: color2,
                fontWeight: "bold",
              }}
            >
              Add Genetics
            </Button>
          </Link>
          <Link to="/add-key-measurements">
            <Button
              sx={{
                border: "1px solid lightgrey",
                ml: 1,
                color: color2,
                fontWeight: "bold",
              }}
            >
              Add Key Measurements
            </Button>
          </Link>
          {/* <Link to="/user-token-status">
            <Button sx={{ border: "1px solid lightgrey", ml: 1 }}>
              Check User Token Status
            </Button>
          </Link> */}
        </Box>
      </Box>
    </Box>
  );
}

export default App;

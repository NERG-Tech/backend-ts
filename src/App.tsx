import "./App.css";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as Types from "./@types";

function App() {
  let user: Types.User = JSON.parse(localStorage.getItem("@user") || "{}");
  console.log("user", user);

  return (
    <Box className="App" sx={{ pt: 10 }}>
      <Box sx={{ pb: 3 }}>
        User Status:{" "}
        {user.token ? (
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
        <Link to="/add-player">
          <Button sx={{ border: "1px solid lightgrey" }}>Add a player</Button>
        </Link>
        <Link to="/show-player">
          <Button sx={{ border: "1px solid lightgrey", ml: 1 }}>
            Get Player Info
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default App;

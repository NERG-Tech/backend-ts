import "./App.css";
import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { createContext } from "react";

export interface userType {
  accessToken: string;
  email: string;
}

const CurrentUserContext = createContext<userType | null>(null);

function App() {
  const [user, setUser] = React.useState<userType | any>({
    accessToken: "",
    email: "",
  });

  React.useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      setUser(null);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={user}>
      <Box className="App" sx={{ pt: 10 }}>
        <Box sx={{ pb: 3 }}>
          User Status:{" "}
          {user ? (
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
    </CurrentUserContext.Provider>
  );
}

export default App;

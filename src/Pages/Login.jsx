import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  Box,
  Container,
  createTheme,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
// import DRawer from "../Components/Dashboard/DRawer/DRawer";
// import Appar from "../Components/Dashboard/DRawer/Appar";
import { grey, teal, yellow } from "@mui/material/colors";



// Auth Firebase
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [user, loading, error] = useAuthState(auth);
  const drawerWidth = 240;
  const [mode, setmood] = useState(
    localStorage.getItem("Allmode") === null
      ? "dark"
      : localStorage.getItem("Allmode") === "dark"
        ? "dark"
        : "light"
  );
  const [DisPlay, setDisPlay] = useState("none");
  const [permanentOrT, setpermanentOrT] = useState("permanent");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const naveget = useNavigate()

  const darkTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
          // palette values for light mode
          abo: {
            mane: yellow[500],
            Cadwo: grey[300],
            button: teal[300],
          },
        }
        : {
          // palette values for dark mode

          abo: {
            mane: yellow[500],
            Cadwo: grey[800],
            button: teal[900],
          },
        }),
    },
  });

  const handleLogin = async () => {

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('success');

      naveget('/dashboard')

    } catch (error) {
      console.error('Error signing in', error);
    } finally {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      {loading ? 'Loading...' : user ? naveget('/dashboard') :
        <>
          <div>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              {isLoggedIn ? (
                <>
      
                  <Container maxWidth="la">
                    <Box
                      component={"main"}
                      sx={{
                        width: "85%",
                        textAlign: "center",
                        ml: { md: `${drawerWidth}px` },
                        overflow: "hidden",
                        flexWrap: "wrap",
                      }}
                    >
                      <Outlet />
                    </Box>
                  </Container>
                </>
              ) : (
                <Container maxWidth="sm">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100vh",
                    }}
                  >
                    <Typography variant="h4" gutterBottom>
                      تسجيل الدخول
                    </Typography>
                    <TextField
                      label="البريد الإلكتروني"
                      type="email"
                      fullWidth
                      margin="normal"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      label="كلمة المرور"
                      type="password"
                      fullWidth
                      margin="normal"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                      تسجيل الدخول
                    </Button>
                  </Box>
                </Container>
              )}
            </ThemeProvider>
          </div>
        </>
      }
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Appar from './DRawer/Appar';
import DRawer from './DRawer/DRawer';
import { Outlet } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import {
    CssBaseline,
    ThemeProvider,
    Box,
    Container,
    createTheme
} from "@mui/material";
import { yellow, grey, teal } from '@mui/material/colors';

const drawerWidth = 240; // تعريف drawerWidth

function Dashboard() {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);
    const [mode, setMode] = useState('light'); // تعريف mode واستخدام useState لتغييره
    const [permanentOrT, setpermanentOrT] = useState(true); // تعريف permanentOrT واستخدام useState لتغييره
    const [DisPlay, setDisPlay] = useState('block'); // تعريف DisPlay واستخدام useState لتغييره

    // console.log(user);

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


    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <>
                    <Appar
                        drawerWidth={drawerWidth}
                        setpermanentOrT={setpermanentOrT}
                    />

                    <DRawer
                        setmood={setMode}
                        permanentOrT={permanentOrT}
                        DisPlay={DisPlay}
                        setpermanentOrT={setpermanentOrT}
                        setDisPlay={setDisPlay}
                    />
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
            </ThemeProvider>
        </>
    );
}

export default Dashboard;

import React from 'react';
import { Drawer, Divider, useTheme } from "@mui/material";
import DarkandLight from "./DarkandLight";
import Listpadg from "./Listpadg";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";

export default function DRawer({
  setmood,
  DisPlay,
  permanentOrT,
  setDisPlay,
  setpermanentOrT,
}) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
        console.log('Sign-out successful.');
        navigate('/login');
    }).catch((error) => {
        console.error('An error happened:', error);
    });
}
  return (
    <>
      <Drawer
        sx={{
          display: { xs: `${DisPlay}`, md: "block" },
          width: "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box",
          },
        }}
        variant={permanentOrT}
        anchor="left"
        open={true}
        onClose={() => {
          setDisPlay("none");
          setpermanentOrT("permanent");
        }}
      >
        <DarkandLight setmood={setmood} />
        <Divider />
        <Listpadg />
        {loading ? 'Loading...' :
                        user ? <>
                        <button className='outdDS'  onClick={handleSignOut}> <LogoutIcon/>  Sign Out</button>
                    </> : navigate('/login')
                    }
      </Drawer>
    </>
  );
}

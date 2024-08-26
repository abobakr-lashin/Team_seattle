import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  CssBaseline,
  Box,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
export default function Appar({ drawerWidth,setDisPaly,setpermanentOrT }) {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: { xs: "100% ", md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <AppBar    position="sticky"  sx={{   ml: { sx: "0", md: `${drawerWidth}px` },   color: "white", }}
        >
          <Toolbar>
          <IconButton      sx={{
                display: { xs: "block", md: "none" },
                mr: { xs: "8px", md: "0" },
                textAlign: "center",

                fontSize: "small",
              }}
              
              onClick={()=>{
                setpermanentOrT("temporary")
                setDisPaly("block")
              }}
              >
            
              <MenuIcon />
          </IconButton>

            <Link
              className="myex"
              fontSize={"20px"}
              to="/Login"
              style={{
                flexGrow: 1,
                transition: "0.2s",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              My expenses
            </Link>
            <Typography sx={{ mr: "10px" }}>Dashborard</Typography>
            <IconButton>
              <Avatar alt="Dashborard" src="./icon-384x384.png" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

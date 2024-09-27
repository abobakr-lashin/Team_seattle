import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  Book,
} from "@mui/material";

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Person2Icon from "@mui/icons-material/Person2";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import BookIcon from '@mui/icons-material/Book';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import TextsmsIcon from '@mui/icons-material/Textsms';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Listpadg() {
  const carrantlochen = useLocation();
  const theme = useTheme();
  const myList = [
    { text: "FormHeader", ico: HomeIcon, path: "/dashboard" },
    { text: "Service", ico: Person2Icon, path: "Formservice" },
    { text: "Request_Quote", ico: CoPresentIcon, path: "RequestQuote" },
    { text: "TheTeam", ico: BookIcon, path: "TEameform" },
    { text: "MasssgeUs", ico: TextsmsIcon, path: "MasssgeUs" },
    { text: "CreatBolgs", ico: CreateIcon, path: "BlogsCreat" },
    { text: "BlogsUpdete", ico: CreateIcon, path: "BlogsUpdete" },
    { text: "AddCategoryCommer", ico: CreateIcon, path: "AddCategoryCommercial" },
    { text: "AddCommercial", ico: CreateIcon, path: "Commercialcreat" },
    { text: "AddCateBuyLocation", ico: CreateIcon, path: "AddCategoryBuyLocation" },
    { text: "AddCateBuyPlan", ico: CreateIcon, path: "AddCateBuyPlan" },
    { text: "CreateCardBuy", ico: CreateIcon, path: "AddCardBuy" },
    { text: "AddDevelopers", ico: CreateIcon, path: "AddDevelopers" },
    { text: "AddCateRentPlan", ico: CreateIcon, path: "AddCategoryRentPlan" },
    { text: "AddLocationRent", ico: CreateIcon, path: "AddLocationRent" },
    { text: "CreateRent", ico: CreateIcon, path: "CreateRent" },
    { text: "AddCateSellPlan", ico: CreateIcon, path: "AddCategorySellPlan" },
    { text: "AddLocationSell", ico: CreateIcon, path: "AddLocationSell" },
    { text: "CreateSell", ico: CreateIcon, path: "CreateSell" },
  ]
  return (
    <>
      <List>

        {myList.map((list) =>
        (
          <>
            <ListItem
              sx={{
                background:
                  carrantlochen.pathname === `${list?.path}` ? theme.palette.abo.Cadwo : null,


              }}
              disablePadding
            >
              <ListItemButton component={Link} to={list.path}>
                <ListItemIcon>  {<list.ico />}</ListItemIcon>
                <ListItemText sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black', }} primary={list.text} /></ListItemButton>

            </ListItem>


          </>
        )
        )}



      </List>
    </>
  );
}

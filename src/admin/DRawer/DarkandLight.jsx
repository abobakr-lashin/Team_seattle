import { useTheme } from '@emotion/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { IconButton, List, ListItem } from '@mui/material';
import React from 'react'

export default function DarkandLight({setmood}) {

    const theme = useTheme();
  return (
<>


<List>
          <ListItem
            sx={{ display: ":felx", justifyContent: "center", mb: "8px" }}
            disablePadding
          >
            <IconButton
              onClick={() => {
                localStorage.setItem(
                  "Allmode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                setmood(theme.palette.mode === "dark" ? "light" : "dark");
              }}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7 sx={{ color: "orange" }} />
              ) : (
                <Brightness4 />

              )}
            </IconButton>
          </ListItem>
        </List>
</>
  )
}

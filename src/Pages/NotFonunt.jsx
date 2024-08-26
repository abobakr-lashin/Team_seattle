import React from 'react'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'

export default function NotFonunt() {
  const theme=useTheme()
  return (
<>

<Typography variant="h1" sx={{display:"flex",
justifyContent:"center"
,alignItems:"center",
height:"100vh",
fontSize:"60px"
}} color={theme.palette.error.main}>NotFount</Typography>

</>
  )
}

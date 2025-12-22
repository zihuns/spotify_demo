import { Box } from "@mui/material";
import React from "react";
import LoginButton from "../../common/components/LoginButton";

export const Navbar = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      height={"64px"}
    >
      <LoginButton />
    </Box>
  );
};

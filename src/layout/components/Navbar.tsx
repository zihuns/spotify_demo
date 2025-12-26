import { Avatar, Box, IconButton, Menu, MenuItem, styled } from "@mui/material";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import LoginButton from "../../common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});
export const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("code_verifier");

    queryClient.clear();
    handleClose();
    window.location.reload();
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"flex-end"}
      alignItems={"center"}
      height={"64px"}
    >
      {userProfile ? (
        <ProfileContainer>
          <IconButton size="small" onClick={handleClick}>
            <Avatar
              src={userProfile.images[0]?.url}
              alt={userProfile.display_name}
            />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            keepMounted
          >
            <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
          </ProfileMenu>
        </ProfileContainer>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

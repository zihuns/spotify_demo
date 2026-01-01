import {
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Category from "./components/Category";
import { useNavigate } from "react-router";

const SearchContainer = styled(Box)({
  // 스크롤 디자인
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  marginBottom: "16px",

  "& .MuiInputBase-root": {
    borderRadius: "40px", // 입력 필드의 둥근 모서리
    backgroundColor: theme.palette.action.active, // 입력 필드의 배경 색상
    color: "white", // 텍스트 색상
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // 테두리 색상 제거
    },
    "&:hover fieldset": {
      borderColor: "gray", // 마우스 호버 시 테두리 색상
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray", // 포커스 시 테두리 색상
    },
  },
}));

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword) {
        navigate(`/search/${keyword}`);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [keyword, navigate]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClearKeyword = () => {
    setKeyword("");
  };

  return (
    <SearchContainer>
      <Box display="inline-block" width={{ xs: 1, md: 364 }}>
        <StyledTextField
          value={keyword}
          autoFocus
          autoComplete="off"
          variant="outlined"
          placeholder="What do you wnat to play?"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
              endAdornment: keyword && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearKeyword}
                    sx={{ color: "white" }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearchKeyword}
        />
      </Box>
      <div>
        <Category />
      </div>
    </SearchContainer>
  );
};

export default SearchPage;

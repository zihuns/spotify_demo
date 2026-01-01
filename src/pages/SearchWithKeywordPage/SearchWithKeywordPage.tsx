import {
  Avatar,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ClearIcon from "@mui/icons-material/Clear";
import { SEARCH_TYPE } from "../../models/search";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import SearchResultList from "./components/SearchResultList";
import { useNavigate, useParams } from "react-router";

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

const SectionTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: "700",
  color: "white",
  marginBottom: "16px",
});

const CardBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#181818",
  padding: "16px",
  borderRadius: "8px",
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#282828",
    "& .play-button": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

const PlayButton = styled(IconButton)({
  position: "absolute",
  bottom: "8px",
  right: "8px",
  backgroundColor: "#1ed760",
  color: "black",
  boxShadow: "0 8px 8px rgba(0,0,0,0.3)",
  opacity: 0,
  transform: "translateY(8px)",
  transition: "all 0.5s ease-in-out",
  "&:hover": {
    backgroundColor: "#1fdf64",
    transform: "scale(1.05) translateY(0)",
  },
});

const SearchWithKeywordPage = () => {
  const { keyword: keywordParam } = useParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>(keywordParam || "");

  useEffect(() => {
    if (keywordParam) {
      setKeyword(keywordParam);
    }
  }, [keywordParam]);

  const { data, isLoading } = useSearchItemsByKeyword({
    q: keywordParam || "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const artists =
    data?.pages.flatMap((page) => page.artists?.items ?? []) ?? [];
  const albums = data?.pages.flatMap((page) => page.albums?.items ?? []) ?? [];

  const topResult = tracks[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword === keywordParam) return;

      if (keyword) {
        navigate(`/search/${keyword}`);
      } else {
        navigate("/search");
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [keyword, keywordParam, navigate]);

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClearKeyword = () => {
    setKeyword("");
    navigate("/search");
  };

  const renderCard = (item: any, isArtist = false) => {
    const image = item.images?.[0]?.url || item.album?.images?.[0]?.url;
    return (
      <CardBox key={item.id}>
        <Box
          sx={{
            position: "relative",
            width: isArtist ? 120 : 140,
            height: isArtist ? 120 : 140,
            marginBottom: "16px",
          }}
        >
          <Avatar
            src={image}
            alt={item.name}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: isArtist ? "50%" : "8px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
            variant={isArtist ? "circular" : "rounded"}
          />
          <PlayButton className="play-button">
            <PlayArrowIcon />
          </PlayButton>
        </Box>
        <Typography
          fontWeight="bold"
          noWrap
          sx={{ width: "100%", textAlign: "left" }}
        >
          {item.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{ width: "100%", textAlign: "left" }}
        >
          {isArtist ? "Artist" : item.artists?.[0]?.name}
        </Typography>
      </CardBox>
    );
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
        {isLoading ? (
          <LoadingSpinner /> // 로딩 중일 때 스피너 표시
        ) : (
          <Grid container spacing={4}>
            {/* Top Result & Songs */}
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionTitle>Top result</SectionTitle>
              {topResult && (
                <Box
                  sx={{
                    bgcolor: "#181818",
                    p: 3,
                    borderRadius: 2,
                    height: "240px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Avatar
                    src={topResult.album?.images?.[0]?.url}
                    sx={{ width: 92, height: 92, boxShadow: 3 }}
                    variant="rounded"
                  />
                  <Typography variant="h4" fontWeight="bold">
                    {topResult.name}
                  </Typography>
                  <Typography variant="body1">
                    Song <span style={{ fontWeight: "bold" }}>•</span>{" "}
                    {topResult.artists?.[0]?.name}
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SectionTitle>Songs</SectionTitle>
              <SearchResultList
                playlistId=""
                list={tracks.slice(0, 4)}
                hasNextPage={false}
                isFetchingNextPage={false}
                fetchNextPage={() => {}}
              />
            </Grid>

            {/* Artists */}
            <Grid size={{ xs: 12 }}>
              <SectionTitle>Artists</SectionTitle>
              <Grid container spacing={2}>
                {artists.slice(0, 6).map((artist) => (
                  <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
                    {renderCard(artist, true)}
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Albums */}
            <Grid size={{ xs: 12 }}>
              <SectionTitle>Albums</SectionTitle>
              <Grid container spacing={2}>
                {albums.slice(0, 6).map((album) => (
                  <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                    {renderCard(album)}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </SearchContainer>
  );
};

export default SearchWithKeywordPage;

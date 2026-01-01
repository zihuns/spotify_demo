import { useInView } from "react-intersection-observer";
import { Track } from "../../../models/track";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import getCurrentUserPlaylists, {
  addTracksToPlaylist,
} from "../../../apis/playlistApi";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "transparent",
  color: theme.palette.common.white,
  width: "100%",
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover .add-button": {
    display: "inline-flex",
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});
interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const formatDuration = (ms?: number) => {
  if (!ms) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView(); // 무한스크롤 옵저버 추가
  const [playlistRef, playlistInView] = useInView();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const {
    data: playlistsData,
    isLoading: isPlaylistsLoading,
    hasNextPage: hasPlaylistNextPage,
    isFetchingNextPage: isFetchingPlaylistNextPage,
    fetchNextPage: fetchPlaylistNextPage,
  } = useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) =>
      getCurrentUserPlaylists({ limit: 10, offset: pageParam as number }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.next ? allPages.length * 10 : undefined;
    },
    enabled: Boolean(anchorEl),
  });

  const playlists = playlistsData?.pages.flatMap((page) => page.items) ?? [];

  const handleAddClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    track: Track
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrack(track);
  };

  const handlePlaylistSelect = (targetPlaylistId: string) => async () => {
    if (selectedTrack && selectedTrack.uri) {
      await addTracksToPlaylist({
        playlist_id: targetPlaylistId,
        uris: [selectedTrack.uri],
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] }),
        queryClient.invalidateQueries({
          queryKey: ["playlist-detail", targetPlaylistId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["playlist-items", targetPlaylistId],
        }),
      ]);
      setIsSnackbarOpen(true);
    }
    setAnchorEl(null);
    setSelectedTrack(null);
  };

  useEffect(() => {
    // fetchNextPage 호출 추가
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (playlistInView && hasPlaylistNextPage && !isFetchingPlaylistNextPage) {
      fetchPlaylistNextPage();
    }
  }, [
    playlistInView,
    hasPlaylistNextPage,
    isFetchingPlaylistNextPage,
    fetchPlaylistNextPage,
  ]);

  return (
    <StyledTableContainer>
      <Table sx={{ width: "100%", tableLayout: "fixed" }}>
        <TableBody sx={{ width: "100%" }}>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box>
                    <AlbumImage src={track.album?.images[0].url} width="40px" />
                  </Box>
                  <Box sx={{ overflow: "hidden", minWidth: 0, flex: 1 }}>
                    <Typography fontWeight={700} noWrap>
                      {track.name}
                    </Typography>
                    <Typography color="text.secondary" noWrap>
                      {track.artists
                        ? track.artists.map((artist) => artist.name).join(", ")
                        : "Unknown Artist"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right" sx={{ width: "60px" }}>
                <IconButton
                  className="add-button"
                  onClick={(e) => handleAddClick(e, track)}
                  sx={{
                    display:
                      selectedTrack?.id === track.id ? "inline-flex" : "none",
                    color: "white",
                  }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right" sx={{ width: "80px" }}>
                <Typography variant="body2" color="text.secondary">
                  {formatDuration(track.duration_ms)}
                </Typography>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <div ref={ref} style={{ height: 1 }}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
          setSelectedTrack(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            maxHeight: "200px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          },
        }}
      >
        {isPlaylistsLoading && (
          <Box p={2}>
            <LoadingSpinner />
          </Box>
        )}
        {playlists.map((playlist: any) => (
          <MenuItem
            key={playlist.id}
            onClick={handlePlaylistSelect(playlist.id)}
          >
            {playlist.name}
          </MenuItem>
        ))}
        {(hasPlaylistNextPage || isFetchingPlaylistNextPage) && (
          <Box
            ref={playlistRef}
            sx={{ display: "flex", justifyContent: "center", p: 1 }}
          >
            {isFetchingPlaylistNextPage && <LoadingSpinner />}
          </Box>
        )}
      </Menu>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Added to Playlist"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            justifyContent: "center",
            textAlign: "center",
          },
        }}
      />
    </StyledTableContainer>
  );
};

export default SearchResultList;

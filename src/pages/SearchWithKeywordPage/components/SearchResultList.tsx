import { useInView } from "react-intersection-observer";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { addTracksToPlaylist } from "../../../apis/playlistApi";
import { useQueryClient } from "@tanstack/react-query";
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
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
  // props 추가
  playlistId: string;
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
const SearchResultList = ({
  playlistId,
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {
  const [ref, inView] = useInView(); // 무한스크롤 옵저버 추가
  const queryClient = useQueryClient();

  const handleAddTrackToPlaylist = (track: Track) => async () => {
    if (!track.uri) return;
    await addTracksToPlaylist({
      playlist_id: playlistId,
      uris: [track.uri],
    });
    await Promise.all(
      [
        ["current-user-playlists"],
        ["playlist-detail", playlistId],
        ["playlist-items", playlistId],
      ].map((queryKey) => queryClient.invalidateQueries({ queryKey }))
    );
  };

  useEffect(() => {
    // fetchNextPage 호출 추가
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      <TableBody sx={{ width: "100%" }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell>
              <Box display="flex" alignItems="center">
                <Box>
                  <AlbumImage src={track.album?.images[0].url} width="40px" />
                </Box>
                <Box>
                  <Typography fontWeight={700}>{track.name}</Typography>
                  <Typography color="text.secondary">
                    {track.artists ? track.artists[0].name : "Unknown Artist"}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>{track.album?.name}</TableCell>
            <TableCell>
              <Button onClick={handleAddTrackToPlaylist(track)}>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;

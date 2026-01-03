import { Typography, Grid, Box } from "@mui/material";
import React, { useMemo } from "react";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import useGetTracks from "../../../hooks/useGetTracks";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Card from "../../../common/components/Card";
import { Artist } from "../../../models/artist";

const HomeContent = () => {
  const { data: newReleases, error, isLoading } = useGetNewReleases();

  const randomAlbums = useMemo(() => {
    if (!newReleases?.albums?.items) return [];
    return [...newReleases.albums.items]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  }, [newReleases]);

  const randomTracks = useMemo(() => {
    if (!newReleases?.albums?.items) return [];
    const randomAlbums = [...newReleases.albums.items]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((album) => album.id);
    return randomAlbums;
  }, [newReleases]);

  const {
    data: tracks,
    error: tracksError,
    isLoading: tracksLoading,
  } = useGetTracks(randomTracks);

  if (isLoading || tracksLoading) {
    return <LoadingSpinner />;
  }
  if (error || tracksError) {
    return (
      <ErrorMessage
        errorMessage={error?.message || tracksError?.message || ""}
      />
    );
  }
  return (
    <div>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" paddingTop="8px">
          New Released Albums
        </Typography>
        {newReleases && newReleases.albums.items.length > 0 ? (
          <Grid container spacing={2}>
            {newReleases.albums.items.slice(0, 6).map((album) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                <Card
                  image={album.images[0].url}
                  name={album.name}
                  artistName={album.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">No Data</Typography>
        )}
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" paddingTop="8px">
          Tracks
        </Typography>
        {tracks && tracks.length > 0 ? (
          <Grid container spacing={2}>
            {tracks.map((track: any) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.id}>
                <Card
                  image={track.images[0].url}
                  name={track.name}
                  artistName={track.artists
                    .map((artist: any) => artist.name)
                    .join(", ")}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">No Data</Typography>
        )}
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h1" paddingTop="8px">
          Albums
        </Typography>
        {randomAlbums.length > 0 ? (
          <Grid container spacing={2}>
            {randomAlbums.map((album) => (
              <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
                <Card
                  image={album.images[0].url}
                  name={album.name}
                  artistName={album.artists
                    .map((artist: Artist) => artist.name)
                    .join(", ")}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h2">No Data</Typography>
        )}
      </Box>
    </div>
  );
};

export default HomeContent;

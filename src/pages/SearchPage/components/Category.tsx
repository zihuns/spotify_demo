import { Box, Grid, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useBrowseCategories from "../../../hooks/useBrowseCategories";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import { useInView } from "react-intersection-observer";

const categoryColors = [
  "#27856A",
  "#1E3264",
  "#E8115B",
  "#F037A5",
  "#B49BC8",
  "#8D67AB",
  "#777777",
  "#D7F27D",
  "#BA5D07",
  "#477D95",
  "#E13300",
  "#A56752",
  "#509BF5",
  "#AF2896",
  "#5179A1",
];

const CardBox = styled(Box)({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  aspectRatio: "6 / 4",
  padding: "16px",
});

const CategoryImage = styled("img")({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: "50%",
  height: "70%",
  transform: "rotate(25deg) translate(18%, -2%)",
  boxShadow: "0 2px 4px rgba(0,0,0,.2)",
});

const Category = () => {
  const [ref, inView] = useInView();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useBrowseCategories({
    locale: "ko_KR",
    limit: 30,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const categories =
    data?.pages.flatMap((page: any) => page.categories?.items ?? []) ?? [];

  return (
    <div>
      <Typography variant="h1" my="10px">
        Browse all
      </Typography>
      <Grid container spacing={2}>
        {categories.map((item: any, index: number) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <CardBox
              sx={{
                backgroundColor: categoryColors[index % categoryColors.length],
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {item.name}
              </Typography>
              <CategoryImage src={item.icons[0].url} alt={item.name} />
            </CardBox>
          </Grid>
        ))}
        {hasNextPage && (
          <Grid size={{ xs: 12 }} sx={{ height: "5px" }} ref={ref} />
        )}
        {isFetchingNextPage && (
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
            <LoadingSpinner />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Category;

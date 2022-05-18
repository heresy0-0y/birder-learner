import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { MasonryInfiniteGrid as MasonryGrid } from "@egjs/react-infinitegrid";
import {
  Spinner,
  Box,
  useBreakpointValue,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Bird, Link } from "../../common/components";
import {
  useGetBirdsByIPCountryCodeQuery,
  useGetBirdsByCoordsQuery,
} from "../../common/services/birds.js";
import { useGetFavoritesQuery } from "../../common/services/auth";
import { selectCurrentUser } from "../../store/features/authSlice";
import { setCurrentBirds } from "../../store/features/birdsSlice";
import {
  selectCurrentLocation,
  setFetching,
  setLocation,
} from "../../store/features/locationSlice";
const BirdGrid = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const [skip, setSkip] = useState(true);
  const user = useSelector(selectCurrentUser);
  const location = useSelector(selectCurrentLocation);
  const {
    data: birdsByLocation,
    isFetching,
    isLoading: isLoadingCoords,
    refetch,
  } = useGetBirdsByCoordsQuery(location, { skip });
  const { data: favorites, isLoading: favoritesLoading } =
    useGetFavoritesQuery();
  const [birdsHere, setBirds] = useState();
  const [renderBirds, setRender] = useState();
  const sizes = useBreakpointValue({ base: "90vw", sm: "50vw" });
  const router = useRouter();
  const currentPath = router.asPath;
  const column = useBreakpointValue({ base: "1", sm: 2, lg: "3", "2xl": 4 });
  const width = useBreakpointValue({
    base: "xs",
    xs: "sm",
    sm: "xs",
    md: "sm",
    lg: "xs",
    xl: "sm",
    "2xl": "md",
  });
  const gap = useBreakpointValue({ base: 5, sm: 10, md: 10 });

  useEffect(() => {
    if (location?.coords === null) {
      setSkip(true);
    } else {
      setSkip(false);
      refetch();
    }
  }, [location]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setFetching(true));
    } else {
      dispatch(setFetching(false));
    }
  }, [isFetching]);

  useEffect(() => {
    if (currentPath.includes("favorites") && favorites) {
      const userFavorites = favorites.filter(
        (favorite) => favorite.user_id === user.id
      );
      setBirds(userFavorites);
    } else if (birdsByLocation?.results) {
      setBirds(birdsByLocation.results);
      dispatch(setCurrentBirds(birdsByLocation.results));
      dispatch(setLocation({ coords: null, distance: null }));
    } else {
      setBirds(data?.results);
      dispatch(setCurrentBirds(data?.results));
    }
  }, [isLoading, birdsByLocation]);

  useEffect(() => {
    if (currentPath.includes("favorites")) {
      const birds = birdsHere?.map((bird, index) => (
        <Link
          url={`/songs/${bird.key}/${bird.taxon_key}`}
          key={bird.key}
          className={"item"}
          w="fit-content"
        >
          <Bird
            w={width}
            maxW="95%"
            priority={index < 10 ? "true" : "false"}
            name={bird.scientificName}
            url={bird.image_url}
            key={bird.key}
            sizes={sizes}
          />
        </Link>
      ));
      setRender(birds);
    } else {
      const birds = birdsHere?.map((bird, index) => (
        <Link
          w={width}
          url={`/songs/${bird.key}/${bird.taxonKey}`}
          key={bird.key}
          className={"item"}
        >
          <Bird
            w={width}
            // maxW="100%"
            priority={index < 10 ? "true" : "false"}
            name={bird.scientificName}
            url={bird.media[0].identifier}
            key={bird.key}
            sizes={sizes}
          ></Bird>
        </Link>
      ));
      setRender(birds);
    }
  }, [birdsHere]);

  if (isLoading || favoritesLoading || isLoadingCoords) {
    return (
      <VStack w="100%" minH="100%" my="3%">
        <Spinner />
      </VStack>
    );
  }

  return (
    <Flex w="100vw" align="center" direction="column">
      <Box my="3%" w="100vw" left="0" right="0">
        <MasonryGrid
          className="container"
          column={column}
          align="center"
          gap={gap}
          width="100vw"
          resizeDebounce="4"
        >
          {renderBirds}
        </MasonryGrid>
      </Box>
    </Flex>
  );
};
export default BirdGrid;

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MasonryInfiniteGrid as MasonryGrid } from "@egjs/react-infinitegrid";
import { Spinner, Box, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Bird, Link } from "../../common/components";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";
import { useGetFavoritesQuery } from "../../common/services/auth";
import { selectCurrentUser } from "../../store/features/authSlice";
const BirdGrid = () => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const user = useSelector(selectCurrentUser);
  const { data: favorites, isLoading: favoritesLoading } =
    useGetFavoritesQuery();
  const [birdsHere, setBirds] = useState();
  const [renderBirds, setRender] = useState();
  const [keys, setKeys] = useState();
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
    if (currentPath.includes("favorites")) {
      const userFavorites = favorites.filter(
        (favorite) => favorite.user_id === user.id
      );
      setBirds(favorites);
    } else {
      setBirds(data?.results);
    }
  }, [isLoading]);

  useEffect(() => {
    if (currentPath.includes("favorites")) {
      const birds = birdsHere?.map((bird, index) => (
        <Link url={`/songs/${bird.id}`} key={bird.id} className={"item"}>
          <Bird
            w={width}
            priority={index < 10 ? "true" : "false"}
            // name={bird.scientificName}
            img={bird.image_url}
            // key={bird.key}
          />
        </Link>
      ));
      setRender(birds);
    } else {
      const birds = birdsHere?.map((bird, index) => (
        <Link url={`songs/${bird.key}`} key={bird.key} className={"item"}>
          <Bird
            w={width}
            priority={index < 10 ? "true" : "false"}
            name={bird.scientificName}
            img={bird.media[0].identifier}
            key={bird.key}
          />
        </Link>
      ));
      setRender(birds);
    }
  }, [birdsHere]);

  if (isLoading || favoritesLoading) {
    return <Spinner />;
  }

  return (
    <VStack
      w="100vw"
      overflow="hidden"
      minH="100vh"

      // px='2%'
    >
      <Box w="100vw">
        <MasonryGrid
          className="container"
          column={column}
          align="center"
          gap={gap}
          width="100vw"
          resizeDebounce="0">
          {renderBirds}
        </MasonryGrid>
      </Box>
    </VStack>
  );
};
export default BirdGrid;

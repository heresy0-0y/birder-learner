import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Bird } from "../../common/components";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import {
  useGetBirdByKeyQuery,
  useGetVernacularQuery,
} from "../../common/services/birds.js";
import { useSelector } from "react-redux";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
} from "../../common/services/auth";
import { selectCurrentUser } from "../../store/features/authSlice";

export const BirdFocus = (props) => {
  const router = useRouter();
  const { id, taxonKey } = router.query;

  const user = useSelector(selectCurrentUser);
  const [skip, setSkip] = useState(true);
  const [bird, setBird] = useState();
  const [userFavorites, setFavorites] = useState([]);
  const [birdName, setName] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [favoritedIcon, setFavoritedIcon] = useState(<MdFavoriteBorder />);

  const { data: favorites, refetch } = useGetFavoritesQuery();
  const { data: speciesInfo } = useGetVernacularQuery(taxonKey);
  const { data, isLoading } = useGetBirdByKeyQuery(id, { skip });

  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [addFavorite] = useAddFavoriteMutation();

  useEffect(() => {
    if (id === undefined) {
      setSkip(true);
    } else {
      setSkip(false);
    }
  }, [id]);

  useEffect(() => {
    if (favorited) {
      setFavoritedIcon(<MdFavorite />);
    }
  }, [favorited]);

  useEffect(() => {
    if (user && favorites) {
      setFavorites(
        favorites.filter((favorite) => favorite.user_id === user.id)
      );
    }
  }, [user, favorites]);

  useEffect(() => {
    if (data) {
      setBird(data);
      if (birdName === "") {
        setName(data.scientificName);
      }
    }
  }, [data]);

  useEffect(() => {
    if (speciesInfo?.vernacularName) {
      setName(speciesInfo.vernacularName);
    }
  }, [speciesInfo]);

  useEffect(() => {
    if (favorites) {
      favorites.forEach((favorite) => {
        if (favorite.key === id) {
          setFavorited(true);
        }
      });
    }
  }, [userFavorites]);

  if (isLoading || !bird) {
    return null;
  }

  const handleFavorite = async () => {
    try {
      if (favorited) {
        const favorite = userFavorites.filter(
          (favorite) => favorite.key === id
        )[0];
        await deleteFavorite(favorite.id);

        setFavorited(false);
        refetch();
      } else {
        const favorite = {
          user_id: user.id,
          image_url: bird.media[0].identifier,
          taxon_key: bird.taxonKey,
          key: bird.key,
          scientific_name: bird.scientificName,
        };
        const favoriteSent = await addFavorite(favorite);
        setFavorited(true);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex my="3%" direction="column" align="center" maxW="90%">
      <Heading as="h1" size="lg" maxW="90%" mb="3%" align="center">
        {birdName}
        <IconButton
          bg="hsla(210, 38%, 95%, 0.1)"
          ml="0.5rem"
          aria-label="favorite"
          onClick={handleFavorite}
          icon={favoritedIcon}
        />
      </Heading>
      <Bird
        url={bird.media[0].identifier}
        bird={bird}
        name={bird.scientificName}
        taxonKey={bird.taxonKey}
        w="md"
        maxW="90%"
        h="40vh"
        priority="true"
      />
    </Flex>
  );
};

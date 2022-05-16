import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Bird } from "../../common/components";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { useGetBirdByKeyQuery } from "../../common/services/birds.js";
import { useSelector } from "react-redux";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
} from "../../common/services/auth";
import { selectCurrentUser } from "../../store/features/authSlice";

export const BirdFocus = (props) => {
  const { data: favorites, isSuccess, refetch } = useGetFavoritesQuery();
  const [userFavorites, setFavorites] = useState();
  const [bird, setBird] = useState();
  const [skip, setSkip] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const [deleteFavorite, { isSuccess: favoriteDeleted }] =
    useDeleteFavoriteMutation();
  const user = useSelector(selectCurrentUser);
  const [addFavorite, { isLoading: favoritePending }] =
    useAddFavoriteMutation();
  const router = useRouter();
  const id = router.query.id;
  const { data, isLoading } = useGetBirdByKeyQuery(id, { skip });

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

  useEffect(() => {
    if (id === undefined) {
      setSkip(true);
    } else {
      setSkip(false);
    }
  }, [id]);

  useEffect(() => {
    if (data) {
      setBird(data);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess && user) {
      setFavorites(
        favorites.filter((favorite) => favorite.user_id === user.id)
      );
    }
  }, [user, favorites]);

  useEffect(() => {
    if (bird && userFavorites) {
      if (userFavorites.some((favorite) => favorite.key === id)) {
        setFavorited(true);
      }
    }
  }, [userFavorites]);

  if (isLoading || !bird) {
    return null;
  }

  return (
    <Flex my="3%" direction="column" align="center">
      <Heading as="h1" size="lg" maxW="90%" mb="3%" align="center">
        {bird.vernacularName ? bird.vernacularName : bird.scientificName}
        <IconButton
          bg="hsla(210, 38%, 95%, 0.1)"
          ml="0.5rem"
          aria-label="favorite"
          onClick={handleFavorite}
          icon={favorited ? <MdFavorite /> : <MdFavoriteBorder />}
        />
      </Heading>
      <Bird
        url={bird.media[0].identifier}
        bird={bird}
        name={bird.scientificName}
        taxonKey={bird.taxonKey}
        w="40%"
        h="40%"
        priority="true"
      />
    </Flex>
  );
};

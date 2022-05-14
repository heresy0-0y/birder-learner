import { getFavorites } from "../../../common/services/birds";
const handleFavorite = async (favorited) => {
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

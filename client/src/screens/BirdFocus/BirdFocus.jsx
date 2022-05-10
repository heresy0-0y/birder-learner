import { useRouter } from "next/router";
import { Bird } from "../../common/components";
import { VStack, Heading, Button } from "@chakra-ui/react";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";
import { useSelector, useDispatch } from "react-redux";
import { useAddFavoriteMutation } from "../../common/services/auth";
import { selectCurrentUser } from "../../store/features/authSlice";

export const BirdFocus = (props) => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [addFavorite, { isLoading: favoritePending }] =
    useAddFavoriteMutation();
  const router = useRouter();
  const id = router.asPath.split("/").pop();
  const bird = data.results.filter((bird) => bird.key == id)[0];
  const handleFavorite = async () => {
    try {
      const favorite = {
        user_id: user.id,
        image_url: bird.media[0].identifier,
        taxon_key: bird.taxonKey,
        key: bird.key,
        scientific_name: bird.scientificName
      };
      const favorited = await addFavorite(favorite);
      console.log(favorited);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return null;
  }


  return (
    <VStack>
      <Heading as="h1" size="lg">
        {bird.vernacularName ? bird.vernacularName : bird.scientificName}
      </Heading>
      <Button onClick={handleFavorite} >Favorite</Button>
      <Bird
        img={bird.media[0].identifier}
        bird={bird}
        name={bird.scientificName}
        taxonKey={bird.taxonKey}
        w="md"
        priority="true"
      />
    </VStack>
  );
};

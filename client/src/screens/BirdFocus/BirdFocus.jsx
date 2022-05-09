import { useRouter } from "next/router";
import { Bird } from "../../common/components";
import { VStack, Heading } from "@chakra-ui/react";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";

export const BirdFocus = (props) => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const router = useRouter();
  const id = router.asPath.split("/").pop();

  if (isLoading) {
    return null;
  }

  const bird = data.results.filter((bird) => bird.key == id)[0];

  return (
    <VStack>
      <Heading as="h1" size="lg">
        {bird.vernacularName ? bird.vernacularName : bird.scientificName}
      </Heading>
      <Bird
        img={bird.media[0].identifier}
        bird={bird}
        name={bird.scientificName}
        taxonKey={bird.taxonKey}
        w="md"
      />
    </VStack>
  );
};

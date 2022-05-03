import { useRouter } from "next/router";
import { Bird } from "../../common/components";
import { VStack } from "@chakra-ui/react";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";

export const BirdFocus = (props) => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const router = useRouter();
  const id = router.asPath.split("/").pop();

  if (isLoading) {
    return null;
  }

  const bird = data.results.filter((bird) => Number(bird.taxonKey) == id)[0];

  return (
    <VStack >
      <Bird img={bird.media[0].identifier} name={bird.scientificName} taxonKey={bird.taxonKey} h="md" />
    </VStack>
  );
};

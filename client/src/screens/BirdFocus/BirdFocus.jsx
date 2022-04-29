import { useRouter } from "next/router";
import { default as Image } from "next/image";
import {Bird} from '../../common/components'
import { Box } from "@chakra-ui/react";
import { useGetBirdsByIPCountryCodeQuery } from "../../common/services/birds.js";

export const BirdFocus = (props) => {
  const { data, error, isLoading } = useGetBirdsByIPCountryCodeQuery();
  const router = useRouter();
  const id = router.asPath.split("/").pop();

  if (isLoading) {
    return null;
  }

  const bird = data.results.filter((bird) => Number(bird.key) == id)[0];

  return (
    <Box h="md" w="md" position="relative" mb="80%" borderRadius='xl' overflow='hidden'>
      <Bird
        img={bird.media[0].identifier}
        name={bird.scientificName}
        layout="fill"
        objectFit="cover"
        top="0"
      />
    </Box>
  );
};

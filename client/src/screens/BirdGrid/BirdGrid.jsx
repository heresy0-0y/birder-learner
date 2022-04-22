import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Bird } from "../../common/components/Bird/Bird.js";
import { fetchBirds, fetchLocation } from "../../common/services";

export const BirdGrid = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState(false);
  const [birds, setBirds] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchCountry = async () => {
      const countryCode = await fetchLocation();
      setCountry(countryCode);
    };
    fetchCountry();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchBirdsData = async () => {
      const birds = await fetchBirds(country);
      setData(birds);
    };
    if (country) {
      fetchBirdsData();
    }
  }, [country]);

  useEffect(() => {
    const birdsView = data.map((bird) => (
      <GridItem>
        <Bird name={bird.scientificName} img={bird.media[0].identifier} />
      </GridItem>
    ));
    setBirds(birdsView);
  }, [data]);

  return (
    <Grid
      h="90%"
      py="2rem"
      w="95%"
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
        "repeat(5,1fr)",
      ]}
      gap={5}
    >
      {birds}
    </Grid>
  );
};

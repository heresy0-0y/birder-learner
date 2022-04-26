import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, GridItem } from "@chakra-ui/react";
import { Bird } from "../../common/components";
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
      <GridItem mb="0.5rem" key={bird.key}>
        <Bird name={bird.scientificName} img={bird.media[0].identifier} />
      </GridItem>
    ));
    setBirds(birdsView);
  }, [data]);

  return (
    <Box
      h="90%"
      py="2rem"
      mx="2%"
      sx={{ columnCount: [1, 2, 3], columnGap: "0.5rem" }}>
      {birds}
    </Box>
  );
};

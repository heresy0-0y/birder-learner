import {useState, useEffect} from 'react'
import { Grid, GridItem } from "@chakra-ui/react";
import {Bird} from '../../common/components/Bird/Bird.js'
import fetchBirds from '../../common/services/birds.js'

export const BirdGrid = (props) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBirdsData = async () => {
      setLoading(true)
      const birds = await fetchBirds();
      setData(birds)
      setLoading(false)

    }
    fetchBirdsData()
    

  },[])

  const birdsView = data.map((bird) => (
    <GridItem> <Bird name={bird.scientificName} img={bird.media[0].identifier} isLoading={isLoading} /> </GridItem>
  ))
  


  return (
    <Grid w="95%" templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(5,1fr)']} gap={5}>
     {birdsView}
    </Grid>
  );
};

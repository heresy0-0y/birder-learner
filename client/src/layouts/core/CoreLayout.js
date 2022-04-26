import React, {useEffect, useState} from 'react'
import { VStack } from "@chakra-ui/react";
import { Container, DarkModeSwitch, Nav } from "./components";
import {selectAllBirds, loadBirds } from '../../store/features/allBirds/allBirdsSlice.js'
import {fetchLocation} from '../../common/services'
import { useSelector, useDispatch } from "react-redux";

const CoreLayout = (props) => {
  const dispatch = useDispatch()
  const [country,setCountry] = useState('')
  useEffect(() => {
    const getCountryCode = async () => {
      const code = await fetchLocation()
      setCountry(code)
    }
    getCountryCode()
  },[])
  useEffect(() => {
    dispatch(loadBirds(country))
  }, [country]);
  return (
    <Container minH='100vh'>
    <Nav/>
      <VStack>{props.children}</VStack>
      <DarkModeSwitch />
    </Container>
  );
};

export default CoreLayout;

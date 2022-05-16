import React, { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  List,
  Center,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
export const Playlist = (props) => {
  const { songs, selectedTrack, setSelected } = props;

  if (!songs) {
    return <List />;
  }

  return (
    <Center mb="5%">
      <TableContainer maxWidth="90vw" whiteSpace="wrap">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th color="inherit">Recorded by</Th>
              <Th color="inherit">Location</Th>
              <Th color="inherit">Date</Th>
              <Th color="inherit">Published by</Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, index) => (
              <Tr
                key={index}
                onClick={() => setSelected(song.tracks[0].identifier)}
              >
                <Td>{song.tracks[0].creator}</Td>
                <Td>{song.location}</Td>
                <Td>{new Date(song.date).toDateString()} </Td>
                <Td>{song.tracks[0].publisher}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

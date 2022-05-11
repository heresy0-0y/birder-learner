import React, { useState, useEffect } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  List,
  Text,
  ListIcon,
  ListItem,
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
    <TableContainer maxWidth="80vw" whiteSpace="wrap">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Recorded by</Th>
            <Th>Location</Th>
            <Th>Date</Th>
            <Th>Published by</Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, index) => (
            <Tr
              key={index}
              onClick={() => setSelected(song.tracks[0].identifier)}>
              <Td>{song.tracks[0].creator}</Td>
              <Td>{song.location}</Td>
              <Td>{new Date(song.date).toDateString()} </Td>
              <Td>{song.tracks[0].publisher}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

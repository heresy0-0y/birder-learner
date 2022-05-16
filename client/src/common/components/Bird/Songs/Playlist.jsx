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
  Flex,
} from "@chakra-ui/react";
export const Playlist = (props) => {
  const { songs, selectedTrack, setSelected } = props;
  if (!songs) {
    return <List />;
  }

  return (
    <Center mb="5%">
      <TableContainer maxWidth="95vw" whiteSpace="wrap">
        <Table size="sm">
          <Thead>
            <Tr>
              <Th></Th>
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
                fontWeight={
                  selectedTrack === song.tracks[0].identifier
                    ? "bold"
                    : "normal"
                }
              >
                <Td>
                  {selectedTrack === song.tracks[0].identifier ? (
                    <AiOutlinePlayCircle />
                  ) : null}
                </Td>
                <Td pl="0%">{song.tracks[0].creator}</Td>
                <Td pl="0%">{song.location}</Td>
                <Td pl="2%" whiteSpace="nowrap">
                  {new Date(song.date).toLocaleString().split(",")[0]}{" "}
                </Td>
                <Td>{song.tracks[0].publisher}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
};

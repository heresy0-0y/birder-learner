import React, {useState, useEffect} from 'react';
import {AiOutlinePlayCircle} from 'react-icons/ai'
import {List, Text, VStack, Container} from '@chakra-ui/react'
export const Playlist = ({songs, selectedTrack, setSelected}) => {

      const [list, setList] = useState(null)
     





  if (!songs) {
    return <List/>
  }

  return (
    <VStack>

          {songs.map((song) => (
            <Text>

              {song.publisher}
            </Text>
          ))}

    </VStack>
  );
};

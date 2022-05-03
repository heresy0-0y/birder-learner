import React, {useState, useEffect} from 'react';
import {AiOutlinePlayCircle} from 'react-icons/ai'
import {List, Text, ListIcon, ListItem} from '@chakra-ui/react'
export const Playlist = ({songs, selectedTrack, setSelected}) => {

      const [list, setList] = useState(null)
     





  if (!songs) {
    return <List/>
  }

  return (

        <List>
          {songs.map((song, index) => (
            <ListItem key={index} onClick={() => setSelected(song.identifier)}>
              {song.creator}
              {song.publisher}
            </ListItem>
          ))}
  </List>

  );
};

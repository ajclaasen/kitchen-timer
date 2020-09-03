import React from 'react';

import { IconButton } from '@material-ui/core';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

interface PlayingAndOnClickButton {
  playing?: Boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PlayPauseButton = ({playing=false, onClick}:PlayingAndOnClickButton) => {

  const ariaLabel = playing ? "pause" : "play";
  const icon = playing ? <PauseIcon /> : <PlayArrowIcon />;

  return (
    <IconButton aria-label={ariaLabel} className='play-pause-button' onClick={onClick}>
      {icon}
    </IconButton>
  )
};

export default PlayPauseButton;

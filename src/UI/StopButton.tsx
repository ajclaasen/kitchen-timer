import React from 'react';

import { IconButton } from '@material-ui/core';

import StopIcon from '@material-ui/icons/Stop';

interface OnClickButton {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StopButton = ({onClick}:OnClickButton) => {
  return (
    <IconButton aria-label='stop' className='stop-button' onClick={onClick}>
      <StopIcon />
    </IconButton>
  )
};

export default StopButton;

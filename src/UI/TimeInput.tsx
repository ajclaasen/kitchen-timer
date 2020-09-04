import React, { Component } from 'react';

import { TextField } from '@material-ui/core';

interface TimeInputProps {
  onChange?: (arg0:number) => void,
  enabled?: boolean,
}

class TimeInput extends Component<TimeInputProps> {
  minutes = 0;
  seconds = 0;

  static defaultProps = {
    onChange: () => {},
    enabled: true,
  };

  updateMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.minutes = Number(event.currentTarget.value);

    this.onChange();
  }

  updateSeconds = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.seconds = Number(event.currentTarget.value);

    this.onChange();
  }

  onChange = () => {
    const timeInMilliseconds = (this.minutes * 60 * 1000) + (this.seconds * 1000);

    this.props.onChange!(timeInMilliseconds);
  }

  render() {
    return (
      <form autoComplete="off">

        <TextField
          id="minutes-field"
          label="Minutes"
          type="number"
          disabled={!this.props.enabled}
          InputProps={{inputProps: { min:0 }}}
          onChange={this.updateMinutes}
        />

        <TextField
          id="seconds-field"
          label="Seconds"
          type="number"
          disabled={!this.props.enabled}
          InputProps={{inputProps: { min:0 }}}
          onChange={this.updateSeconds}
        />

      </form>
    )
  }
}

export default TimeInput;

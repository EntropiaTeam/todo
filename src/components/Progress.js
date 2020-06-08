import React from 'react';
import Typography from '@material-ui/core/Typography';

function Progress(props) {
    return (
        <Typography variant="h6">
            {props.total - props.done} remaining out of {props.total} tasks
        </Typography>
    );
  }
export default Progress;
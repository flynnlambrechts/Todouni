import React from 'react';
import { Box } from '@mui/material';
import { getTaskStatus, updateState } from '../../helpers';
import { statusStyles } from '../../config';

function TaskBlock(props) {
    // props: {subjectName, task, week}
    
    const initialStatus = getTaskStatus(props.task, props.week);
    const [state, setState] = React.useState(Object.keys(statusStyles).indexOf(initialStatus));
    
    
    const taskBlockStyles = {
        justifySelf: "stretch",
        // border: "0.4px solid grey",
        // height: 40,
        flexGrow: 1,
        borderRadius: "10px",
        ...Object.values(statusStyles)[state],
    }

    const getNameOfState = (ofState) => {
        return Object.keys(statusStyles)[ofState];
    }
    
    const getNextState = () => {
        let newState = (state + 1) % Object.keys(statusStyles).length;
        if (getNameOfState(newState) === "locked" && statusStyles.length !== 1) {
            newState = (state + 2) % Object.keys(statusStyles).length;
        }
        return newState;
    }

    const cycleStatus = () => {
        if (initialStatus === "locked") {
            return;
        }
        const newState = getNextState();
        props.subjectName && updateState(props.subjectName, props.task.name, props.week - 1, newState);
        setState(newState);
    }

    return (<Box 
        sx={taskBlockStyles}
        onMouseDown={cycleStatus}
    >
        {/* { getNameOfState(state)}{ state} */}
    </Box>);
}

export default TaskBlock;

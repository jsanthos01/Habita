import React, { useState } from 'react';
import { makeStyles, Tooltip } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon, SpeedDialAction }from '@material-ui/lab';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ShareIcon from '@material-ui/icons/Share';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { CreateTask } from "./components";

const useStyles = makeStyles((theme) => ({
    root: {
        transform: 'translateZ(0px)',
        flexGrow: 1,
    },
    exampleWrapper: {
        width: "100%",
    },
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'absolute',
        '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
            top: "280px",
            left: "35px",
        },
        color: "rgba(0,184,255, 1)"
    },
}));

const actions = [
  { icon: <CheckCircleOutlineIcon />, name: 'Habit' },
  { icon: <CalendarTodayIcon />, name: 'Daily' },
  { icon: <PlaylistAddCheckIcon />, name: 'To Do' },
  { icon: <GroupAddIcon />, name: 'Add Group' },
];

const SpeedDials = () => {
    const classes = useStyles();
    const direction = "right";
    const [speedDial, setSpeedDial] = useState(false);
    const [openForm, setOpenForm] = useState({ action: "", state: false});
    
    const handleSpeedDial = () => {
        setSpeedDial(!speedDial);
    };

    const handleClickAction = (action) => {
        setOpenForm({
            action, 
            state: true
        })
    }

    return (
        <div className={classes.exampleWrapper}>
            <SpeedDial
                ariaLabel="SpeedDial example"
                className={classes.speedDial}
                icon={<SpeedDialIcon />}
                onClick={handleSpeedDial}
                open={speedDial}
                direction={direction}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => handleClickAction(action.name)}
                    />
                ))}
            </SpeedDial>
            { openForm.state ? <CreateTask setOpenForm={setOpenForm} openForm={openForm} /> : ""}
        </div>
    );
}

export default SpeedDials
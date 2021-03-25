import React, { useState } from 'react'
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    DialogContentText,
    // DialogTitle,
    makeStyles,
    withStyles,
    Divider,
    IconButton,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ToggleIcon from "material-ui-toggle-icon";

const useStyles = makeStyles((theme) => ({
    root: {     
        height: "100%",   
        '& .MuiTextField-root': {
            margin: theme.spacing(2,0 ),
            width: '50ch',
        }
    },
    inputResize: {
        fontSize: 10
    },
    topGroup: {
        backgroundColor: "rgba(0,184,255, 0.2)",
        fontWeight: "bold"
    },
    orientation: {
        display: "flex",
        flexDirection: "column"
    },
    habitType: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        margin: theme.spacing(0, 6)
    },
    button: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    }
  
}));

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
});

  
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  
const CreateTask = (props) => {
    const { setOpenForm, openForm } = props;
    const classes = useStyles();
    const [difficulty, setDifficulty] = useState();
    const [tags, setTags] = useState();
    const [timeframe, setTimeframe] = useState();
    const difficultyOptions = ["Trivial", "Easy", "Medium", "High"]
    const tagOptions = ["Work", "School", "Chores", "Health + Wellness"]
    const timeframeOptions = ["Weekly", "Monthly", "Yearly"];
    const [positiveState, setPositiveState] = useState({ on: false });
    const [negativeState, setNegativeState] = useState({ on: false });

    const handleClose = () => {
        setOpenForm({ action: "", state: false });
    }
    return (
        <Dialog maxWidth={448} open={openForm.state} aria-labelledby="form-dialog-title" className={classes.root}>
            <div className={classes.topGroup}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create {openForm.action}
                </DialogTitle>
                <DialogContent className={classes.orientation}>
                    <TextField 
                        size="small" 
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        required 
                        id="standard-required" 
                        label="Title" 
                        placeholder="Add a title" 
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        size="small" 
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        rows={3}
                        placeholder="Add some Notes"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
            </div>
            <Divider />
            <DialogContent className={classes.bottomContent}>
                <div className={classes.habitType}>
                    <div className={classes.button}>
                        <IconButton   size="medium" onClick={() => setPositiveState((state) => ({ on: !state.on }))}>
                            <ToggleIcon
                                on={positiveState.on}
                                offIcon={<AddCircleOutlineIcon />}
                                onIcon={<AddCircleIcon />}
                                style={{color: "rgba(0,184,255, 1)"}}
                            />
                        </IconButton>
                        Positive                        
                    </div>
                    <div className={classes.button}>
                        <IconButton size="medium" onClick={() => setNegativeState((state) => ({ on: !state.on }))}>
                            <ToggleIcon
                                on={negativeState.on}
                                offIcon={<RemoveCircleOutlineIcon />}
                                onIcon={<RemoveCircleIcon />}
                                style={{color: "rgba(0,184,255, 1)"}}
                            />
                        </IconButton>
                        Negative
                    </div>
                </div>
                <div className={classes.orientation}>
                    <Autocomplete
                        size="small" 
                        id="combo-box-demo"
                        options={difficultyOptions}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Difficulty" variant="outlined" />}
                    />
                    <Autocomplete
                        size="small" 
                        id="combo-box-demo"
                        options={tagOptions}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Tags" variant="outlined" />}
                    />
                    <Autocomplete
                        size="small" 
                        id="combo-box-demo"
                        options={timeframeOptions}
                        getOptionLabel={(option) => option}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Reset Streak" variant="outlined" />}
                    />
                </div>
                <Button>Create</Button>
            </DialogContent>

        </Dialog>
    )
}

export default CreateTask

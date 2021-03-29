import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    Button,
    TextField,
    Dialog,
    DialogContent,
    makeStyles,
    withStyles,
    Divider,
    IconButton,
    Typography,
    Snackbar,
    createMuiTheme, 
    ThemeProvider
} from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
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
            width: '50ch'
          
        },
        '& .MuiAutocomplete-input': {
            fontSize: 12
        },
        // '& .MuiInputBase-root': {
        //     color: 'white',
        // },

        "& .MuiInputLabel-root": { 
            color: 'white',
        },
    },
    inputResize: {
        fontSize: 10
    },
    topGroup: {
        backgroundColor: "#E24429",
        fontWeight: 800,
        color: "white"
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
    },
  
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
      color: "white",
    },
});

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#fff',
      },
    },
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green',
            },
        },
        "& .MuiOutlinedInput-inputMultiline": {
            color: "white",
            borderColor: "#fff"
        },
        
    }
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
    const [ data, setData] = useState({
        title: "", 
        notes: "",
        difficulty: "Easy",
        tags: "Work",
        timeframe: "Weekly"
    });

    const difficultyOptions = ["Trivial", "Easy", "Medium", "High"]
    const tagOptions = ["Work", "School", "Chores", "Health + Wellness"]
    const timeframeOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
    const [positiveState, setPositiveState] = useState({ on: false });
    const [negativeState, setNegativeState] = useState({ on: false });
    const [error, setError] = useState("");
    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });
 
    const { vertical, horizontal, open } = state;
    const handleSnackbarClose = () => {
        setState({ ...state, open: false });
    };

    const handleClose = () => {
        setOpenForm({ action: "", state: false });
    }

    const handleFieldChange = (e, field, value) => {
        if (!value) {
            value = e.target.value;
        }
        setData( { ...data, [field]: value } );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.title) {
            setTimeout(() => {
            setError("");
            }, 5000);
            return setError("Please add a title!");
        }

        const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("authToken")}`,            
            },
          };
      
          try {
            await axios.post(
              "/api/user/habit/create",
              data,
              config
            );

            setData({
                title: "", 
                notes: "",
                difficulty: "Easy",
                tags: "Work",
                timeframe: "Weekly"
            });
      
            setOpenForm({ action: "", state: false});
          } catch (error) {
            
            setError(error.response.data.error);
            setTimeout(() => {
              setError("");
            }, 5000);
          }
    }

    return (
        <Dialog maxWidth={448} open={openForm.state} aria-labelledby="form-dialog-title" className={classes.root}>
             {
                error &&
                <Snackbar 
                open={open}
                anchorOrigin={{ vertical, horizontal }}
                autoHideDuration={6000} 
                key={vertical + horizontal}
                onClose={handleSnackbarClose}
                >
                <Alert onClose={handleSnackbarClose}severity="error">{ error }</Alert>
                </Snackbar>
            }
            <div className={classes.topGroup}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Create {openForm.action}
                </DialogTitle>

                <DialogContent className={classes.orientation}>     
                    <ThemeProvider theme={theme}>
                    <TextField 
                        size="small" 
                        value={data.title}
                        onChange={(e) => handleFieldChange(e, "title")}
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        required 
                        id="title"
                        label="Title" 
                        variant="outlined"
                        placeholder="Add a title" 
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        value={data.notes}
                        onChange={(e, value) => handleFieldChange(e,"notes", value)}
                        size="small" 
                        id="notes"
                        label="Notes"
                        multiline
                        rows={3}
                        placeholder="Add some Notes"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    </ThemeProvider>                   
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
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        options={difficultyOptions.map(option => option)}
                        value={data.difficulty}
                        getOptionLabel={(option) => option}
                        getOptionSelected={(option, value) => option === value }
                        onChange={(e, value) => handleFieldChange(e, "difficulty", value)}
                        style={{ width: 300 }}
                        label="Difficulty"
                        renderInput={(params) => <TextField {...params} id="difficulty" label="Difficulty" variant="outlined" />}
                    />
                    <Autocomplete
                        size="small" 
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        value={data.tags}
                        onChange={(e, value) => handleFieldChange(e,"tags", value)}
                        options={tagOptions.map(option => option)}                        
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} id="tags" label="Tags" variant="outlined" />}
                    />
                    <Autocomplete
                        size="small" 
                        inputProps={{style: {fontSize: 12, marginTop: "10px"}}}
                        value={data.timeframe}
                        onChange={(e,value) => handleFieldChange(e,"timeframe", value)}
                        options={timeframeOptions.map(option => option)}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} id="timeframe" label="Reset Streak" variant="outlined" />}
                    />
                </div>
            </DialogContent>            
            <Button type="submit" onClick={handleSubmit}>Create</Button>
        </Dialog>
    )
}

export default CreateTask

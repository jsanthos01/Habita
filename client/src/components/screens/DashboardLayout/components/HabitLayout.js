import React from 'react'
import { 
    Grid,
    makeStyles,
    Paper,
    Card,
    CardContent,
    CardActionArea,
    Button,
    CardActions,
    Typography,
    Tabs,
    Tab,
    Container,
    ListItemAvatar,
    Avatar,
    IconButton,
    ListItemSecondaryAction,
    ListItem,
    ListItemText,
    List
} from "@material-ui/core";

import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: "50px",
    },
    paper: {
    },
    card: {
        backgroundColor: "hsl(229, 8%, 95%)",
        margin: theme.spacing(0, 3, 3, 1),
        height: 500,
        minWidth: "390px"
    },
    tab: {
        fontSize: "10px", 
        maxWidth: "200px", 
        minWidth: 0, 
        fontWeight: "bold"
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: "bold",
        justifyContent:"space-between",
    }
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

const HabitLayout = (props) => {
    const { ...rest } = props
    const classes = useStyles();
    const [tabValue, setTabValue] = React.useState(2);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
  
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div {...rest} className={classes.root} >
             <Grid item xs={12} md={4} lg={4} className={classes.hero}>
                <Container className={classes.header}>
                    <Typography gutterBottom variant="h6" component="h1" style={{fontWeight: "bold"}} >
                        Habits
                    </Typography>
                    <Tabs
                        value={tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab className={classes.tab} label="All" />
                        <Tab className={classes.tab} label="Positive" />
                        <Tab className={classes.tab} label="Negative" />
                    </Tabs>

                </Container>

                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                {generate(
                                    <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                        <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </ListItem>,
                                )}
                                </List>
                            </div>
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
             </Grid>
             <Grid item xs={12} md={4} lg={4} className={classes.hero}>
                <Container className={classes.header}>
                    <Typography gutterBottom variant="h6" component="h1" style={{fontWeight: "bold"}} >
                        Dailies
                    </Typography>
                    <Tabs
                        value={tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab className={classes.tab} label="All" />
                        <Tab className={classes.tab} label="Due" />
                        <Tab className={classes.tab} label="Negative" />
                    </Tabs>

                </Container>

                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                {generate(
                                    <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                        <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </ListItem>,
                                )}
                                </List>
                            </div>
                        
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
             </Grid>
             <Grid item xs={12} md={4} lg={4} className={classes.hero}>
                <Container className={classes.header}>
                    <Typography gutterBottom variant="h6" component="h1" style={{fontWeight: "bold"}} >
                        Todos
                    </Typography>
                    <Tabs
                        value={tabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab className={classes.tab} label="All" />
                        <Tab className={classes.tab} label="Incomplete" />
                        <Tab className={classes.tab} label="Completed" />
                    </Tabs>

                </Container>

                <Card className={classes.card}>
                    <CardActionArea>
                        <CardContent>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                {generate(
                                    <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                        <FolderIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Single-line item"
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </ListItem>,
                                )}
                                </List>
                            </div>
                        </CardContent>
                    </CardActionArea>
                    
                    </Card>
             </Grid>
            
        </div>
    )   
}

export default HabitLayout

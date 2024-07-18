import React, { useState } from 'react';
import { List, ListItemText, ListItemIcon, ListItem, Container, Typography, CssBaseline, Grid, Divider, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PopUp from './PopUp'
import DeleteIcon from '@mui/icons-material/Delete';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Main = () => {
    const [todoData, setTodoData] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(-1);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sumbitClick = (title, content, date) => {
        const newTodo = { title, content, date };
        setTodoData((prevTodoData) => [...prevTodoData, newTodo]);
    }

    const handleDelete = (index) => {
        setTodoData((prevTodoData) => prevTodoData.filter((value, i) => i !== index));
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container>
                <Grid container spacing={2} sx={{ margin: 3 }}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontSize: 40 }} >
                            To Do List
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'right', marginRight: 3 }}>
                        <IconButton onClick={handleClickOpen}>
                            <AddIcon sx={{ fill: 'black' }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ borderBottomWidth: 2, borderColor: 'black' }} />
                    </Grid>
                    <Grid item xs={12}>
                        {todoData.length > 0 ? (
                            <List sx={{ width: '100%', padding: 2 }}>
                                {todoData.map((todo, index) => (
                                    <ListItem key={index}
                                        sx={{
                                            border: '1px solid #ccc',
                                            borderRadius: 5,
                                            marginBottom: 2,
                                            padding: 2,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0'
                                            },
                                        }}
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(-1)}
                                    >
                                        <ListItemText
                                            primary={todo.title}
                                            primaryTypographyProps={{
                                                fontFamily: 'roboto',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                wordBreak: 'break-word'
                                            }}
                                            secondary={`${todo.content} - ${todo.date.format('YYYY-MM-DD')}`}
                                            secondaryTypographyProps={{
                                                fontSize: 15,
                                                color: 'text.secondary',
                                                wordBreak: 'break-word'
                                            }}
                                        />
                                        {hoverIndex === index && <ListItemIcon >
                                            <DeleteIcon onClick={() => handleDelete(index)} sx={{
                                                cursor: 'pointer', border: '1px solid #ccc',
                                                borderRadius: 2
                                            }} />
                                        </ListItemIcon>}
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography sx={{ color: '#ccc', textAlign: 'center', marginTop: 3, fontSize: 20 }}>To Do List를 만들어보세요!</Typography>
                        )}
                    </Grid>
                </Grid>
            </Container>

            <PopUp open={open} handleClose={handleClose} sumbitClick={sumbitClick} />
        </React.Fragment >
    );
}

export default Main;
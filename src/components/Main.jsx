import React, { useEffect, useState } from 'react';
import { List, ListItemText, ListItem, Container, Typography, CssBaseline, Grid, Divider, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PopUp from './PopUp'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const Main = () => {
    const [todoData, setTodoData] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const Items = todoData.slice().reverse()



    const sumbitClick = async (title, content, date) => {
        const listEntry = {
            title,
            content,
            date,
        };
        try {
            const response = await axios.post('http://localhost:8080/api/list-form', listEntry);

            if (response.status === 200) {
                console.log('Diary entry submitted successfully');
            } else if (response.status === 401) {
                alert(response.data.message)
            }
            else {
                console.error('Failed to submit diary entry');
            }
        } catch (error) {
            console.error('Error submitting diary entry:', error);
        }

    }

    useEffect(() => {
        const lists = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/get-list-form');

                if (response.status === 200) {
                    //console.log(response.data);
                    setTodoData(response.data)
                } else if (response.status === 400) {
                    alert(response.data.message)
                }
                else {
                    console.error('Failed to submit diary entry');
                }
            } catch (error) {
                console.error('Error submitting diary entry:', error);
            }
        }
        lists();
    }, [open])


    const handleDelete = async (id, e) => {
        e.stopPropagation(); // 클릭 이벤트가 ListItem로 전파되는 것을 방지
        console.log(id);
        try {
            // 서버에 삭제 요청 보내기
            const response = await axios.delete(`http://localhost:8080/api/lists/${id}`);
            if (response.status === 200) {
                // 삭제가 성공적으로 완료되었을 경우
                console.log('Diary deleted successfully');
                // 일기 삭제 후 UI에서 해당 일기를 제거하는 로직 추가
                setTodoData((prevLists) => prevLists.filter((list) => list._id !== id));
            }
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
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
                                {Items.map((todo, index) => (
                                    <ListItem key={index}
                                        sx={{
                                            border: '1px solid #ccc',
                                            borderRadius: 5,
                                            marginBottom: 2,
                                            padding: 2,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                                '& .delete-icon ': {
                                                    visibility: 'visible',
                                                    opacity: 1,
                                                    transition: 'opacity 0.2s ease'
                                                },
                                            },

                                        }}
                                    >
                                        <ListItemText
                                            primary={todo.title}
                                            primaryTypographyProps={{
                                                fontFamily: 'roboto',
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                wordBreak: 'break-word'
                                            }}
                                            secondary={`${todo.content} - ${new Date(todo.date).toLocaleDateString()}`}
                                            secondaryTypographyProps={{
                                                fontSize: 15,
                                                color: 'text.secondary',
                                                wordBreak: 'break-word'
                                            }}
                                        />
                                        <IconButton
                                            edge="end"
                                            sx={{
                                                position: 'absolute',
                                                right: 30, // 우측
                                                top: '50%', // 중앙
                                                transform: 'translateY(-50%)', // 중앙 정렬
                                                color: 'black',
                                                visibility: 'hidden', // 기본적으로 숨김
                                                opacity: 0,
                                                transition: 'opacity 0.2s ease',
                                            }}
                                            className="delete-icon"
                                            onClick={(e) => handleDelete(todo._id, e)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
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
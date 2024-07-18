import React, { useState, useEffect } from 'react';
import { CssBaseline, TextField, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



const PopUp = ({ open, handleClose, sumbitClick }) => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    useEffect(() => {
        setTitleError('')
        setContentError('')
    }, [])

    useEffect(() => {
        if (title.trim() === '') {
            setTitleError('빈칸입니다.')
        } else {
            setTitleError('')
        }

    }, [title]); // title 변할때마다 effect를 재실행

    useEffect(() => {
        if (content.trim() === '') {
            setContentError('빈칸입니다.')
        } else {
            setContentError('')
        }

    }, [content]); // content 변할때마다  effect를 재실행


    //부모로 다 보내고 데이터들 다 지움
    const submit = () => {
        //빈칸체크
        if (title && content) {
            setTitle('');
            setContent('');
            handleClose();
            sumbitClick(title, content, selectedDate)
        } else {
            if (content.trim() === '') {
                setContentError('빈칸입니다.')
            }
            if (title.trim() === '') {
                setTitleError('빈칸입니다.')
            }
        }
    }

    //닫기 버튼 눌렀을 경우
    const justClose = () => {
        setTitleError('');
        setContentError('');
        handleClose();
    }


    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <Dialog open={open} onClose={handleClose} >
                <DialogTitle sx={{ textAlign: 'center', fontFamily: 'roboto' }}>일정</DialogTitle>
                <DialogContent>
                    <Container>
                        <Grid container spacing={2} gap={2}  >
                            <Grid xs={12} sx={{ textAlign: 'center', marginTop: 5, marginRight: 5, marginLeft: 5 }}>
                                <TextField
                                    label='제목'
                                    sx={{
                                        width: '100%'
                                    }}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    error={titleError !== '' || false}
                                    helperText={titleError}
                                    FormHelperTextProps={{ color: "error" }}
                                />
                            </Grid>

                            <Grid xs={12} sx={{ textAlign: 'center', marginRight: 5, marginLeft: 5 }}>
                                <TextField
                                    label="내용을 입력해 주세요"
                                    multiline
                                    rows={10}
                                    fullWidth
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    error={contentError !== '' || false}
                                    helperText={contentError}
                                    FormHelperTextProps={{ color: "error" }}
                                />
                            </Grid>
                            <Grid xs={12} sx={{ textAlign: 'center', marginRight: 5, marginLeft: 5 }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            label="날짜"
                                            value={selectedDate}
                                            onChange={(newValue) => handleDateChange(newValue)}
                                            showDaysOutsideCurrentMonth
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submit} variant="outlined" color="success">저장</Button>
                    <Button onClick={justClose} variant="outlined" color="error">닫기</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}

export default PopUp;

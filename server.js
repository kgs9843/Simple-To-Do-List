const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();


// CORS 이슈 해결
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // 클라이언트의 URL
  credentials: true, // 자격 증명 허용
}));

app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
});


//db
const Lists = require('./models/Lists.js');



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("몽고db연결 성공")).catch(() => console.log("몽고 db연결 실패"))




app.post('/api/list-form', async (req, res) => {
  const { title, content, date } = req.body;

  try {
    const list = new Lists({
      title,
      content,
      date
    });
    //console.log(list);
    await list.save();
    res.status(200).json({ message: 'Diary saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error });
  }
})

app.get('/api/get-list-form', async (req, res) => {
  try {
    const lists = await Lists.find()
    if (lists) {
      res.status(200).json(lists);
    } else {
      res.status(200).json([])
    }
  } catch (err) {
    res.status(400).send('Invalid Token');
  }


})

app.delete('/api/lists/:id', async (req, res) => {
  const listId = req.params.id;
  //console.log(listId)
  try {
    // 유저의 일기 중 해당 ID를 가진 일기 삭제
    const lists = await Lists.findOneAndDelete({ _id: listId });
    if (lists) {
      res.status(200).send('Diary deleted successfully');
    } else {
      res.status(404).send('Diary not found');
    }
  } catch (err) {
    res.status(400).send('Invalid');
  }
})



// 클라이언트 라우팅 처리
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080, function () {
  console.log('listening on 8080');
}); //8080port에 서버를 연다, 열고 함수기능 수행

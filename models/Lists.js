const mongoose = require('mongoose');

// Mongoose 스키마 및 모델 설정 예제
const ListsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    title: { type: String },
    content: { type: String },
})

module.exports = mongoose.model('lists', ListsSchema);
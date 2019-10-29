const express = require('express');
const cors = require('cors');
const app = express();
const getQuestions = require('./getQuestions');
const port = process.env.PORT || 5000;


app.use(cors());

app.get('/api/questions', async (req, res) => {
    const questions = await getQuestions();
    const totalQuestions = questions.length || 0;
    res.status(200).json({ totalQuestions, questions})
})

app.get('/', (req, res) => {
    res.status(200).json({message: `please visit '/api/questions' url to get all new questions`})
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
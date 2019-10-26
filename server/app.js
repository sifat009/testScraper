const express = require('express');
const app = express();
const cors = require('cors');
const getQuestions = require('./getQuestions');
const port = process.env.PORT || 3000;


app.use(cors());

app.get('/questions', async (req, res) => {
    const questions = await getQuestions();
    res.status(200).json({questions})
})

app.get('/', (req, res) => {
    res.status(200).json({message: `please visit '/questions' url to get all new questions`})
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
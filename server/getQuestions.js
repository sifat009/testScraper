const fetch = require('node-fetch');
const cheerio = require('cheerio');

const themeForestUrl = `https://www.themeum.com/tf/tfsupport/?filter=notanswered`;
const themeumUrl = `https://www.themeum.com/topics/?filter=notanswered`;


const questionList = [];
const getUnanswered = async (url) => {
    const res = await fetch(url);
    const data = await res.text();
    const $ = cheerio.load(data);
    const $newQuestions = $(".bbp-body > ul:not(.super-sticky) > li.bbp-thm-topic-title:has(span.status-new)");
    const $questionBody = $newQuestions.find('.media-body > a');
    $questionBody.each((index, question) => {
        const title = $(question).text().trim();
        const href = $(question).attr('href');  
        const alreadyExists = questionList.some(question => question.title === title);
        if(!alreadyExists) {
            questionList.push({
                title,
                href
            });
        }
    })
    return questionList;
}

const getQuestions = async () => {
    return Promise.all([getUnanswered(themeumUrl), getUnanswered(themeForestUrl)])
        .then(res => {
            return questionList;
        })
        .catch(e => {
            console.log(e)
        })
}

module.exports = getQuestions;
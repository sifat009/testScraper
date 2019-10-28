const fetch = require('node-fetch');
const cheerio = require('cheerio');

const themeumUrls = {
    'themeForestUrl': `https://www.themeum.com/tf/tfsupport/?filter=notanswered`,
    'themeumUrl': `https://www.themeum.com/topics/?filter=notanswered`,
}

const wordpressUrls = {
    'wordpressTutor': `https://wordpress.org/support/plugin/tutor/`,
    'wordpressQubely': `https://wordpress.org/support/plugin/qubely/`,
    'wordpressWpPagebuilder': `https://wordpress.org/support/plugin/wp-pagebuilder/`,
    'wordpressSalesBooster': `https://wordpress.org/support/plugin/sales-booster-for-woocommerce/`,
    'wordpressWpMegamenu': `https://wordpress.org/support/plugin/wp-megamenu/`,
    'wordpressCrowdFunding': `https://wordpress.org/support/plugin/wp-crowdfunding/`,
    'wordpressWpSupportDesk': `https://wordpress.org/support/plugin/wp-support-desk/`,
}

const questionList = [];
const getUnanswered = async (url) => {
    const res = await fetch(url);
    const data = await res.text();
    const $ = cheerio.load(data);
    let $questionBody = [];
    if(!url.includes('wordpress.org')) {
        let $newQuestions = $(".bbp-body > ul:not(.super-sticky) > li.bbp-thm-topic-title:has(span.status-new)");
        $questionBody = $newQuestions.find('.media-body > a');
    } else {
        let $newQuestions = $(".bbp-body > ul:not(.sticky) > li.bbp-topic-title:not(:has(span.resolved))");
        $questionBody = $newQuestions.find('> a');
    }
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
    return Promise.all([getUnanswered(themeumUrls.themeumUrl),
        getUnanswered(themeumUrls.themeForestUrl),
        getUnanswered(wordpressUrls.wordpressCrowdFunding),
        getUnanswered(wordpressUrls.wordpressQubely),
        getUnanswered(wordpressUrls.wordpressSalesBooster),
        getUnanswered(wordpressUrls.wordpressTutor),
        getUnanswered(wordpressUrls.wordpressWpMegamenu),
        getUnanswered(wordpressUrls.wordpressWpPagebuilder),
        getUnanswered(wordpressUrls.wordpressWpSupportDesk)])
        .then(res => {
            return questionList;
        })
        .catch(e => {
            console.log(e)
        })
}

module.exports = getQuestions;
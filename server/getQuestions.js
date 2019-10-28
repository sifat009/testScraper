const fetch = require('node-fetch');
const cheerio = require('cheerio');

const themeumUrls = {
    'themeforest': `https://www.themeum.com/tf/tfsupport/?filter=notanswered`,
    'themeum': `https://www.themeum.com/topics/?filter=notanswered`,
}

const wordpressUrls = {
    'tutor': `https://wordpress.org/support/plugin/tutor/`,
    'qubely': `https://wordpress.org/support/plugin/qubely/`,
    'wp-pagebuilder': `https://wordpress.org/support/plugin/wp-pagebuilder/`,
    'sales-booster-for-woocommerce': `https://wordpress.org/support/plugin/sales-booster-for-woocommerce/`,
    'wp-megamenu': `https://wordpress.org/support/plugin/wp-megamenu/`,
    'wp-crowdfunding': `https://wordpress.org/support/plugin/wp-crowdfunding/`,
    'wp-support-desk': `https://wordpress.org/support/plugin/wp-support-desk/`,
}

const getCategory = (url) => {
    const allUrls = {...wordpressUrls, ...themeumUrls};
    return Object.keys(allUrls).find(key => allUrls[key] === url)
}


const questionList = [];
const getUnanswered = async (url) => {
    const category = getCategory(url);
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
                category,
                href
            });
        }
    })
    return questionList;
}

const getQuestions = async () => {
    return Promise.all([getUnanswered(themeumUrls['themeum']),
        getUnanswered(themeumUrls['themeforest']),
        getUnanswered(wordpressUrls['wp-crowdfunding']),
        getUnanswered(wordpressUrls['qubely']),
        getUnanswered(wordpressUrls['sales-booster-for-woocommerce']),
        getUnanswered(wordpressUrls['tutor']),
        getUnanswered(wordpressUrls['wp-megamenu']),
        getUnanswered(wordpressUrls['wp-pagebuilder']),
        getUnanswered(wordpressUrls['wp-support-desk'])])
        .then(res => {
            return questionList;
        })
        .catch(e => {
            console.log(e)
        })
}

module.exports = getQuestions;
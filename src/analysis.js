/**
 * [TODO] Step 0: Import the dependencies, fs and papaparse
 */

const fs = require('fs');
const Papa = require('papaparse');


/**
 * [TODO] Step 1: Parse the Data
 *      Parse the data contained in a given file into a JavaScript objectusing the modules fs and papaparse.
 *      According to Kaggle, there should be 2514 reviews.
 * @param {string} filename - path to the csv file to be parsed
 * @returns {Object} - The parsed csv file of app reviews from papaparse.
 */
function parseData(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const parsed = Papa.parse(data, {
        header: true
    })
    console.log(parsed.data.length);
    return parsed;
}

/**
 * [TODO] Step 2: Clean the Data
 *      Filter out every data record with null column values, ignore null gender values.
 *
 *      Merge all the user statistics, including user_id, user_age, user_country, and user_gender,
 *          into an object that holds them called "user", while removing the original properties.
 *
 *      Convert review_id, user_id, num_helpful_votes, and user_age to Integer
 *
 *      Convert rating to Float
 *
 *      Convert review_date to Date
 * @param {Object} csv - a parsed csv file of app reviews
 * @returns {Object} - a cleaned csv file with proper data types and removed null values
 */
function cleanData(csv) {
    const filtered = csv.data.filter(row => {
        return row.review_id && 
        row.user_id && 
        row.app_name && 
        row.app_category &&
        row.review_text &&
        row.review_language &&
        row.rating && 
        row.review_date && 
        row.verified_purchase &&
        row.device_type &&
        row.num_helpful_votes &&
        row.user_age && 
        row.user_country &&
        row.app_version;
    })

    return filtered.map(row => ({
        user: {
            user_id: parseInt(row.user_id),
            user_age: parseInt(row.user_age),
            user_country: row.user_country,
            user_gender: row.user_gender
        },
        review_id: parseInt(row.review_id),
        num_helpful_votes: parseInt(row.num_helpful_votes),
        rating: parseFloat(row.rating),
        review_date: new Date(row.review_date),
        verified_purchase: row.verified_purchase === 'true',
        app_name: row.app_name,
        review_language: row.review_language,
        review_text: row.review_text,
        app_category: row.app_category,
        device_type: row.device_type,
        app_version: row.app_version
    }));
}

/**
 * [TODO] Step 3: Sentiment Analysis
 *      Write a function, labelSentiment, that takes in a rating as an argument
 *      and outputs 'positive' if rating is greater than 4, 'negative' is rating is below 2,
 *      and 'neutral' if it is between 2 and 4.
 * @param {Object} review - Review object
 * @param {number} review.rating - the numerical rating to evaluate
 * @returns {string} - 'positive' if rating is greater than 4, negative is rating is below 2,
 *                      and neutral if it is between 2 and 4.
 */
function labelSentiment({ rating }) {
    if(rating > 4) {
        return 'positive';
    } else if(rating < 2) {
        return 'negative';
    } else {
        return 'neutral';
    }
}

/**
 * [TODO] Step 3: Sentiment Analysis by App
 *      Using the previous labelSentiment, label the sentiments of the cleaned data
 *      in a new property called "sentiment".
 *      Add objects containing the sentiments for each app into an array.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{app_name: string, positive: number, neutral: number, negative: number}[]} - An array of objects, each summarizing sentiment counts for an app
 */
function sentimentAnalysisApp(cleaned) {

    const apps = {};

    cleaned.forEach(review => {
        const sentiment = labelSentiment(review);
        const appName = review.app_name;

        if(!apps[appName]) {
            apps[appName] = {app_name: appName, positive: 0, neutral: 0, negative: 0};
        } 
        apps[appName][sentiment]++;
    })

    return Object.values(apps);
}

/**
 * [TODO] Step 3: Sentiment Analysis by Language
 *      Using the previous labelSentiment, label the sentiments of the cleaned data
 *      in a new property called "sentiment".
 *      Add objects containing the sentiments for each language into an array.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{lang_name: string, positive: number, neutral: number, negative: number}[]} - An array of objects, each summarizing sentiment counts for a language
 */
function sentimentAnalysisLang(cleaned) {

    const langs = {};

    cleaned.forEach(review => {
        const sentiment = labelSentiment(review);
        const langName = review.review_language;

        if(!langs[langName]) {
            langs[langName] = {lang_name: langName, positive: 0, neutral: 0, negative: 0};
        }
        langs[langName][sentiment]++;
    })

    return Object.values(langs);
}

/**
 * [TODO] Step 4: Statistical Analysis
 *      Answer the following questions:
 *
 *      What is the most reviewed app in this dataset, and how many reviews does it have?
 *
 *      For the most reviewed app, what is the most commonly used device?
 *
 *      For the most reviewed app, what the average star rating (out of 5.0)?
 *
 *      Add the answers to a returned object, with the format specified below.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{mostReviewedApp: string, mostReviews: number, mostUsedDevice: String, mostDevices: number, avgRating: float}} -
 *          the object containing the answers to the desired summary statistics, in this specific format.
 */
function summaryStatistics(cleaned) {
    const reviewCounts = {};
    const appRatings = {};
    const devices = {};
    cleaned.forEach(review => { 
        const app = review.app_name;
        const rating = review.rating;
        const device = review.device_type;
        if(!reviewCounts[app]) {
            reviewCounts[app] = 0;
            appRatings[app] = 0;
            devices[app] = {};
        } 
        reviewCounts[app]++;
        appRatings[app] += rating;

        if(!devices[app][device]) {
            devices[app][device] = 1;
        } else {
            devices[app][device]++;
        }
    })

    let mostReviewedApp = "";
    let mostReviews = 0;
    for(const app in reviewCounts) {
        if(reviewCounts[app] > mostReviews) {
            mostReviews = reviewCounts[app];
            mostReviewedApp = app;
        }
    }

    const avgRating = appRatings[mostReviewedApp] / reviewCounts[mostReviewedApp];

    let mostUsedDevice = "";
    let mostDevices = 0;

    const appDevices = devices[mostReviewedApp];
    for(const device in appDevices) {
        if(appDevices[device] > mostDevices) {
            mostDevices = appDevices[device];
            mostUsedDevice = device;
        }
    }

    return {
        mostReviewedApp,
        mostReviews,
        mostUsedDevice,
        mostDevices,
        avgRating
    };
}

/**
 * Do NOT modify this section!
 */
module.exports = {
    parseData,
    cleanData,
    sentimentAnalysisApp,
    sentimentAnalysisLang,
    summaryStatistics,
    labelSentiment
};

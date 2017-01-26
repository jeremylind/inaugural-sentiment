// Forked from 'sentiment' node module and adapted to use NRC Word-Emotion Lexicon
var sentiment = require('nrc-sentiment');
// Modules to write data to .csv file for creating visualization or further parsing
var json2csv = require('json2csv');
var fs = require('fs');

// Get raw speech data
var speeches = require('./data.json');

// Run sentiment analysis on each speech and add some dimensions to the speeches object
for (var i = 0; i < speeches.length; i++) {
	var speech = speeches[i];
	// sentiment returns object with arrays of all words, matched words, positive and negative words, sentiment score, and average sentiment per word.
	speech.sentiment = sentiment(speech.text);
	// Word count
	speech.count = speech.sentiment.tokens.length;
	// Count of words that are matched with the NRC lexicon
	speech.matched = speech.sentiment.words.length;
	// Percentage of matched words that have positive sentiment
	speech.perPositive = speech.sentiment.positive.length / speech.count;
	// Percentage of matched words that have negative sentiment
	speech.perNegative = speech.sentiment.negative.length / speech.count;
	// Turn positive words to string
	speech.positiveWords = JSON.stringify(speech.sentiment.positive);
	// Turn negative words to string
	speech.negativeWords = JSON.stringify(speech.sentiment.negative);
	// Sentiment score per word. Use this average to compare across texts of different lengths.
	speech.sentimentScore = speech.sentiment.comparative;
}

// Set up columns for .csv
var fields = ['title', 'president', 'year', 'count', 'matched', 'perPositive', 'perNegative', 'positiveWords', 'negativeWords', 'sentimentScore'];
// Create csv data
var csv = json2csv({ data: speeches, fields: fields });
// Write to file
fs.writeFile('presidential-inaugural-sentiment.csv', csv, function(err) {
	if (err) throw err;
	console.log('file saved');
});


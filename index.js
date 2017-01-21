var sentiment = require('nrc-sentiment');
var json2csv = require('json2csv');
var fs = require('fs');

var speeches = require('./data.json');

for (var i = 0; i < speeches.length; i++) {
	var speech = speeches[i];
	speech.sentiment = sentiment(speech.text);
	speech.count = speech.sentiment.tokens.length;
	speech.matched = speech.sentiment.words.length;
	speech.perPositive = speech.sentiment.positive.length / speech.count;
	speech.perNegative = speech.sentiment.negative.length / speech.count;
	speech.positiveWords = JSON.stringify(speech.sentiment.positive);
	speech.negativeWords = JSON.stringify(speech.sentiment.negative);
	speech.sentimentScore = speech.sentiment.comparative;
}

var fields = ['title', 'president', 'year', 'count', 'matched', 'perPositive', 'perNegative', 'positiveWords', 'negativeWords', 'sentimentScore'];

var csv = json2csv({ data: speeches, fields: fields });
 
fs.writeFile('presidential-inaugural-sentiment.csv', csv, function(err) {
	if (err) throw err;
	console.log('file saved');
});


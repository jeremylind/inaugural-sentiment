## Inaugural Sentiment
#### NRC Word-Emotion Association Lexicon sentiment analysis of presidential inaugural addresses for Node.js

Using the NRC Word-Emotion Association Lexicon and the ncr-sentiment module (forked from thisandagain/sentiment), this simple app processes all the presidential inaugural addresses since FDR for statistics on sentiment. A .csv file is created listing the addresses, year, word count, how many words match an entry in the lexicon, percent of words that are positive or negative, the word lists and the overall score.

Words are rated from -1 to 1, with 1 being more positive and -1 being more negative.

Raw data can be found in data.json. Processed data can be found in presidential-inaugural-address-sentiment.csv.

### Installation
```bash
git clone https://github.com/jeremylind/inaugural-sentiment
cd inaugural-sentiment
npm install
```

### Usage
```bash
npm start
```

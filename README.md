Twitter Sentiment Analysis Application

Sentiment Analysis is the process of determining whether a piece of writing is positive, negative or neutral. It’s also known as opinion mining, deriving the opinion or attitude of a speaker. This Twitter analysis application fetches tweets for a particular user, and runs the sentiment analysis on the tweets using the Alchemy API.

DEPENDENCIES
The Application uses the following dependencies:
$ npm init
$ npm install twitter
$ npm install dotenv
$npm install alchemy-api

Functionalities

$ Retrieve users tweets
$ Analyse tweets sentiment using Alchemy API
$ Performs word count frequency on tweets while excluding stop-words.
$ Saves retrieved tweets to json file

API Requirements

You will need valid Twitter developer credentials in the form of a set of consumer and access tokens/keys. You can get these at https://apps.twitter.com/.

You also need Alchemy API key, You can get it at http://www.alchemyapi.com/api/register.html.

Installation and Setup

Navigate to a directory of choice on terminal.
Clone this repository to your direcory: https://github.com/xquire24/bc-18-twitter-sentiment-analysis.git
Navigate to the repo's folder on your computer
cd bc-18-twitter-sentiment-analysis.git

Install the depenencies
npm install

Create .env file in the root and set your API credentials.

TWITTER_CONSUMER_KEY = xxx
TWITTER_CONSUMER_SECRET = xxx
TWITTER_ACCESS_TOKEN_KEY = xxx
TWITTER_ACCESS_TOKEN_SECRET = xxx

ALCHEMY_API_KEY = xxx
Run app
node index.js

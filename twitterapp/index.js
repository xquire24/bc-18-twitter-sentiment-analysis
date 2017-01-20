var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var Twitter     = require('twitter');
var _           = require('lodash');
var readline    = require('readline');
var touch       = require('touch');
var fs          = require('fs');
var frequency   = require('./analysedFreq')
var sw          = require('stopword')
require('dotenv').config()


clear();
console.log(
  chalk.blue(
    figlet.textSync('Twitter App', { horizontalLayout: 'full' })
  )
);


var client=new Twitter({
  consumer_key:process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
  access_token_key:process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var rl=readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//check for twitter handle
rl.question(chalk.blue('Enter your Twitter handle: '), (twitterHandle) => {

  if(twitterHandle) {
    console.log(chalk.green('Authenticating'));
    console.log(chalk.green('Fetching tweets....'));

    client.get('statuses/user_timeline', {screen_name: twitterHandle, count: 50}, function(error, tweets, response){
      if(!error) {
        
        tweetLength = tweets.length;
        var tweetList = [];

        for (var i=0; i<tweetLength; i++) {
          var perc = i++;
          var tweet = tweets[i];
          console.log('\nTweets ' + '----> ' + tweets[i].text + '\n');
          tweetList += tweet.text + " ";
          console.log(chalk.red('percentage ' + Math.round(perc/tweetLength *100) + '%'));
        }
          var obj = {tweet: tweetList}
          var file = 'words.json';

          fs.writeFile(file, obj, function (err) {
          console.error(err)
          })


        //decide to perform a word frequency or a sentiment analysis
        rl.question(chalk.blue('Enter 1 for word analysis or 2 for sentiment analysis: '), (reply)  => {

          if(reply==1){
            client.get('statuses/user_timeline', {screen_name: twitterHandle, count:50}, function(error, tweets, response){
              if(!error) {
                var tweetObj = {tweets: tweets};
                var tweetLength = tweetObj.tweets.length;
                var allTweet = '';
                for (let i =0; i < tweetLength -1; i++){
                  allTweet +=  tweetObj.tweets[i].text;
                }
                
                words = frequency(allTweet);

                for (var key in words){
                  if(key == 10) break;
                  if (words.hasOwnProperty(key)) {
                    console.log(chalk.yellow('Word: '+ words[key].word +' <===> Frequency: '+ words[key].freq));
                  }
                }


              }
              rl.close();
            });
          } else if(reply = 2){
            client.get('statuses/user_timeline', {screen_name: twitterHandle, count:15}, function(error, tweets, response){
              if (!error){
                var theTweets = ""
                var tweetLength = tweets.length;

                for (var i = 0; i < tweetLength; i++){
                  theTweets += tweets[i].text;
                  var trimmed = theTweets.replace(/href\s*=\s*(['"])(https?:\/\/.+?)\1/ig,''); 
                  trimmed = trimmed.replace(/[^\w\s]/gi, ''); 
                  trimmed = trimmed.replace(/[\s\n\t\r]+/g, ' ');
                  trimmed = trimmed.replace(/([.#,;_'$!&*:*+?^=!@:${}()|\[\]\/\\])/g," ")
                  trimmed = trimmed.replace(/(\t\n|\n|\t|http|-|[0-9]  )/gm," "); 
                  trimmed = trimmed.split(' ').sort(); 
                  var newString= sw.removeStopwords(trimmed);

                  
                  //alchemy implementation

                  var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
 
        var alchemy_language = new AlchemyLanguageV1({
                api_key: process.env.ALCHEMY_API_KEY
                });
 
               var params = {
                text: newString
                };
 
              alchemy_language.sentiment(params, function (err, response) {
                  if (err)
                  console.log('error:', err);
                  else {
                   var docSentiment = response.docSentiment
                   var sentiment = []
                   for (var key in docSentiment){
                   sentiment.push([key, docSentiment[key]])
                 }
                }
                  console.log(chalk.yellow('Your sentiment value is ' + sentiment)); 
                })
                }
                } else {
                  console.log(chalk.red('Please enter 1 or 2'));
                }
                rl.close();
                });
                } else {
                 console.log(chalk.red('Please enter a valid Twitter username'));
                rl.close();
                }
                })
                }else{
                rl.close();
                }
                })
                }
                })
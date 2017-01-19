var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var sw          = require('stopword')
var Twitter     = require('twitter');
var _           = require('lodash');
var readline    = require('readline');
var touch       = require('touch');
var fs          = require('fs');
var files       = require('./lib/files');
require('dotenv').config()


clear();
console.log(
  chalk.blue(
    figlet.textSync('Twitter', { horizontalLayout: 'full' })
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


rl.question('Enter your username ', (answer) => {
  console.log('Fetching tweets...');
var params = {screen_name:answer,count: 100, exclude_replies: true};
client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', params, function(error, tweets, response) {
  if (!error) {
    var theTweets = []
    tweetLength = tweets.length;
    for (var i = 0; i < tweetLength; i++){
          theTweets += tweets[i].text;
          fs.writeFile('words.json', theTweets, finished);

          function finished(err){
            return 'Done';
          }
    }
    } else {
      console.log('There was an error getting your tweets', error)
    }
})

var data2 = fs.readFileSync('words.json').toString().toLowerCase();

function refine(data2){
  var result = "";
  var prevChar = " ";
  var trim = data2.replace(/([.#,;_'$!&*:*+?^=!@:${}()|\[\]\/\\])/g," ")
  var trim2 = trim.replace(/(\t\n|\n|\t|http|-|[0-9]|  )/gm," ");
    for(var i = 0; i < trim2.length; i++){
      var currentChar = trim2[i];
        if(!(prevChar==" "&&currentChar==prevChar))
           result += currentChar;

           prevChar = currentChar;
           }
           return result;
           }


var refined = refine(data2)
var oldString = refined.split(' ');
var newString = sw.removeStopwords(oldString);

function analyse(newString){
obj = {};
for (var i=0; i<newString.length; i++){
  if(obj[newString[i]]===undefined){
    obj[newString[i]]=1;
  }else{
    obj[newString[i]]++;
  }
}
return obj;
}

var arrange = analyse(newString)
console.log(arrange);
 rl.close();
});


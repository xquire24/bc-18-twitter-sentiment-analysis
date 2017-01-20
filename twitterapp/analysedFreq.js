var sw = require('stopword');


function wordFrequency(text) {
    trim = text.replace(/href\s*=\s*(['"])(https?:\/\/.+?)\1/ig,''); 
    trim = trim.replace(/[^\w\s]/gi, ''); 
    trim = trim.replace(/[\s\n\t\r]+/g, ' '); 
    trim = trim.split(' ').sort(); 

    trim2 = sw.removeStopwords(trim);

    
    var wordsObj = {};
    
    trim2.forEach(function (key) {
      if (wordsObj.hasOwnProperty(key)) {
        wordsObj[key]++;
      } else {
        wordsObj[key] = 1;
      }
    });
    
    
    var analysed = [];
    
    analysed = Object.keys(wordsObj).map(function(key) {
      return {
        word: key,
        freq: wordsObj[key]
      };
    });
  
    analysed.sort(function(a, b) {
      return b.freq - a.freq;
    });
  
    return analysed;

}


module.exports = wordFrequency;
'use strict';

var prompt = require('prompt');
//da se izkarvat logichni suobshteniq

prompt.start();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkForBulls(randNumStr, guessNumStr) {
  var count = 0;
  for(var i = 0; i < 4; i++) {
    if(randNumStr[i] == guessNumStr[i]) {
      count += 1;
    }
  }

  if(count == 1) {
    return count + ' bull';
  }
  else {
    return count + ' bulls';
  }
}

function checkForCows(randNum, guessNum) {
  var randNumStr = randNum.toString();
  var guessNumStr = guessNum.toString();
  var count = 0;

  for(var i = 0; i < 4; i++) {
    if((randNumStr.indexOf(guessNumStr[i]) !== -1) &&
       (randNumStr[i] != guessNumStr[i])) {
      count += 1;
    }
  }

  if(count == 1) {
    return count + ' cow';
  }
  else {
    return count + ' cows';
  }
}

function isValidLength(number) {
  var num = number.toString()
  if(num.length < 4) {
    return false;
  }
  else {
    return true;
  }
}

function isValidRep(number) {
  var num = number.toString();
  var numArray = [];
  for(var i = 0; i < 4; i++) {
    if(numArray.indexOf(num[i]) == -1) {
      numArray.push(num[i])
    }
  }

  if(numArray.length < 4) {
    return false;
  }
  else {
    return true;
  }
}

var number = getRandomInt(1000, 9999);
console.log(number);

var pastGuesses = [];

var promptNumber = function() {
  var num = number.toString();
  prompt.get(['number'], function (err, result) {
    var guess = result.number;

    if(isValidLength(guess) && isValidRep(guess)) {
      pastGuesses.push(guess);
      if(guess == number) {
        console.log('success!');
      }
      else {
        var bulls = checkForBulls(number, guess);
        var cows = checkForCows(number, guess);
        console.log(bulls + ' ' + cows);
        promptNumber();
      }  
    }
    else {
      promptNumber();
    } 
  });
};

promptNumber();

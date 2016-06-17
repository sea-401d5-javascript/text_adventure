'use strict';
module.exports = function(app){
  app.controller('GameController', GameController);
};

function GameController() {
  this.userLocation = 'start';
  this.userHasWeapon = false;
  this.command = '';
  this.gamelog = [];
  this.location = {
    'start': {
      commands: ['Enter ? for available commands.'],
      prompt: 'Sucks to be you. You woke up from a drunken bender in a room with a Vicster.'
    },
    'kegroom': {
      commands: ['take a beer', 'walk through door'],
      prompt: 'You are in the Keg room. There is a tapped Keg and many Red Solo cups.',
      promptBeer: 'You have a beer, go throw it in Vicster face'
    },
    'vicsterroomwithoutbeer': {
      commands: ['walk through door', 'ask why he is so sweaty'],
      prompt: 'You are in a room with Vicster.',
      promptSweat: 'Fee Fi Foo Fum I Need BEEEEEERRRRR!'
    },
    'vicsterroomwithbeer': {
      commands: ['throw beer', 'walk through door'],
      prompt: 'You are in a room with Vicster and you have a beer. You now have an aggressive Vicster, The only thing to stop him is beer. Throw it on him!',
      promptWin: 'You stopped Vicster! You won the game!'
    }
  };
}
GameController.prototype.startGame = function() {
  this.gamelog.push({
    src: 'game',
    msg: this.location.start.prompt
  });
  this.location.start.commands.forEach((item) => {
    this.gamelog.push({
      src: 'command',
      msg: item
    });
  });
  this.userLocation = 'vicsterroomwithoutbeer';
};

GameController.prototype.processInput = function() {

  this.gamelog.push({
    src: 'user',
    msg: this.command
  });

  switch (this.command) {
  case '?':
    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;

  case 'walk through door': {
    var currentLocation = this.userLocation;
    if (currentLocation === 'kegroom') {
      currentLocation = this.userLocation = this.userHasWeapon ? 'vicsterroomwithbeer' : 'vicsterroomwithoutbeer';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
    } else {
      this.userLocation = 'kegroom';
      this.gamelog.push({
        src: 'game',
        msg: this.location.kegroom.prompt
      });
    }

    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;
  }
  case 'take a beer':
    this.userHasWeapon = true;
    this.gamelog.push({
      src: 'game',
      msg: this.location.kegroom.promptBeer
    });
    break;

  case 'ask why he is so sweaty':
    this.userHasWeapon = true;
    this.gamelog.push({
      src: 'game',
      msg: this.location.vicsterroomwithoutbeer.promptSweat
    });
    break;

  case 'throw beer':
    this.userHasWeapon = true;
    this.gamelog.push({
      src: 'game',
      msg: this.location.vicsterroomwithbeer.promptWin
    });
    break;

  default:

    var sayArr = this.command.split('');
    if(sayArr[0] === 'say') {
      this.gamelog.push({
        src: 'game',
        msg: sayArr[1] || 'SAY SOMETHING!'
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND: Enter ? to see commands'
      });
    }
  }
  this.command = '';
};

GameController.prototype.currentHelpMsg = function() {
  var str = '';
  switch (this.userLocation) {

  case 'kegroom':
    this.location.kegroom.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'vicsterroomwithbeer':
    this.location.vicsterroomwithbeer.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'vicsterroomwithoutbeer':
    this.location.vicsterroomwithoutbeer.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;
  }    return str;
};

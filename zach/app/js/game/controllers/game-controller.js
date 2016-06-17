'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.userLocation = 'start';
  this.userHasWeapon = false;
  this.command = '';
  this.gamelog = [];
  this.location = {
    'start': {
      commands: ['Enter ? for available commands at any time.'],
      prompt: 'Welcome to the Adventure. You are in a room with a monster.'
    },
    'weaponroom': {
      commands: ['take hammer', 'look for treasure', 'say <message>', 'walk through door'],
      prompt: 'You are in the weapon room. There is a large hammer in the corner.'
    },
    'monsterroomwithoutweapon': {
      commands: ['walk through door', 'say <message>'],
      prompt: 'You are in a room with a monster.'
    },
    'monsterroomwithweapon': {
      commands: ['throw hammer'],
      prompt: 'You are in a room with a monster and you have a weapon.'
    },
    'weaponroomwithweapon': {
      commands: ['look for treasure', 'say <message>', 'walk through door'],
      prompt: 'You pick up the hammer. It\'s heavy, but now you\'re ready for that monster.'
    },
    'monsterroomwithdeadmonster': {
      commands: ['say <message>', 'walk through door'],
      prompt: 'You killed the monster! Who is the REAL monster here?'
    }
  };
}

GameController.prototype.startGame = function() {
  this.gamelog = []; //clear
  this.userLocation = 'start';
  this.userHasWeapon = false;
  this.command = '';
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
  this.userLocation = 'monsterroomwithoutweapon';
};

GameController.prototype.processInput = function() {
  this.gamelog.push({
    src: 'user',
    msg: this.command
  });
  var currentLocation;
  switch (this.command) {
  case '?':
    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;

  case 'walk through door':
    currentLocation = this.userLocation;
    if (currentLocation === 'weaponroom' || currentLocation === 'weaponroomwithweapon') {
      currentLocation = this.userLocation = this.userHasWeapon ? 'monsterroomwithweapon' : 'monsterroomwithoutweapon';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
    } else {
      this.userLocation = 'weaponroom';            this.gamelog.push({
        src: 'game',
        msg: this.location.weaponroom.prompt
      });
    }


    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;

  case 'take hammer':
    currentLocation = this.userLocation;
    if (currentLocation === 'weaponroom') {
      this.userHasWeapon = true;
      this.userLocation = currentLocation = 'weaponroomwithweapon';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
      this.gamelog.push({
        src: 'game',
        msg: this.currentHelpMsg()
      });

    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'Invalid action. Choose from: ' + this.currentHelpMsg()
      });
    }
    break;

  case 'throw hammer':
    currentLocation = this.userLocation;
    if (currentLocation === 'monsterroomwithweapon' && this.userHasWeapon) {
      this.userHasWeapon = false;
      currentLocation = this.userLocation = 'monsterroomwithdeadmonster';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
      this.gamelog.push({
        src: 'game',
        msg: this.currentHelpMsg()
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'Invalid action. Choose from: ' + this.currentHelpMsg()
      });
    }
    break;

  case 'look for treasure':
    currentLocation = this.userLocation;
    if (currentLocation === 'weaponroom' || currentLocation === 'weaponroomwithweapon') {
      currentLocation = this.userLocation = 'start';
      this.userHasWeapon = false;
      this.gamelog = [];
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
      this.location.start.commands.forEach((item) => {
        this.gamelog.push({
          src: 'command',
          msg: item
        });
      });
      this.userLocation = 'monsterroomwithoutweapon';
      alert('It was booby trapped! you died!');
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'Invalid action. Choose from: ' + this.currentHelpMsg()
      });
    }
    break;

  default:

         //test for say <message>
    var sayArr = this.command.split(' ');
    if (sayArr[0] === 'say') {
      sayArr.shift();
      var userMessage = sayArr.join(' ');
      this.gamelog.push({
        src: 'game',
        msg: userMessage || 'SAY SOMETHING!'
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND: Enter ? to see commands'
      });
    }
  }
  this.command = ''; //clear command after processing

};
GameController.prototype.currentHelpMsg = function() {
  var str = '';
  switch (this.userLocation) {

  case 'weaponroom':
    this.location.weaponroom.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithoutweapon':
    this.location.monsterroomwithoutweapon.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithweapon':
    this.location.monsterroomwithweapon.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'weaponroomwithweapon':
    this.location.weaponroomwithweapon.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithdeadmonster':
    this.location.monsterroomwithdeadmonster.commands.forEach((item, index) => {
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  }
  return str;
};

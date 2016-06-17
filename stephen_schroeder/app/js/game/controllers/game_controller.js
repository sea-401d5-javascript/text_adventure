'use strict';

module.exports = (app) => {
  app.controller('GameController', GameController);
};

function GameController() {
  this.userLocation = 'start';
  this.userHasWeapon = false;
  this.command = '';
  this.gamelog = [];
  this.location = {
    'start': {
      commands: ['Enter ? for available commands at any time.', 'walk through door'],
      prompt: 'Welcome to the Adventure. You are in a room with a monster, UNARMED.'
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
      commands: ['fight'],
      prompt: 'You are in a room with a monster and you have a weapon.',
      taps: 'YOU DID IT! YOU SLAYED THE WILY BEAST'
    }
  };
}

GameController.prototype.startGame = function () {
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

GameController.prototype.processInput = function(){

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

  case 'walk through door':
    var currentLocation = this.userLocation;
    if (currentLocation === 'weaponroom') {
      currentLocation = this.userLocation = this.userHasWeapon ? 'monsterroomwithweapon' : 'monsterroomwithoutweapon';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
    } else {
      this.userLocation = 'weaponroom';
      this.gamelog.push({
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
    if(this.userLocation === 'weaponroom') {
      this.userHasWeapon = true;
      this.gamelog.push({
        src: 'game',
        msg: 'walk through the door and fight'
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND. Enter ? to see available commands' + this.currentHelpMsg()
      });
    }
    break;

  case 'fight':
    if(this.userLocation === 'monsterroomwithweapon') {
      this.gamelog.push({
        src: 'game',
        msg: this.location.monsterroomwithweapon.taps
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND. Enter ? to see available commands'
      });
    }
    break;

  default:
    var sayArr = this.command.split(' ');
    if (sayArr[0] === 'say'){
      this.gamelog.push({
        src: 'game',
        msg: sayArr[1] || 'Huh, can\'t hear you.'
      });
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND. Enter ? to see available commands'
      });
    }
  }
  this.command = '';
};

GameController.prototype.currentHelpMsg = function(){
  var str = '';
  switch (this.userLocation){
  case 'weaponroom':
    this.location.weaponroom.commands.forEach((item, index)=>{
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithoutweapon':
    this.location.monsterroomwithoutweapon.commands.forEach((item, index)=>{
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomwithweapon':
    this.location.monsterroomwithweapon.commands.forEach((item, index)=>{
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;
  }
  return str;
};

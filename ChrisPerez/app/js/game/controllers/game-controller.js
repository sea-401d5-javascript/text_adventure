module.exports = function(app){
  app.controller('GameController', GameController);
};

function GameController(){
  this.userLocation = 'start';
  this.userArmed = false;
  this.command = '';
  this.gamelog = [];
  this.location = {
    'start': {
      commands: ['Enter ? for available commands.'],
      prompt: 'Welcome to the adventure. Look out for VicNasty... he is in the room with you!'
    },
    'armory': {
      commands: ['grab ping pong paddle', 'leave room', 'say <message>'],
      prompt: 'You are in an armory. There is a ping pong paddle on the floor.'
    },
    'monsterroomunarmed': {
      commands: ['leave room', 'say <message>'],
      prompt: 'You are in a room with VicNasty. He gon\' getcha! The only thing he loves more than violence is awkwardness... and ping pong.'
    },
    'monsterroomarmed': {
      commands: ['challenge him'],
      prompt: 'You are in a room with VicNasty and you have a ping pong paddle. Challenge the beast to a game.',
      final: 'VicNasty was excited to play pong and ran off to find the nearest table. Escape now!'
    }
  };
}

GameController.prototype.startGame = function () {
  this.gamelog.push({
    src: 'game',
    msg: this.location.start.prompt
  });
  this.location.start.commands.forEach((item)=>{
    this.gamelog.push({
      src: 'command',
      msg: item
    });
  });
  this.userLocation = 'monsterroomunarmed';
};

GameController.prototype.processInput = function(){

  this.gamelog.push({
    src: 'user',
    msg: this.command
  });

  switch (this.command.split(' ')[0]) {

  case '?':
    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;

  case 'leave':
    var currentLocation = this.userLocation;
    if (currentLocation === 'armory') {
      currentLocation = this.userLocation = this.userArmed ? 'monsterroomarmed' : 'monsterroomunarmed';
      this.gamelog.push({
        src: 'game',
        msg: this.location[currentLocation].prompt
      });
    } else {
      this.userLocation = 'armory';
      this.gamelog.push({
        src: 'game',
        msg: this.location.armory.prompt
      });
    }
    this.gamelog.push({
      src: 'game',
      msg: this.currentHelpMsg()
    });
    break;

  case 'grab':
    if (this.userLocation === 'armory') {
      this.userArmed = true;
    } else {
      this.gamelog.push({
        src: 'game',
        msg: 'BAD COMMAND. Enter ? to see available commands'
      });
    }
    break;

  case 'challenge':
    if (this.userLocation === 'monsterroomarmed') {
      this.gamelog.push({
        src: 'game',
        msg: this.location.monsterroomarmed.final
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
        msg: sayArr[1] || 'Well... speak up.'
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
  case 'armory':
    this.location.armory.commands.forEach((item, index)=>{
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomunarmed':
    this.location.monsterroomunarmed.commands.forEach((item, index)=>{
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;

  case 'monsterroomarmed':
    this.location.monsterroomarmed.commands.forEach((item, index)=>{
      str += index > 0 ? ' | ' : '';
      str += item;
    });
    break;
  }
  return str;
};

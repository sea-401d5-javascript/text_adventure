'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.hasWeapon = false;
  this.alive = true;
  this.location = 'monsterRoom';
  this.gameLog = [];
  this.input = '';
  this.actions = ['hyperventilate', 'pick up weapon', 'leave', 'philosophize', 'whimper', 'poke', 'call mom', 'taunt', 'yolo', 'reason', 'hadouken'];

  this.weaponRoom = {};
  this.weaponRoom.noWeaponActions = {
    'hyperventilate': this.hyperventilate,
    'pick up weapon': this.pickUpWeapon,
    'leave': this.exit
  };
  this.weaponRoom.hasWeaponActions = {
    'philosophize': this.philosophize,
    'leave': this.exit
  };

  this.monsterRoom = {};
  this.monsterRoom.noWeaponActions = {
    'whimper': this.whimper,
    'poke': this.poke,
    'call mom': this.callMom,
    'taunt': this.taunt,
    'leave': this.exit
  };
  this.monsterRoom.hasWeaponActions = {
    'yolo': this.yolo,
    'reason': this.reason,
    'leave': this.exit
  };
}

GameController.prototype.action = function() {
  let input = this.input.toLowerCase();
  if (this.gameLog.length > 10) {
    this.gameLog = [];
  }
  if (input === '?') {
    this.seeActions();
  } else if (!input || this.actions.indexOf(input) === -1) {
    this.tryAgain();
  } else if (this.location === 'monsterRoom') {
    if (this.hasWeapon === false) {
      this.monsterRoom.noWeaponActions[input].call(this);
    } else {
      this.monsterRoom.hasWeaponActions[input].call(this);
    }
  } else if (this.hasWeapon === false) {
    this.weaponRoom.noWeaponActions[input].call(this);
  } else {
    this.weaponRoom.hasWeaponActions[input].call(this);
  }
};

GameController.prototype.tryAgain = function() {
  this.gameLog.push('Sorry, that is not a valid command. Enter ? to see the actions available in this room.');
};

GameController.prototype.seeActions = function() {
  let location = (this.location === 'monsterRoom') ? this.monsterRoom : this.weaponRoom;
  let actions = (this.hasWeapon === true) ? location.hasWeaponActions : location.noWeaponActions;
  for (let key in actions) {
    this.gameLog.push(key);
  }
};

GameController.prototype.hyperventilate = function() {
  if (this.location === 'weaponRoom' && this.hasWeapon === false) {
    return this.gameLog.push('You get lightheaded and make poor decisions');
  }
  this.tryAgain();
};

GameController.prototype.pickUpWeapon = function() {
  if (this.location === 'weaponRoom' && this.hasWeapon === false) {
    this.hasWeapon = true;
    return this.gameLog.push('You are now in possession of a feral weasel. Congratulations?');
  }
  this.tryAgain();
};

GameController.prototype.philosophize = function() {
  if (this.location === 'weaponRoom' && this.hasWeapon === true) {
    return this.gameLog.push('You consider the moral and ethical implications of killing a sentient being. But you decide that you\'d be doing the monster a favor, as he knows no life beyond those four digital walls.');
  }
  this.tryAgain();
};

GameController.prototype.poke = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    this.alive = false;
    return this.gameLog.push('You edge toward the monster and poke him, then giggle again run away. The monster is furious and decapitates you in one fell chomp.');
  }
  this.tryAgain();
};

GameController.prototype.whimper = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    return this.gameLog.push('You whimper softly in the corner, hoping that the monster will let you live out your days... until you die of starvation. You should probably try to kill the monster so at least you have something to eat.');
  }
  this.tryAgain();
};

GameController.prototype.callMom = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    this.alive = false;
    return this.gameLog.push('You try to express your situation to your mother, but she thinks that you\'ve had too much to drink. Your dependence on your mother annoys the monster and he impales you with a talon.');
  }
  this.tryAgain();
};

GameController.prototype.taunt = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === false) {
    return this.gameLog.push('You taunt the monster and he is taken aback with your stupidity. He remains lost in thought.');
  }
  this.tryAgain();
};

GameController.prototype.yolo = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === true) {
    return this.gameLog.push('Your feral weasel goes for monster\'s face! Thou hath slain the Jabberwock! Oh, frabjous day!');
  }
  this.tryAgain();
};

GameController.prototype.reason = function() {
  if (this.location === 'monsterRoom' && this.hasWeapon === true) {
    return this.gameLog.push('You try to reason with the monster and tell him that you don\'t want to have to kill him, but he does not speak English. Sorry. You die.');
  }
  this.tryAgain();
};

GameController.prototype.exit = function() {
  this.location === 'monsterRoom' ? this.location = 'weaponRoom' : this.location = 'monsterRoom';
  this.gameLog.push('You walk into the adjacent room.');
};

GameController.prototype.gameStart = function() {
  this.gameLog.push('You wake up and find yourself in a windowless room with a fearsome Jabberwocky. He is eyeing you with a mixture of curiosity and hunger. There is a door to your left. What shall you do? (Type ? at any time to see your options)');
};

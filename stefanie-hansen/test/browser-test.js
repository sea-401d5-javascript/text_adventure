'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

describe('Controller tests', () => {
  let gameCtrl;

  beforeEach(() => {
    angular.mock.module('AdventureApp');
    angular.mock.inject(($controller) => {
      gameCtrl = new $controller('GameController');
    });
  });

  it('should have the property hasWeapon, initialized as false', () => {
    expect(gameCtrl.hasWeapon).toBe(false);
  });

  it('should have the property alive, initialized as true', () => {
    expect(gameCtrl.alive).toBe(true);
  });

  it('should have the property location, initialized as monsterRoom', () => {
    expect(gameCtrl.location).toBe('monsterRoom');
  });

  it('should have a game log property', () => {
    expect(Array.isArray(gameCtrl.gameLog)).toBe(true);
  });

  it('should have an input property', () => {
    expect(typeof gameCtrl.input).toBe('string');
  });

  it('should have an actions property', () => {
    expect(Array.isArray(gameCtrl.actions)).toBe(true);
  });

  it('should have game state properties', () => {
    expect(typeof gameCtrl.weaponRoom).toBe('object');
    expect(typeof gameCtrl.monsterRoom).toBe('object');
  });

  describe('Action method tests', () => {

    it('should respond to empty or unsupported inputs', () => {
      gameCtrl.input = 'test';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('Sorry, that is not a valid command. Enter ? to see the actions available in this room.');
    });

    it('should respond to an ? input with possible actions', () => {
      gameCtrl.input = '?';
      gameCtrl.action();
      expect(gameCtrl.gameLog.length).toBe(5);
    });

    it('should take an input and give a corresponding response via the game log', () => {
      gameCtrl.input = 'call mom';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You try to express your situation to your mother, but she thinks that you\'ve had too much to drink. Your dependence on your mother annoys the monster and he impales you with a talon.');
    });

    it('should give an appropriate response to the input "hyperventilate"', () => {
      gameCtrl.location = 'weaponRoom';
      gameCtrl.input = 'hyperventilate';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You get lightheaded and make poor decisions');
    });

    it('should give an appropriate response to the input "pick up weapon"', () => {
      gameCtrl.location = 'weaponRoom';
      gameCtrl.input = 'pick up weapon';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You are now in possession of a feral weasel. Congratulations?');
      expect(gameCtrl.hasWeapon).toBe(true);
    });

    it('should give an appropriate response to the input "philosophize"', () => {
      gameCtrl.location = 'weaponRoom';
      gameCtrl.hasWeapon = true;
      gameCtrl.input = 'philosophize';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You consider the moral and ethical implications of killing a sentient being. But you decide that you\'d be doing the monster a favor, as he knows no life beyond those four digital walls.');
    });

    it('should give an appropriate response to the input "poke"', () => {
      gameCtrl.input = 'poke';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You edge toward the monster and poke him, then giggle again run away. The monster is furious and decapitates you in one fell chomp.');
      expect(gameCtrl.alive).toBe(false);
    });

    it('should give an appropriate response to the input "whimper"', () => {
      gameCtrl.input = 'whimper';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You whimper softly in the corner, hoping that the monster will let you live out your days... until you die of starvation. You should probably try to kill the monster so at least you have something to eat.');
    });

    it('should give an appropriate response to the input "call mom"', () => {
      gameCtrl.input = 'call mom';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You try to express your situation to your mother, but she thinks that you\'ve had too much to drink. Your dependence on your mother annoys the monster and he impales you with a talon.');
      expect(gameCtrl.alive).toBe(false);
    });

    it('should give an appropriate response to the input "taunt"', () => {
      gameCtrl.input = 'taunt';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You taunt the monster and he is taken aback with your stupidity. He remains lost in thought.');
    });

    it('should give an appropriate response to the input "yolo"', () => {
      gameCtrl.hasWeapon = true;
      gameCtrl.input = 'yolo';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('Your feral weasel goes for monster\'s face! Thou hath slain the Jabberwock! Oh, frabjous day!');
    });

    it('should give an appropriate response to the input "reason"', () => {
      gameCtrl.hasWeapon = true;
      gameCtrl.input = 'reason';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You try to reason with the monster and tell him that you don\'t want to have to kill him, but he does not speak English. Sorry. You die.');
    });

    it('should give an appropriate response to the input "leave"', () => {
      gameCtrl.input = 'leave';
      gameCtrl.action();
      expect(gameCtrl.gameLog[0]).toBe('You walk into the adjacent room.');
      expect(gameCtrl.location).toBe('weaponRoom');
    });

    it('should give a game introduction upon load', () => {
      gameCtrl.gameStart();
      expect(gameCtrl.gameLog[0]).toBe('You wake up and find yourself in a windowless room with a fearsome Jabberwocky. He is eyeing you with a mixture of curiosity and hunger. There is a door to your left. What shall you do? (Type ? at any time to see your options)');
    });
  });
});

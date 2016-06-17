'use strict';

const angular = require('angular');

require('angular-mocks');
require(__dirname + '/../app/js/client');

describe('Game Controller Tests', ()=>{

  let gameCtrl;

  beforeEach(()=>{
    angular.mock.module('textAdventure');
    angular.mock.inject(function($controller){
      gameCtrl = new $controller('GameController');
    });
  });

  it('should have a property notes', ()=>{
    expect(Array.isArray(gameCtrl.gamelog)).toBe(true);
  });

  it('should have a command property with type of String', ()=>{
    expect(typeof gameCtrl.command).toBe('string');
  });

  it('should have an empty array on property gamelog', ()=>{
    expect(gameCtrl.gamelog.length).toBe(0);
  });

  it('should have an object on property location', ()=>{
    expect(typeof gameCtrl.location).toBe('object');
  });

  it('should have one command on the start location', ()=>{
    expect(gameCtrl.location.start.commands.length).toBe(1);
  });

  it('should have three commands on the armory location', ()=>{
    expect(gameCtrl.location.armory.commands.length).toBe(3);
  });

  it('should have two commands on the monsterroomunarmed location', ()=>{
    expect(gameCtrl.location.monsterroomunarmed.commands.length).toBe(2);
  });

  it('should have one command on the monsterroomarmed location', ()=>{
    expect(gameCtrl.location.monsterroomarmed.commands.length).toBe(1);
  });

  it('should have an unarmed user', ()=>{
    expect(gameCtrl.userArmed).toBe(false);
  });

  it('should have an armed user', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'armory';
    gameCtrl.command = 'grab';
    gameCtrl.processInput();
    expect(gameCtrl.userArmed).toBe(true);
  });

  it('should tell the user to escape', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'monsterroomarmed';
    gameCtrl.command = 'challenge';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg.slice(-11)).toBe('Escape now!');
  });

  it('should move the user to a different room', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'armory';
    gameCtrl.command = 'leave';
    gameCtrl.processInput();
    expect(gameCtrl.userLocation).not.toBe('armory');
  });

  it('should display the current help message', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'armory';
    gameCtrl.command = '?';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg).toBe('grab ping pong paddle | leave room | say <message>');
  });

  it('should display the current help message', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'monsterroomarmed';
    gameCtrl.command = '?';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg).toBe('challenge him');
  });

  it('should display the current help message', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'monsterroomunarmed';
    gameCtrl.command = '?';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg).toBe('leave room | say <message>');
  });

  it('should give a bad command warning for nonsense', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'monsterroomunarmed';
    gameCtrl.command = 'wat';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg.slice(0, 12)).toBe('BAD COMMAND.');
  });

  it('should give a bad command warning for wrong context', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'monsterroomunarmed';
    gameCtrl.command = 'challenge';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg.slice(0, 12)).toBe('BAD COMMAND.');
  });

  it('should give the armory >> monsterroomunarmed message', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'armory';
    gameCtrl.userArmed = false;
    gameCtrl.command = 'leave';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg).toBe('leave room | say <message>');
  });

  it('should give the armory >> monsterroomarmed message', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'armory';
    gameCtrl.userArmed = true;
    gameCtrl.command = 'leave';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg).toBe('challenge him');
  });

  it('should give the monster room >> armory message', ()=>{
    gameCtrl.startGame();
    gameCtrl.userLocation = 'monsterroomarmed';
    gameCtrl.userArmed = false;
    gameCtrl.command = 'leave';
    gameCtrl.processInput();
    expect(gameCtrl.gamelog.pop().msg).toBe('grab ping pong paddle | leave room | say <message>');
  });



});

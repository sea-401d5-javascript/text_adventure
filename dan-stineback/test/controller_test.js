'use strict';

const angular = require('angular');

require('../app/js/client.js');

require('angular-mocks');

describe('controller test', () => {
  let zoots;


  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller) {
      zoots = new $controller('GameController');
    });
  });

  it('should test gamelog with nothing in it', () => {
    expect(zoots.gamelog.length).toBe(0);
  });

  it('should test location as an object', () => {
    expect(typeof zoots.location).toBe('object');
  });

  it('should test command to be a string', () => {
    expect(typeof zoots.command).toBe('string');
  });

  it('should test prompt property to be a string', () => {
    expect(typeof zoots.location.start.prompt).toBe('string');
  });

  it('should test gamelog as Array', () => {
    expect(Array.isArray(zoots.gamelog)).toBe(true);
  });

  it('should test promptBeer as a string', () => {
    expect(typeof zoots.location.kegroom.promptBeer).toBe('string');
  });

  it('should test kegroom prompt as a string', () => {
    expect(typeof zoots.location.kegroom.prompt).toBe('string');
  });

  it('should should test promptSweat as a string', () => {
    expect(typeof zoots.location.vicsterroomwithoutbeer.promptSweat).toBe('string');
  });

  it('should test vicsterroomwithoutbeer prompt as a string', () => {
    expect(typeof zoots.location.vicsterroomwithoutbeer.prompt).toBe('string');
  });

  it('should test promptWin as a string', () => {
    expect(typeof zoots.location.vicsterroomwithbeer.promptWin).toBe('string');
  });

  it('should test vicsterroomwithbeer prompt as a stirng', () => {
    expect(typeof zoots.location.vicsterroomwithbeer.prompt).toBe('string');
  });

  it('should test throw beer command from vicsterroomwithbeer', () => {
    zoots.startGame();
    zoots.userLocation = 'vicsterroomwithbeer';
    zoots.command = 'throw beer';
    zoots.processInput();
    expect(zoots.gamelog.pop().msg.slice(-17)).toBe('You won the game!');
  });

  it('should test ask why he is so sweaty from vicsterroomwithoutbeer', () => {
    zoots.startGame();
    zoots.userLocation = 'vicsterroomwithoutbeer';
    zoots.command = 'ask why he is so sweaty';
    zoots.processInput();
    expect(zoots.gamelog.pop().msg).toBe('Fee Fi Foo Fum I Need BEEEEEERRRRR!');
  });

    it('should test take a beer command from kegroom', () => {
      zoots.startGame();
      zoots.userLocation = 'kegroom';
      zoots.command = 'take a beer';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('You have a beer, go throw it in Vicster face');
    });

    it('should test take a beer command from kegroom', () => {
      zoots.startGame();
      zoots.userLocation = 'kegroom';
      zoots.command = 'take a beer';
      zoots.processInput();
      expect(zoots.userHasWeapon).toBe(true);
    });

    it('should test walk through door command from vicsterroomwithoutbeer', () => {
      zoots.startGame();
      zoots.userLocation = 'vicsterroomwithoutbeer';
      zoots.command = 'walk through door';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('take a beer | walk through door');
    });

    it('should test walk through door command from vicsterroomwithbeer', () => {
      zoots.startGame();
      zoots.userLocation = 'vicsterroomwithbeer';
      zoots.command = 'walk through door';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('take a beer | walk through door');
    });

    it('should test walk through door command from kegroom without beer', () => {
      zoots.startGame();
      zoots.userHasWeapon = false;
      zoots.userLocation = 'kegroom';
      zoots.command = 'walk through door';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('walk through door | ask why he is so sweaty');
    });

    it('should test walk through door command from kegroom with a beer', () => {
      zoots.startGame();
      zoots.userHasWeapon = true;
      zoots.userLocation = 'kegroom';
      zoots.command = 'walk through door';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('throw beer | walk through door');
    });

    it('should test a bad command from start', () => {
      zoots.startGame();
      zoots.userLocation = 'start';
      zoots.command = 'Bad command';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('BAD COMMAND: Enter ? to see commands');
    });

    it('should test a bad command from kegroom', () => {
      zoots.startGame();
      zoots.userLocation = 'kegroom';
      zoots.command = 'Bad command';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('BAD COMMAND: Enter ? to see commands');
    });

    it('should test a bad command from vicsterroomwithbeer', () => {
      zoots.startGame();
      zoots.userLocation = 'vicsterroomwithbeer';
      zoots.command = 'Bad command';
      zoots.processInput();
      expect(zoots.gamelog.pop().msg).toBe('BAD COMMAND: Enter ? to see commands');
    });

      it('should test a bad command from vicsterroomwithoutbeer', () => {
        zoots.startGame();
        zoots.userLocation = 'vicsterroomwithoutbeer';
        zoots.command = 'Bad command';
        zoots.processInput();
        expect(zoots.gamelog.pop().msg).toBe('BAD COMMAND: Enter ? to see commands');
      });
});

'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client');

describe('controller tests', () => {
  let gameCtrl;

  beforeEach(()=>{
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller){
      gameCtrl = new $controller('GameController');
    });
  });

  it('user should test start values', () => {
    expect(gameCtrl.userHasWeapon).toBe(false);
  });

  it('should verify user start location', () => {
    expect(gameCtrl.userLocation).toBe('start');
  });

  it('should verify user start command is empty string', () => {
    expect(gameCtrl.command).toBe('');
  });

  it('should have input of string', () => {
    expect(typeof gameCtrl.userHasWeapon).toBe('boolean');
  });

  describe('actions tests', () => {

    it('gets a weapon', () => {
      gameCtrl.startGame();
      gameCtrl.userLocation = 'weaponroom';
      gameCtrl.command = 'take hammer';
      gameCtrl.processInput();
      expect(gameCtrl.userHasWeapon).toBe(true);
    });

    it('should take you to the other room', () => {
      gameCtrl.startGame();
      gameCtrl.userLocation = 'weaponroom';
      gameCtrl.command = 'walk through door';
      gameCtrl.processInput();
      expect(gameCtrl.userLocation).toBe('monsterroomwithoutweapon' || 'monsterroomwithweapon');
    });
  });
});


//
// it('throws hammer', () => {
//   gameCtrl.startGame();
//   gameCtrl.userLocation = 'monsterroomwithweapon';
//   gameCtrl.command = 'fight';
//   gameCtrl.processInput();
//   expect(gameCtrl.taps).toBe('YOU DID IT! YOU SLAYED THE WILY BEAST');
// });

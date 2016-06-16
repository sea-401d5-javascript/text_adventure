'use strict';

const angular = require('angular');

require('../app/js/client.js');
require('angular-mocks');

describe('gamecontroller tests', () => {
  let firstctrl;
  let userInputs = function(commands) {
    commands.forEach((string) => {
      firstctrl.command = string;
      firstctrl.processInput();
    });
  };
  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller) {
      firstctrl = new $controller('GameController');
    });
  });
  it('should start with certain values', () => {
    expect(firstctrl.userLocation).toBe('start');
    expect(firstctrl.gamelog[0]).toBeFalsy();
    expect(firstctrl.userHasWeapon).toBe(false);
  });
  it('upon start, userLocation should change to monsterroomwithoutweapon', () => {
    firstctrl.startGame();
    expect(firstctrl.userLocation).toBe('monsterroomwithoutweapon');
    expect(firstctrl.gamelog[0].msg).toBe('Welcome to the Adventure. You are in a room with a monster.');
  });
  it('should let you say something', () => {
    firstctrl.startGame();
    firstctrl.command = 'say hello there';
    firstctrl.processInput();
    expect(firstctrl.gamelog[2].msg).toBe('say hello there');
    expect(firstctrl.gamelog[3].msg).toBe('hello there');
  });
  it('should return available commands if you enter ?', () => {
    firstctrl.startGame();
    firstctrl.command = '?';
    firstctrl.processInput();
    let currentLocation = firstctrl.userLocation;
    expect(firstctrl.gamelog[2].msg).toBe('?');
    expect(firstctrl.gamelog[3].msg).toBe(firstctrl.location[currentLocation].commands.join(' | '));
  });
  it('should let you walk between rooms', () => {
    firstctrl.startGame();
    firstctrl.command = 'walk through door';
    firstctrl.processInput();
    expect(firstctrl.userLocation).toBe('weaponroom');
  });
  it('should not let you pick up a weapon in the monster room', () => {
    firstctrl.startGame();
    firstctrl.command = 'take hammer';
    firstctrl.processInput();
    expect(firstctrl.userHasWeapon).toBe(false);
    expect(firstctrl.gamelog[2].msg).toBe('take hammer');
    expect(firstctrl.gamelog[3].msg).toBe('Invalid action. Choose from: walk through door | say <message>');
  });
  it('should let you pick up a hammer in the weaponroom', () => {
    firstctrl.startGame();
    userInputs(['walk through door', 'take hammer']);
    expect(firstctrl.userLocation).toBe('weaponroomwithweapon');
    expect(firstctrl.userHasWeapon).toBe(true);
    expect(firstctrl.gamelog[6].msg).toBe('You pick up the hammer. It\'s heavy, but now you\'re ready for that monster.');
  });
  it('should not let you kill the monster without a weapon', () => {
    firstctrl.startGame();
    firstctrl.command = 'throw hammer';
    firstctrl.processInput();
    expect(firstctrl.userLocation).toBe('monsterroomwithoutweapon');
    expect(firstctrl.gamelog[3].msg).toBe('Invalid action. Choose from: walk through door | say <message>');
  });
  it('should let you kill the monster with a weapon', () => {
    firstctrl.startGame();
    userInputs(['walk through door', 'take hammer', 'walk through door', 'throw hammer']);
    expect(firstctrl.userLocation).toBe('monsterroomwithdeadmonster');
    expect(firstctrl.gamelog[12].msg).toBe('You killed the monster! Who is the REAL monster here?');
  });
  it('should kill you if you search for treasure in the weapon room', () => {
    firstctrl.startGame();
    userInputs(['walk through door', 'take hammer', 'look for treasure']);
    expect(firstctrl.userHasWeapon).toBe(false);
    expect(firstctrl.userLocation).toBe('monsterroomwithoutweapon');
    expect(firstctrl.gamelog[2]).toBeFalsy();
  });
});

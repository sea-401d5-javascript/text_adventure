'use strict';
const angular = require('angular');
require('angular-mocks');

require('../app/js/client');
let gamectrl;
describe('Game controlller should', () => {
  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function ($controller) {
      gamectrl = new $controller('GameController');
    });
    gamectrl.startGame();
  });

  it('intialize game and display starting prompt', () => {
    let prompt = [{
      src: 'game',
      msg: 'You and Spock just beamed down to the planets surface. To the north you see a structure, to the south you detect a wrecked ship and identify it as the SS Botany Bay'
    }, {
      src: 'command',
      msg: 'Enter ? for available commands at any time.'
    }];
    expect(gamectrl.model.gamelog).toEqual(prompt);
  });

  it('create a proplery constucted world', () => {
    expect(gamectrl.model.userLocation).toEqual('transportersite');
    expect(gamectrl.model.userisAlive).toEqual(true);
    expect(gamectrl.model.userHasWeapon).toEqual(false);
    expect(gamectrl.model.khanAlive).toEqual(true);
    expect(gamectrl.model.command).toEqual('');
  });

  it('\'?\' shoud display help for first prompt', () => {
    let prompt = {
      src: 'game',
      msg: 'go north | go south | use communicator'
    };
    gamectrl.model.command = '?';
    gamectrl.processInput();
    expect(gamectrl.model.gamelog[gamectrl.model.gamelog.length - 1]).toEqual(prompt);
  });

  it('kill Kirk if he has no red shirts', () => {
    gamectrl.model.command = 'go south';
    gamectrl.processInput();
    gamectrl.model.command = 'allow Spock to reason';
    gamectrl.processInput();
    expect(gamectrl.model.userisAlive).toEqual(false);
    expect(gamectrl.model.khanAlive).toEqual(true);
  });

  it('kill Khan if Kirk has red shirts', () => {
    gamectrl.model.userHasWeapon = true;
    gamectrl.model.command = 'go south';
    gamectrl.processInput();
    gamectrl.model.command = 'order your men to fire phasers';
    gamectrl.processInput();
    expect(gamectrl.model.userisAlive).toEqual(true);
    expect(gamectrl.model.khanAlive).toEqual(false);
  });
});

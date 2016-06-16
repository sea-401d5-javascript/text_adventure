'use strict';
const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

describe('Controller Tests', () => {
  let storyCtrl;
  beforeEach(() => {
    angular.mock.module('TextAdventure');
    angular.mock.inject(function($controller) {
      storyCtrl = new $controller('StoryController');
    });
  });
  it('controller should have properties', () => {
    expect(storyCtrl.commands).toBe('');
    expect(Array.isArray(storyCtrl.commandlog)).toBe(true);
    expect(Array.isArray(storyCtrl.promptlog)).toBe(true);
    expect(storyCtrl.location).toBeDefined();
  });
  describe('startGame test', () => {
    it('should push things to logs', () => {
      storyCtrl.startGame();
      expect(storyCtrl.commands).toBe('');
      expect(storyCtrl.commandlog[0].msg).toBe('Leave the room');
      expect(storyCtrl.commandlog[1].msg).toBe('Fight the monster bare-handed');
      expect(storyCtrl.promptlog[0].msg).toBeTruthy();
    });
  });
  describe('processInput test', () => {
    it('should have otherRoom options only and the promptlog should continue', () => {
      storyCtrl.startGame();
      storyCtrl.commands = 'Leave the room';
      storyCtrl.processInput('Leave the room');
      expect(storyCtrl.promptlog[1].msg).toBe('You are in the next room. There are quite a few people. In the corner, you see a woman sleeping. Her hands loosely holding a sword.');
      expect(storyCtrl.commandlog[0].msg).toBe('Try and steal the sword');
      expect(storyCtrl.commandlog[1].msg).toBe('Wake her up');
      expect(storyCtrl.commandlog[1].msg).not.toBe('Fight the monster bare-handed');
    });
    it('should have otherRoomAndConvincing options', () => {
      storyCtrl.startGame();
      storyCtrl.commands = 'Leave the room';
      storyCtrl.processInput('Leave the Room');
      storyCtrl.commands = 'Wake her up';
      storyCtrl.processInput('Wake her up');
      expect(storyCtrl.promptlog[2].msg).toBeTruthy();
      expect(storyCtrl.commandlog[0].msg).toBe('Go fight the monster');
    });
    it('should start over when die', () => {
      storyCtrl.startGame();
      storyCtrl.commands = 'Fight the monster bare-handed';
      storyCtrl.processInput('Fight the monster bare-handed');
      expect(storyCtrl.promptlog[1].msg).toBe('You try and fight the monster with your fists. That was a stupid idea. You manged to get one good swing in before the monster devours you.');
      storyCtrl.commands = 'Start over';
      storyCtrl.processInput('Start over');
      expect(storyCtrl.promptlog[0].msg).toBe('You wake up in a room. You are disoriented and cold. You hear a growl. As you turn, you see a giant three headed dog. It does not look friendly.');
      expect(storyCtrl.promptlog[1]).not.toBeDefined();
      expect(storyCtrl.commandlog[0].msg).toBe('Leave the room');
    });
    it('should win and no more commands should be given', () => {
      storyCtrl.startGame();
      storyCtrl.commands = 'Leave the room';
      storyCtrl.processInput('Leave the room');
      storyCtrl.commands = 'Wake her up';
      storyCtrl.processInput('Wake her up');
      storyCtrl.commands = 'Go fight the monster';
      storyCtrl.processInput('Go fight the monster');
      expect(storyCtrl.promptlog[3].msg).toBe('You walk into the dungeon with your female ally. She brandishes her sword. The monster growls. You go to distract it as your ally hacks away at the heads of the monsters. Victory.');
      expect(storyCtrl.commandlog[0]).not.toBeDefined();
    });
    it('should give invalid option when invalid command', () => {
      storyCtrl.startGame();
      storyCtrl.commands = 'test invalid';
      storyCtrl.processInput('test invalid');
      expect(storyCtrl.promptlog[1].msg).toBe('INVAILD CHOICE. PLEASE CHOOSE ONE OF THE CHOICES BELOW.');
    });
  });
});

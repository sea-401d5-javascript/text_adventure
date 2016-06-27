'use strict';

const angular = require('angular');

require('angular-mocks');

require('../app/js/client');

describe('Controller Tests', () => {
  let firstctrl;

  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller) {
      firstctrl = new $controller('GameController');
    });
  });

  it('should have a property notes', ()=>{
      expect(Array.isArray(firstctrl.gamelog)).toBe(true);
    });

  it('should have a command property with type of String', () => {
    expect(typeof firstctrl.command).toBe('string');
  });

  it('should have an empty array on property gamelog', () => {
    expect(firstctrl.gamelog.length).toBe(0);
  });

  it('should have a ball on property location', () => {
    expect(typeof firstctrl.location).toBe('object');
  });

  it('should have one command on start', () => {
    expect(firstctrl.location.start.commands.length).toBe(1);
  });

  it('should have three commands in the stadium', () =>  {
    expect(firstctrl.location.stadium.commands.length).toBe(3);
  });

  it('should have two commands on the courtwithoutball location', () => {
    expect(firstctrl.location.courtwithoutball.commands.length).toBe(2);
  });

  it('should have one command on the courtwithball location', () => {
    expect(firstctrl.location.courtwithball.commands.length).toBe(1);
  });
});

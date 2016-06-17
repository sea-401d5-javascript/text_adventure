'use strict';

const angular = require('angular');
require('angular-mocks');
require(__dirname + '/../app/js/client');

describe('controller tests', () => {
  let ctrl;

  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(function($controller) {
      ctrl = new $controller('GameController');
    });
  });

  it('should not have a weapon', () => {
    expect(ctrl.hasWeapon).toBe(false);
  });
});

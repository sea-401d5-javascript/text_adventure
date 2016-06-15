'use strict';

const angular = require('angular');

var textAdventure = angular.module('textAdventure', []);
require('./game/game')(textAdventure);

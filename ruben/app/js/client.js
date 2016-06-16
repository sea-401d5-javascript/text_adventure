'use strictc';
const angular = require('angular');

const app = angular.module('adventureApp', []);

require('./game/game')(adventureApp);

'use strict';
const angular = require('angular');

const adventureApp = angular.module('adventureApp', []);

require('./game/game')(adventureApp);

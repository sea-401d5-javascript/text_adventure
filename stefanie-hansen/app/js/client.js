'use strict';

const angular = require('angular');

const AdventureApp = angular.module('AdventureApp', []);

require('./controllers/game-controller')(AdventureApp);

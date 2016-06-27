'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
      this.userLocation = 'start';
      this.userHasBall = false;
      this.command = '';
      this.gamelog = [];
      this.location = {
        'start': {
          commands: ['Enter ? for available commands at any time.'],
          prompt: 'Welcome to the NBA Finals. You are in a stadium with a Monstar from Space Jam.'
        },
        'stadium': {
          commands: ['take ball', 'look for the basket', 'say <message>', 'walk onto court'],
          prompt: 'You are on the court. There is a spalding ball on the halfcourt line.'
        },
        'courtwithoutball': {
          commands: ['walk through door', 'say <message>'],
          prompt: 'You are on the court with a Monstar.'
        },
        'courtwithball': {
          commands: ['shoot ball'],
          prompt: 'You are on the court with a Monstar and you have a ball.'
        }
      }
    };
    GameController.prototype.startGame = function() {
      this.gamelog = [];
      this.userLocation = 'start';
      this.userHasBall = false;
      this.command = '';
      this.gamelog.push({
        src: 'game',
        msg: this.location.start.prompt
      });
      var gamelog = this.gamelog;
      this.location.start.commands.forEach(function(item) {
        gamelog.push({
          src: 'command',
          msg: item
        });
      });
      this.userLocation = 'courtwithoutball';
    };
    GameController.prototype.processInput = function() {
      this.gamelog.push({
        src: 'user',
        msg: this.command
      });

      switch (this.command) {
      case '?':
        this.gamelog.push({
          src: 'game',
          msg: this.currentHelpMsg()
        });
        break;
      case 'walk onto court':
        var currentLocation = this.userLocation;
        if (currentLocation === 'stadium') {
          currentLocation = this.userLocation = this.userHasWeapon ? 'courtwithball' : 'courtwithoutball';
          this.gamelog.push({
            src: 'game',
            msg: this.location[currentLocation].prompt
          });
        } else {
          this.userLocation = 'stadium';
          this.gamelog.push({
            src: 'game',
            msg: this.location.weaponroom.prompt
          });
        }


        this.gamelog.push({
          src: 'game',
          msg: this.currentHelpMsg()
        });
        break;

      case 'take ball':
        this.userHasWeapon = true;
        break;

      default:
        var sayArr = this.command.split(' ');
        if (sayArr[0] === 'say') {
          this.gamelog.push({
            src: 'game',
            msg: sayArr[1] || 'SAY SOMETHING!'
          });
        } else {
          this.gamelog.push({
            src: 'game',
            msg: 'BAD COMMAND: Enter ? to see commands'
          });
        }
      }
      this.command = ''; //clear command after processing

    };
    GameController.prototype.currentHelpMsg = function() {
      var str = '';
      switch (this.userLocation) {

      case 'stadium':
        this.location.weaponroom.commands.forEach(function(item, index) {
          str += index > 0 ? ' | ' : '';
          str += item;
        });
        break;

      case 'courtwithoutball':
        this.location.courtwithoutball.commands.forEach(function(item, index) {
          str += index > 0 ? ' | ' : '';
          str += item;
        });
        break;
      }
      return str;
    };

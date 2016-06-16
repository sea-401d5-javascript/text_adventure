'use strict';

module.exports = function(app) {
  app.controller('GameController', GameController);
};

function GameController() {
    this.model = {
      userLocation: 'start',
      userHasBall: false,
      command: '',
      gamelog: [],
      location: {
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
    this.startGame = function() {
      this.model.gamelog = [];
      this.model.userLocation = 'start';
      this.model.userHasBall = false;
      this.model.command = '';
      this.model.gamelog.push({
        src: 'game',
        msg: this.model.location.start.prompt
      });
      this.model.location.start.commands.forEach(function(item) {
        this.model.gamelog.push({
          src: 'command',
          msg: item
        });
      });
      this.model.userLocation = 'courtwithoutball';
    };
    this.processInput = function() {


      this.model.gamelog.push({
        src: 'user',
        msg: this.model.command
      });

      switch (this.model.command) {
      case '?':
        this.model.gamelog.push({
          src: 'game',
          msg: this.currentHelpMsg()
        });
        break;
      case 'walk onto court':
        var currentLocation = this.model.userLocation;
        if (currentLocation === 'stadium') {
          currentLocation = this.model.userLocation = this.model.userHasWeapon ? 'courtwithball' : 'courtwithoutball';
          this.model.gamelog.push({
            src: 'game',
            msg: this.model.location[currentLocation].prompt
          });
        } else {
          this.model.userLocation = 'stadium';            this.model.gamelog.push({
            src: 'game',
            msg: this.model.location.weaponroom.prompt
          });
        }


        this.model.gamelog.push({
          src: 'game',
          msg: this.currentHelpMsg()
        });
        break;

      case 'take ball':
        this.model.userHasWeapon = true;
        break;

      default:
        var sayArr = this.model.command.split(' ');
        if (sayArr[0] === 'say') {
          this.model.gamelog.push({
            src: 'game',
            msg: sayArr[1] || 'SAY SOMETHING!'
          });
        } else {
          this.model.gamelog.push({
            src: 'game',
            msg: 'BAD COMMAND: Enter ? to see commands'
          });
        }
      }
      this.model.command = ''; //clear command after processing

    };
    this.currentHelpMsg = function() {
      var str = '';
      switch (this.model.userLocation) {

      case 'stadium':
        this.model.location.weaponroom.commands.forEach(function(item, index) {
          str += index > 0 ? ' | ' : '';
          str += item;
        });
        break;

      case 'courtwithoutball':
        this.model.location.courtwithoutball.commands.forEach(function(item, index) {
          str += index > 0 ? ' | ' : '';
          str += item;
        });
        break;
      }
      return str;
    };
};

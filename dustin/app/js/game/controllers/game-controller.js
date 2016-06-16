module.exports = function (app) {
  app.controller('GameController', GameController);
};

function GameController() {
  this.model = {
    userLocation: 'start',
    userHasWeapon: false,
    command: '',
    gamelog: [],
    location: {
      'start': {
        commands: ['Enter ? for available commands at any time.'],
        prompt: 'You and Spock just beamed down to the planets surface. To the north you see a structure, to the south you detect a wrecked ship and identify it as the SS Botany Bay'
      },
      'transportersite': {
        commands: ['go north', 'go south', 'use communicator'],
        prompt: 'You see the temple to the north and the wreckage to the south'
      },
      'temple': {
        commands: ['charm alien women', 'go to transporter site'],
        prompt: 'You are in a temple with beautiful s women'
      },
      'crashsitekhandead': {
        commands: ['go to transporter site'],
        prompt: 'Just an old wreck site here'
      },
      'crashsitekhanalivewithnoweapon': {
        commands: ['flee back to transporter site', 'allow Spock to reason'],
        prompt: 'A figure appears from the wreckage, "KHANNNNNNNNNNNNNN" you scream'
      },
      'crashsitekhanalivewithweapon': {
        commands: ['flee back to transporter site', 'allow Spock to reason', 'order your men to fire phasers'],
        prompt: 'A figure appears from the wreckage, "KHANNNNNNNNNNNNNN" you scream'
      }

    }
  };
  this.startGame = function () {
    this.model.gamelog = [];
    this.model.userLocation = 'start';
    this.model.userisAlive = true;
    this.model.userHasWeapon = false;
    this.model.khanAlive = true;
    this.model.command = '';
    this.model.gamelog.push({
      src: 'game',
      msg: this.model.location.start.prompt
    });
    this.model.location.start.commands.forEach((item) => {
      this.model.gamelog.push({
        src: 'command',
        msg: item
      });
    });
    this.model.userLocation = 'transportersite';
  };
  this.processInput = function () {

    this.model.gamelog.push({
      src: 'user',
      msg: this.model.command
    });

    if (this.model.userisAlive == false) {
      this.model.gamelog.push({
        src: 'game',
        msg: 'You are dead, consider your misstep and then restart the game'
      });
    } else {

      switch (this.model.command) {

      case '?':
        this.model.gamelog.push({
          src: 'game',
          msg: this.currentHelpMsg()
        });
        break;

      case 'go north':
        this.model.userLocation = 'temple';
        this.model.gamelog.push({
          src: 'game',
          msg: this.model.location.temple.prompt
        });
        break;

      case 'charm alien women':
        this.model.userLocation = 'temple';
        this.model.gamelog.push({
          src: 'game',
          msg: 'They like it but there is work to be done'
        });
        break;

      case 'use communicator':
        this.model.gamelog.push({
          src: 'game',
          msg: 'You call Scotty and ask for backup -- four red shirts are beamed down with phasers set to kill'
        });
        this.model.userHasWeapon = true;
        break;

      case 'go to transporter site':
        this.model.userLocation = 'transportersite';
        this.model.gamelog.push({
          src: 'game',
          msg: this.model.location.transportersite.prompt
        });
        break;

      case 'go south':
        if (!this.model.khanAlive) {
          this.model.userLocation = 'crashsitekhanadead';
          this.model.gamelog.push({
            src: 'game',
            msg: this.model.location.crashsitekhanalivewithweapon.prompt
          });
        }

        if (this.model.khanAlive) {
          if (this.model.userHasWeapon) {
            this.model.userLocation = 'crashsitekhanalivewithweapon';
            this.model.gamelog.push({
              src: 'game',
              msg: this.model.location.crashsitekhanalivewithweapon.prompt
            });
          } else {
            this.model.userLocation = 'crashsitekhanalivewithnoweapon';
            this.model.gamelog.push({
              src: 'game',
              msg: this.model.location.crashsitekhanalivewithnoweapon.prompt
            });
          }
        }
        break;

      case 'flee back to transporter site':
        this.model.gamelog.push({
          src: 'game',
          msg: 'Khan fired and kill you all'
        });
        this.model.userisAlive = false;
        break;

      case 'allow Spock to reason':
        this.model.gamelog.push({
          src: 'game',
          msg: 'His reason fell on deaf ears. Khan fired and kill you all'
        });
        this.model.userisAlive = false;
        break;

      case 'order your men to fire phasers':
        this.model.gamelog.push({
          src: 'game',
          msg: 'After a firece battle you have defeated Khan but lost all your men'
        });
        this.model.userLocation = 'crashsitekhandead';
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

    }
  };
  this.currentHelpMsg = function () {
    var str = '';
    switch (this.model.userLocation) {

    case 'temple':
      this.model.location.temple.commands.forEach(function (item, index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;

    case 'crashsitekhanalivewithweapon':
      this.model.location.crashsitekhanalivewithweapon.commands.forEach(function (item, index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;

    case 'crashsitekhanalivewithnoweapon':
      this.model.location.crashsitekhanalivewithnoweapon.commands.forEach(function (item, index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;

    case 'crashsitekhandead':
      this.model.location.crashsitekhandead.commands.forEach(function (item, index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;

    case 'transportersite':
      this.model.location.transportersite.commands.forEach(function (item, index) {
        str += index > 0 ? ' | ' : '';
        str += item;
      });
      break;
    }
    return str;
  };

}

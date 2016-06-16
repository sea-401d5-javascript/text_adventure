module.exports = function(app) {
  app.controller('StoryController', StoryController);
};

function StoryController() {
  this.commands = '';
  this.promptlog = [];
  this.commandlog = [];
  this.location = {
    'start': {
      prompt: 'You wake up in a room. You are disoriented and cold. You hear a growl. As you turn, you see a giant three headed dog. It does not look friendly.',
      commands: ['Leave the room', 'Fight the monster bare-handed']
    },
    'otherRoom': {
      prompt: 'You are in the next room. There are quite a few people. In the corner, you see a woman sleeping. Her hands loosely holding a sword.',
      commands: ['Try and steal the sword', 'Wake her up']
    },
    'otherRoomAndTryingToSteal': {
      prompt: 'You slowly walk up to the slumbering woman. As you reach for the sword, a hand grabs onto you. "I do not like theives" are the last words you hear, as the woman kills you. Lesson learned. Do not steal.',
      commands: ['Start over']
    },
    'otherRoomAndConvincing': {
      prompt: 'You wake the woman up, and tell her that there is treasure in the next room. You will split it with her, if she helps you to fight the monster. She is convinced.',
      commands: ['Go fight the monster']
    },
    'dungeonWithFists': {
      prompt: 'You try and fight the monster with your fists. That was a stupid idea. You manged to get one good swing in before the monster devours you.',
      commands: ['Start over']
    },
    'dungeonWithAlly': {
      prompt: 'You walk into the dungeon with your female ally. She brandishes her sword. The monster growls. You go to distract it as your ally hacks away at the heads of the monsters. Victory.'
    }

  };
}
StoryController.prototype.startGame = function() {
  this.commands = '';
  this.commandlog = [];
  this.promptlog = [];
  this.promptlog.push({
    msg: this.location.start.prompt
  });
  this.location.start.commands.forEach((item) => {
    this.commandlog.push({
      msg: item
    });

  });
};

StoryController.prototype.processInput = function() {

  switch(this.commands) {
    case 'Leave the room':
      this.commands = '';
      this.commandlog = [];
      this.promptlog.push({msg:this.location.otherRoom.prompt});
      this.location.otherRoom.commands.forEach((item) => {
        this.commandlog.push({msg: item});
      });
      break;
    case 'Fight the monster bare-handed':
      this.commands = '';
      this.commandlog = [];
      this.promptlog.push({msg:this.location.dungeonWithFists.prompt});
      this.location.dungeonWithFists.commands.forEach((item) => {
        this.commandlog.push({msg:item});
      });
      break;
    case 'Start over':
      this.startGame();
      break;
    case 'Try and steal the sword':
      this.commands = '';
      this.commandlog = [];
      this.promptlog.push({msg:this.location.otherRoomAndTryingToSteal.prompt});
      this.location.otherRoomAndTryingToSteal.commands.forEach((item) => {
        this.commandlog.push({msg:item});
      });
      break;
    case 'Wake her up':
      this.commands = '';
      this.commandlog = [];
      this.promptlog.push({msg:this.location.otherRoomAndConvincing.prompt});
      this.location.otherRoomAndConvincing.commands.forEach((item) => {
        this.commandlog.push({msg:item});
      });
      break;
    case 'Go fight the monster':
      this.commands = '';
      this.commandlog = [];
      this.promptlog.push({msg:this.location.dungeonWithAlly.prompt});
      break;
    default:
      this.promptlog.push({msg:'INVAILD CHOICE. PLEASE CHOOSE ONE OF THE CHOICES BELOW.'});
  }
};

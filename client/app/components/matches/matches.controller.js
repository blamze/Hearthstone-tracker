class MatchesController {
  constructor(matchesService, classesService, loginService, decksService, usersService,$window) {
    this.matchesService = matchesService;
    this.classesService = classesService;
    this.loginService = loginService;
    this.decksService = decksService;
    this.usersService = usersService;
    this.$window = $window;
    this.classes;
    this.matches;
    this.message;
    this.loginService.isSignedIn();
    this.loadClases();
    this.loadMatches();
    this.userData =  this.loginService.getUserInfo();
  }

  loadClases() {
    this.classesService.getClasses()
      .then((data) => {
        this.classes = data.data.data;
      })
      .catch((error) => {
        this.message = 'Could not load classes'
      });
  }

  loadMatches() {
    this.matchesService.getMatches()
      .then((data) => {
      this.matches = data.data.data;
    })
      .catch(() => {
        this.message = 'Could not load matches'
      });
  }

  findDecksF(data) {
    this.decksService.findDeck({classid: data.fclass})
      .then((data) => {
        this.deckF = data.data.data;
      })
      .catch(() => {
        this.message = 'Could not load decks';
      });
  }

  findDecksS(data) {
    this.decksService.findDeck({classid: data.sclass})
      .then((data) => {
        this.deckS = data.data.data;
      })
      .catch(() => {
        this.message = 'Could not load decks';
      });
  }

  showPie(winrate) {
    var total = 158,
      pie = document.querySelector('.pie')
    var numberFixer = function (num) {
      var result = ((num * total) / 100);
      return result;
    }
    var fixedNumber = numberFixer(winrate),
      result = fixedNumber + ' ' + total;
    pie.style.strokeDasharray = result;
  }


  saveMatch(data) {
    this.matchesService.addMatch(data)
      .then(() => {
        this.usersService.addPointsToUser({data:this.userData.email});
        this.message = 'Match added, you got 1 point in highscore';
        this.resetInputs();
        this.loadMatches();
      }).catch(()=> {
      this.message = 'Error, something went wrong, try again';
    });
  };

  getWinrate(data) {
    this.matchesService.getWinrate(data)
      .then((data) => {
        this.winrate = data.data.data;
        this.showPie(this.winrate);
      })
      .catch(() => {
        this.message = 'Could not load winrate';
      });
  };

  deleteMessage() {
    this.message = '';
  }

  resetInputs(){
    this.add = '';
    this.select = '';
  }
}

export default MatchesController;

class MatchesController {
  constructor(matchesService, classesService, $scope, loginService, decksService) {
    this.name = 'hero';
    this.matchesService = matchesService;
    this.matches;
    this.classesService = classesService;
    this.classes;
    this.loginService = loginService;
    this.decksService = decksService;
    this.loginService.isSignedIn();

    this.classesService.getClasses()
      .then((data) => {
        this.classes = data.data.data;
      })
      .catch((error) => {
        this.error.message = error.data;
      });

    this.matchesService.getMatches().then((data) => {
      this.matches = data.data.data;
    })
      .catch((error) => {
        this.error.message = error.data;
      });

  }

  findDecksF(data) {
    var getDeckById = this.decksService.findDeck({classid: data.fclass});
    getDeckById
      .then((data) => {
        this.deckF = data.data.data;
      })
      .catch((error) => {
        this.error.message = error.data;
      });
  }

  findDecksS(data) {
    var getDeckById = this.decksService.findDeck({classid: data.sclass});
    getDeckById
      .then((data) => {
        this.deckS = data.data.data;
      })
      .catch((error) => {
        this.error.message = error.data;
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
    this.matchesService.addMatch(data);
    // window.location.reload();
  };

  getWinrate(data) {
    this.matchesService.getWinrate(data)
      .then((data) => {
        this.winrate = data.data.data;
        this.showPie(this.winrate);
      })
      .catch((error) => {
        this.error.message = error.data;
      });
    // window.location.reload();
  };

  editClass(data) {
    this.classesService.editMatch(data);
    window.location.reload();
  };

  deleteClass(data) {
    this.classesService.deleteMatch(data);
    window.location.reload();
  };

}

export default MatchesController;

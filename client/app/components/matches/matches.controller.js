class MatchesController {
  constructor(matchesService, classesService, $scope, loginService) {
    this.name = 'hero';
    this.matchesService = matchesService;
    this.matches;
    this.classesService = classesService;
    this.classes;
    this.loginService = loginService;

    this.loginService.isSignedIn();


    // console.log(this.User.getUser())
    // if(true) {
    //   this.$state.go('login');
    // }


    this.labels = ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

    this.data = [
      [65, 59, 90, 81, 56, 55, 40],
      [28, 48, 40, 19, 96, 27, 100]
    ];

    var getClasses = this.classesService.getClasses();
// console.log(promise);
    getClasses
      .then((data) => {
        this.classes = data.data.data;
        console.log(this.classes, " turetu buti classes");
      })
      .catch((error) => {
        // this.error.message = error.data;
      });

    var promise = this.matchesService.getMatches();
    console.log(promise);
    promise
      .then((data) => {
        this.matches = data.data.data;
        console.log(this.matches, " turetu buti data");
      })
      .catch((error) => {
        // this.error.message = error.data;
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
        console.log(this.winrate, " turetu buti winrate");
        this.showPie(this.winrate);
      })
      .catch((error) => {
        // this.error.message = error.data;
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
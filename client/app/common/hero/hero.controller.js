class HeroController {
  constructor(matchesService) {
    this.name = 'hero';
    this.matchesService = matchesService;
    this.matches;
    this.test = ['labas','duu', 'tryss'];




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
}

export default HeroController;

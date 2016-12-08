class DecksController {
    constructor(classesService, decksService, loginService) {
    this.decksService = decksService;
      this.loginService = loginService;
    this.decks;
    this.classesService = classesService;
    this.classes;
    this.decksById;

    this.decksService.getDecks().then((data) => {
        this.decks = data.data.data;
      })
      .catch((error) => {
        // this.error.message = error.data;
      });

      this.classesService.getClasses()
        .then((data) => {
          this.classes = data.data.data;
        })
        .catch((error) => {
          // this.error.message = error.data;
        });

      this.loginService.isSignedIn();
  }
  findDeck(data) {
    console.log(data);
    var getDeckById = this.decksService.findDeck(data);
    getDeckById
      .then((data) => {
        this.decksById = data.data.data;
        console.log(this.decksById, " turetu buti decksbyId");
      })
      .catch((error) => {
        // this.error.message = error.data;
      });
  }

  saveDeck(data) {
    this.decksService.addDeck(data);
    window.location.reload();
  };

  editDeck(data) {
    this.decksService.editDeck(data);
    window.location.reload();
  };

  deleteDeck(data) {
    this.decksService.deleteDeck(data);
    window.location.reload();
  };
}
export default DecksController;

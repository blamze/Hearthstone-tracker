class DecksController {
    constructor(classesService, decksService) {
    this.decksService = decksService;
    this.decks;
    this.classesService = classesService;
    this.classes;
    this.decksById;

    var getDecks = this.decksService.getDecks();
    // console.log(promise);
    getDecks
      .then((data) => {
        this.decks = data.data.data;
        console.log(this.decks, " turetu buti decks");
      })
      .catch((error) => {
        // this.error.message = error.data;
      });

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

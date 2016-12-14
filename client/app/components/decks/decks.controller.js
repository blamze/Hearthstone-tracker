class DecksController {
  constructor(classesService, decksService, loginService) {
    this.decksService = decksService;
    this.loginService = loginService;
    this.decks;
    this.classesService = classesService;
    this.classes;
    this.decksById;
    this.message;
    this.loginService.isSignedIn();
    this.loadClases()
    this.loadDecks();
  }

  loadClases() {
    this.classesService.getClasses()
      .then((data) => {
        this.classes = data.data.data;
      })
      .catch(() => {
        this.message = 'Could not load classes';
      });
  }

  loadDecks() {
    this.decksService.getDecks()
      .then((data) => {
        this.decks = data.data.data;
      })
      .catch(() => {
        this.message = 'Could not load decks'
      });
  }

  findDeck(data) {
    if (data.classid === undefined) {
      this.loadDecks();
    } else {
      this.decksService.findDeck(data)
        .then((data) => {
          this.decks = data.data.data;
        })
        .catch(() => {
          this.message = 'Could not load decks';
        });
    }
  }

  saveDeck(data) {
    this.decksService.addDeck(data)
      .then(() => {
        this.message = 'New deck added';
        this.resetInputs();
        this.loadDecks();
      }).catch(()=> {
      this.message = 'Error, something went wrong, try again';
    });
  };

  editDeck(data) {
    this.decksService.editDeck(data)
      .then(() => {
        this.message = 'Deck edited';
        this.resetInputs();
        this.loadDecks();
      }).catch(()=> {
      this.message = 'Error, something went wrong, try again';
    });
  };

  deleteDeck(data) {
    this.decksService.deleteDeck(data)
      .then(() => {
        this.message = 'Deck deleted';
        this.resetInputs();
        this.loadDecks();
      }).catch(()=> {
      this.message = 'Error, something went wrong, try again';
    });
  };

  deleteMessage(){
    this.message = '';
  }

  resetInputs() {
    this.delete = '';
    this.add = '';
    this.edit = '';
    this.find = '';
  }
}
export default DecksController;

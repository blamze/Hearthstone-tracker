class CardsController {
  constructor(cardsService) {
    this.cardsService = cardsService;
    this.cards;

    // this.cardsService.getAllCards()
    //   .then((data) => {
    //     this.cards = data.data;
    //     console.log(this.cards, 'dataaaa');
    //   })
    //   .catch((error) => {
    //     // this.error.message = error.data;
    //   });

    this.cardsService.getSearchedCard()
      .then((data) => {
        this.cards = data.data;
        console.log(this.cards, 'dataaaa');
      })
      .catch((error) => {
        // this.error.message = error.data;
      });


  }


  findCards(option){
    console.log(option.name);
    this.cardsService.getSearchedCard(option.name)
      .then((data) => {
        this.cards = data.data;
        console.log(this.cards, 'dataaaa');
      })
      .catch((error) => {
        // this.error.message = error.data;
      });
  }

  saveClass(data) {
    this.classesService.addClass(data);
    window.location.reload();
  };

  editClass(data) {
    this.classesService.editClass(data);
    window.location.reload();
  };

  deleteClass(data) {
    this.classesService.deleteClass(data);
    window.location.reload();
  };
}
export default CardsController;

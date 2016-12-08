class CardsController {
  constructor(cardsService) {
    this.cardsService = cardsService;
    this.cards = {};
  }

  findCards(option) {
    this.cardsService.getSearchedCard(option.name)
      .then((data) => {
        this.cards = data.data;
      })
      .catch((error) => {
        this.error.message = error.data;
      });
  }

}
export default CardsController;

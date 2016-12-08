class CardsController {
  constructor(cardsService, loginService) {
    this.cardsService = cardsService;
    this.loginService = loginService;
    this.cards = {};
    this.loginService.isSignedIn();
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

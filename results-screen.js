// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    // bind functions
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this._continue = this._continue.bind(this);

    this.buttonContinue = this.containerElement.querySelector(".continue");
    const buttonMenu = this.containerElement.querySelector(".to-menu");


 
    this.buttonContinue.innerHTML = "Continue";
    this.buttonContinue.addEventListener('click', this._continue)


    buttonMenu.innerHTML = "Back to menu";
    buttonMenu.addEventListener('click', (event) => {
      window.scrollTo(0, 0);
      window.location.reload();
    })


  }

  show(numberCorrect, numberIncorrect, menuShow, flashScreenShow) {
    this.containerElement.classList.remove('inactive');
    this.menuShow = menuShow;
    this.flashScreenShow = flashScreenShow;
    this.numberCorrect = numberCorrect;
    this.numberIncorrect = numberIncorrect;

    
    
    this.containerElement.querySelector(".percent").innerHTML = Math.round(numberCorrect / (numberCorrect + numberIncorrect)* 100);
    this.containerElement.querySelector(".correct").innerHTML = numberCorrect + " ";
    this.containerElement.querySelector(".incorrect").innerHTML = numberIncorrect + " ";

    if(this.numberIncorrect == 0)
    {
      this.buttonContinue.removeEventListener('click', this._continue);

      this.buttonContinue.innerHTML = "Start Over?";
      this.buttonContinue.addEventListener('click', () => {
        window.scrollTo(0, 0);
        window.location.reload();
      });
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _continue()
  {
    this.hide();
    // if(numberIncorrect != 0)
    this.flashScreenShow(null, this.menuShow);
  }
}

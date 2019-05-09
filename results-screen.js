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

  }

  show(numberCorrect, numberIncorrect, menuShow, flashScreenShow) {
    this.containerElement.classList.remove('inactive');

    const buttonContinue = this.containerElement.querySelector(".continue");
    const buttonMenu = this.containerElement.querySelector(".to-menu");
    
    this.containerElement.querySelector(".percent").innerHTML = Math.round(numberCorrect / (numberCorrect + numberIncorrect)* 100);
    this.containerElement.querySelector(".correct").innerHTML = numberCorrect + " ";
    this.containerElement.querySelector(".incorrect").innerHTML = numberIncorrect + " ";

    if(numberIncorrect == 0)
    {
      buttonContinue.innerHTML = "Start Over?";
      buttonContinue.addEventListener('click', () => {
        window.scrollTo(0, 0);
        window.location.reload();
      });
    }
    else
    {
      buttonContinue.innerHTML = "Continue";
      buttonContinue.addEventListener('click', () => {
        this.hide();
        // if(numberIncorrect != 0)
        flashScreenShow(null, menuShow);
      })
    }

    buttonMenu.innerHTML = "Back to menu";
    buttonMenu.addEventListener('click', (event) => {
      window.scrollTo(0, 0);
      window.location.reload();
    })

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}

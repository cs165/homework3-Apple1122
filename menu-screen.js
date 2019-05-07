// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement, flashcardShow) {
    this.containerElement = containerElement;

    // bind function
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    var choices = document.getElementById("choices");

    FLASHCARD_DECKS.forEach((index) => {
      const testOption = document.createElement('div');
      testOption.setAttribute('id', 'choices');
      testOption.innerHTML = index.title;
      // console.log(testOption);

      choices.appendChild(testOption);
      testOption.addEventListener('click', (event) => {
        // connect to flashcard
        // console.log(flashcardShow);
        this.hide();
        flashcardShow(index.words);
      });
    })
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

}



// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {

  constructor(containerElement, resultShow) {
    // attribute: variables
    this.containerElement = containerElement;
    this.flashcardList = [];
    this.correct = 0;
    this.incorrect = 0;
    this.index = 0;

    // attribute: methods
    this.resultShow = resultShow;

    // bind function
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this._judgeAns = this._judgeAns.bind(this);
    this._addFlashcard = this._addFlashcard.bind(this);
    this._deleteFlashcard = this._deleteFlashcard.bind(this);
  }

  show(questionList) {
    this.containerElement.classList.remove('inactive');

    
    for(var key in questionList)
    {
      this.flashcardList.push(new Flashcard(key, questionList[key]));
    }

    this._addFlashcard(this.flashcardList[this.index]);
    // console.log(this.flashcardList);

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _judgeAns()
  {
    document.addEventListener('judgeAnswer', (e) => {

        if(e.detail === "correct")
          this.correct++;
        else
          this.incorrect++;

        if(++index > flashcardList.length)
        {
          this.hide();
          this.resultShow(this.correct, this.incorrect);
        }
        else
        {
          this._deleteFlashcard();
          this._addFlashcard(this.flashcardList[index]);
        }
    })
  }

  _addFlashcard(flashcard)
  {
    const flashcardContainer = document.querySelector('#flashcard-container');

    flashcardContainer.append(flashcard.returnObject());
  }

  _deleteFlashcard()
  {
    const flashcardContainer = document.querySelector('#flashcard-container');

    flashcardContainer.removeChild(flashcardContainer.childNodes[0]);
  }



}

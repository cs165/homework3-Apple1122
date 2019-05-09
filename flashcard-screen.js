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
    this.correct = 0;
    this.incorrect = 0;
    this.index = 0;
    this.doAgain = false;
    this.flashcardList = [];
    this.incorrectList = [];
    this.tempIndexList = [];
    this.cycle = 0; // count which run

    // attribute: methods
    this.resultShow = resultShow;

    // bind function
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this._addFlashcard = this._addFlashcard.bind(this);
    this._deleteFlashcard = this._deleteFlashcard.bind(this);

    document.addEventListener('judgeAnswer', (event) => {

      // console.log("I got you");
      
        if(event.detail === "correct")
        {
          this.correct++;
        }
        else
        {
          // console.log("incorrect " + this.index);
          // this.incorrectList.push(this.index);
          this.incorrectList.push(this.index);
          this.incorrect++;
        }
         

        // console.log("correst: " + this.correct);
        // console.log("incorrect: " + this.incorrect);

        // if(((++this.index) >= this.flashcardList.length ) && (!this.doAgain))
        if((++this.index) >= this.flashcardList.length )
        {
          this._deleteFlashcard();
          this.hide();
          this.doAgain = true;
          this.resultShow(this.correct, this.incorrect, this.menushow, this.show);
          this.index = 0;
          // this.correct = 0;
          this.incorrect = 0;
          console.log("this.incorrectList: " + this.incorrectList);
        }
        else
        {
          this._deleteFlashcard();
          // this._addFlashcard(this.flashcardList[this.tempIndexList[this.index]]);
          this._addFlashcard(this.flashcardList[this.index]);
        }
    
        document.querySelector(".correct").innerHTML = this.correct;
        document.querySelector(".incorrect").innerHTML = this.incorrect; 
    })
  }

  show(questionList, menushow) {
    this.containerElement.classList.remove('inactive');
    
    console.log("run: " + this.cycle++ + " , this.doAgain=" + this.doAgain);



    if(!this.doAgain)
      this.questionLists = questionList;
    // console.log(typeof(questionList));

    this.menushow = menushow;

    this.flashcardList = [];
    
    if(this.doAgain)
    {
      this.tempIndexList = this.incorrectList.concat();
      console.log("this.tempIndexList: " + this.tempIndexList);
      this.incorrectList = [];

      console.log("this.questionList: " + this.questionLists);

      var count = 0;
      var idx = 0;

      console.log()
      for(var key in this.questionLists)
      {
        if(count++ != this.tempIndexList[idx])
        {
          // idx++;
          continue;
        }

        this.flashcardList.push(new Flashcard(key, this.questionLists[key]));

        if(idx++ >= this.tempIndexList.length)
          break;

        console.log(key);
      }

    }
    else
    {
      for(var key in this.questionLists)
      {
        this.flashcardList.push(new Flashcard(key, this.questionLists[key]));
      }

      console.log(this.questionLists);
    }

    this._addFlashcard(this.flashcardList[this.index]);
    // console.log(this.flashcardList);
    console.log("1 end")

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }


  _addFlashcard(flashcard)
  {
    const flashcardContainer = document.querySelector('#flashcard-container');

    flashcardContainer.append(flashcard.returnObject());
    // console.log(flashcard.returnObject());
  }

  _deleteFlashcard()
  {
    const flashcardContainer = document.querySelector('#flashcard-container');

    flashcardContainer.removeChild(flashcardContainer.childNodes[0]);
  }



}

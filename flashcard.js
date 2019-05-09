// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  // constructor(containerElement, frontText, backText) {
  //   this.containerElement = containerElement;
  constructor(frontText, backText) {

    // attribute
    this.result = "";
    this.originX = null;
    this.originY = null;
    this.dragStart = false;
    this.offsetX = 0;
    this.offsetY = 0;
    // this.frontText = frontText;
    // this.backText = backText;

    // bind function
    this._flipCard = this._flipCard.bind(this);
    this.returnObject = this.returnObject.bind(this);
    this.judge = this.judge.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    // this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._onDragStart);
    this.flashcardElement.addEventListener('pointermove', this._onDragMove);
    this.flashcardElement.addEventListener('pointerup', this._onDragEnd);
  }

  returnObject() 
  {
    // const temp = this.flashcardElement;
    // return temp;
    return this.flashcardElement;
  }

  judge() 
  {
    // ...
    document.dispatchEvent(new CustomEvent('judgeAnswer', { detail: this.result }))
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
     this.cardContainer = document.createElement('div');
    this.cardContainer.classList.add('flashcard-box');
    this.cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    this.cardContainer.appendChild(wordSide);
    this.cardContainer.appendChild(definitionSide);

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    this.position = this.cardContainer.getBoundingClientRect();

    return this.cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  _onDragStart(event)
  {
    event.preventDefault();
    // console.log("onDragStart");
    this.originX = event.clientX;
    this.originY = event.clientY;
    
    this.dragStart = true;
    
  }

  _onDragMove(event)
  {
    if(!this.dragStart)
      return;

    event.preventDefault();
    
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;

    this.cardContainer.style.transform = 'translate(' + translateX + 'px,' + translateY + 'px)'+ 'rotate(' + 0.2 * translateX + 'deg)';

    if(Math.abs(deltaX) >= 150)
    {
      document.body.style.backgroundColor = "#97b7b7";

    }
    else
    {
      document.body.style.backgroundColor = "#d0e6df";
    }
  }

  _onDragEnd(event)
  {
    this.dragStart = false;
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    const deltaX = event.clientX - this.originX;

    if(deltaX  >= 150)
    {
      this.result = "correct";
      document.dispatchEvent(new CustomEvent('judgeAnswer', { detail: this.result }))
      // console.log("judgeAnswer");
      document.body.style.backgroundColor = "#d0e6df";
      this.cardContainer.style.transform = 'translate(' + this.position.left + 'px,' + this.position.top + 'px)';

      this.offsetX = 0;
      this.offsetY = 0;
    }
    else if(deltaX  <= -150)
    {
      this.result = "incorrect";
      document.dispatchEvent(new CustomEvent('judgeAnswer', { detail: this.result }))
      // console.log("judgeAnswer");
      document.body.style.backgroundColor = "#d0e6df";
      this.cardContainer.style.transform = 'translate(' + this.position.left + 'px,' + this.position.top + 'px)';

      this.offsetX = 0;
      this.offsetY = 0;
    }
    else
    {
      document.body.style.backgroundColor = "#d0e6df";
      this.cardContainer.style.transform = 'translate(' + this.position.left + 'px,' + this.position.top + 'px)';
      this.offsetX = 0;
      this.offsetY = 0;
    }

  }


}

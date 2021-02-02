import { getRandomInt } from '../helpers/getRandomInt';

export class GamePlaySteps {
  constructor(category, soundPlay, stop, score) {
    this.words = [];
    this.category = category;
    this.soundPlay = soundPlay;
    this.score = score;
    this.stopGame = stop;
  }

  start(category, words) {
    this.words = words || this.words;
    this.category = category || this.category;
    [this.word] = [...this.words.splice(getRandomInt(this.words.length), 1)];
    const wordCategory = this.category !== 'difficult' ? this.category : this.word.category;
    const playWordInStep = () => this.soundPlay.playWord(wordCategory, this.word.word);
    this.playWordInStep = playWordInStep;
    this.playWordInStep();
    document.addEventListener('repeatsound', this.playWordInStep);

    const attemptFinish = (event) => {
      if (event.detail.card.classList.contains('card_guessed-correct')) return;
      if (event.detail.text.toLowerCase() === this.word.word.toLowerCase()) {
        document.removeEventListener('playcardclick', attemptFinish);
        this.correctGuess(event.detail.card);
        window.setTimeout(() => this.finish(), 1000);
        document.dispatchEvent(new CustomEvent('statsplayright', { detail: { category: event.detail.category, word: this.word.word } }));
      } else {
        this.incorrectGuess();
        document.dispatchEvent(new CustomEvent('statsplaywrong', { detail: { category: event.detail.category, word: this.word.word } }));
      }
    };
    document.addEventListener('playcardclick', attemptFinish);

    document.addEventListener('rendercategory', () => document.removeEventListener('playcardclick', attemptFinish));
    document.addEventListener('renderfirstscreen', () => document.removeEventListener('playcardclick', attemptFinish));
    document.addEventListener('gamemodecallswtich', () => document.removeEventListener('playcardclick', attemptFinish));
  }

  finish() {
    document.removeEventListener('repeatsound', this.playWordInStep);
    if (this.words.length > 0) {
      this.start();
    } else {
      this.stopGame(this.score.count);
    }
  }

  correctGuess(card) {
    this.soundPlay.playBeep(true);
    card.classList.add('card_guessed-correct');
    this.score.addCorrect();
  }

  incorrectGuess() {
    this.soundPlay.playBeep(false);
    this.score.addIncorrect();
  }
}

import { GamePlaySteps } from './GamePlaySteps';

export class GamePlay {
  constructor(data, control, soundPlay, score) {
    this.data = data;
    this.control = control;
    this.category = undefined;
    this.soundPlay = soundPlay;
    this.score = score;
  }

  init() {
    this.steps = new GamePlaySteps(this.category, this.soundPlay, () => this.stop(), this.score);
    return this;
  }

  setCategory(category) {
    this.category = category;
    if (category === undefined) {
      this.control.state = undefined;
    } else {
      this.control.state = false;
    }
    this.control.update();
  }

  showControl(category) {
    this.setCategory(category);
    const runStart = () => this.start();
    this.runStart = runStart;
    document.addEventListener('startgame', this.runStart);
    this.control.show();
  }

  hideControl() {
    document.removeEventListener('startgame', this.runStart);
    this.soundPlay.playPromise = undefined;
    this.control.hide();
    this.abortGame();
  }

  start() {
    if (!this.category) return;
    this.control.state = true;
    this.control.update();
    const words = Object.values(this.data.gameData[this.category]);
    this.steps.start(this.category, words);
  }

  stop() {
    const result = this.score.count.incorrect === 0;
    this.soundPlay.playGameResult(result);
    this.control.state = undefined;
    this.control.update();
    const event = new CustomEvent('gameend', {
      detail: this.score.count,
    });
    document.dispatchEvent(event);
    this.score.reset();
  }

  abortGame() {
    this.score.reset();
    this.control.state = undefined;
    this.control.update();
  }
}

import { GamePlay } from './GamePlay';

export class GameMode {
  constructor(play = false) {
    this.mode = play ? 'play' : 'train';
    this.category = undefined;
  }

  init(data, control, soundPlay, score) {
    this.gamePlay = new GamePlay(data, control, soundPlay, score).init();
    return this;
  }

  update(play, category) {
    const mode = play ? 'play' : 'train';
    if (category !== this.category) {
      this.category = category;
      this.gamePlay.setCategory(category);
    }
    if (this.mode !== mode) {
      this.mode = mode;
      if (play) {
        this.gamePlay.showControl(category);
      } else {
        this.gamePlay.hideControl();
      }
      document.body.classList.toggle('game-mode_play');
    }
  }
}

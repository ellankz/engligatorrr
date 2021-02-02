import { Game } from './Game';

export class App {
  static start(rootSelector) {
    const game = new Game();
    game.init(rootSelector);
  }
}

import { CategoriesMenu } from './CategoriesMenu';
import { Main } from './Main';
import { GameMode } from './GameMode';
import { Data } from './Data';
import { Header } from './Header';
import { Footer } from './Footer';
import { GameControl } from './GameControl';
import { SoundPlay } from './SoundPlay';
import { GameScore } from './GameScore';
import { Stats } from './Stats';

export class Game {
  constructor() {
    this.main = undefined;
  }

  init(root) {
    this.root = document.querySelector(root);
    this.data = new Data().init();
    this.currentCategory = undefined;
    this.play = false;
    this.stats = new Stats(this.data, this.main).init();
    this.soundPlay = new SoundPlay(this.root);
    this.score = new GameScore(this.root).init();
    this.gameControl = new GameControl(this.root);
    this.gameMode = new GameMode(false).init(
      this.data, this.gameControl, this.soundPlay, this.score,
    );
    this.header = new Header(this.gameMode, this.root);
    this.main = new Main(this.data, this.gameMode, this.root, this.soundPlay, this.stats).init();
    this.menu = new CategoriesMenu(this.data.categories, this.header, this.main, this.data);
    this.footer = new Footer(this.root);
    this.render();
  }

  render() {
    this.header.render();
    this.menu.render();
    this.main.render();
    this.main.listen();
    this.footer.render();
    this.gameControl.render();
    this.listen();
  }

  listen() {
    document.addEventListener('rendercategory', (event) => {
      this.currentCategory = event.detail;
      this.gameMode.update(this.play, this.currentCategory);
      this.score.reset();
      this.menu.highLightCategory(this.currentCategory);
    });
    const resetChosenCategory = () => {
      this.currentCategory = undefined;
      this.gameMode.update(this.play, this.currentCategory);
      this.score.reset();
      this.menu.disbaleCategoryHighlight();
    };
    document.addEventListener('renderfirstscreen', resetChosenCategory);
    document.addEventListener('renderstats', resetChosenCategory);
    document.addEventListener('gamemodecallswtich', (event) => {
      this.play = event.detail;
      this.switchMode();
    });
  }

  switchMode() {
    this.gameMode.update(this.play, this.currentCategory);
    this.score.reset();
    this.main.render(this.currentCategory);
  }
}

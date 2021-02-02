import { data } from '../data/dataStorage';
import { getRandomInt } from '../helpers/getRandomInt';

const MAX_CARDS_NUMBER = 10;
export class Data {
  constructor() {
    this.generalData = data;
    this.gameData = {};
  }

  init() {
    this.categories = Object.keys(this.generalData);
    this.categories.forEach((cat) => {
      const categoryGeneralData = this.generalData[cat];
      if (categoryGeneralData) {
        const words = {};
        const getNewWord = () => {
          const wordIndex = getRandomInt(categoryGeneralData.length);
          const newWord = categoryGeneralData[wordIndex];
          if (!words[newWord.word]) {
            words[newWord.word] = newWord;
          } else {
            getNewWord();
          }
        };
        for (let i = 0; i < categoryGeneralData.length && i < MAX_CARDS_NUMBER; i += 1) {
          getNewWord();
        }
        this.gameData[cat] = words;
      }
    });
    return this;
  }

  composeDifficult(stats) {
    const res = {};
    stats.forEach((item) => {
      res[item.word] = this.generalData[item.category].find((word) => word.word === item.word);
      res[item.word].category = item.category;
    });
    this.gameData.difficult = res;
  }
}

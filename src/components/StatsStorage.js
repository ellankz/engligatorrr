export class StatsStorage {
  constructor(data) {
    this.categories = data.categories;
    this.generalData = data.generalData;
    this.data = {};
  }

  init() {
    this.generateBlankData();
    this.loadAllStats();
    return this;
  }

  getStats() {
    return this.data;
  }

  generateBlankData() {
    this.categories.forEach((cat) => {
      this.generalData[cat].forEach((word) => {
        const dataWord = {
          word: word.word,
          category: cat,
          correct: 0,
          incorrect: 0,
          train: 0,
          percentCorrect: 0,
        };
        this.data[JSON.stringify({ category: cat, word: word.word })] = dataWord;
      });
    });
  }

  resetStats() {
    this.generateBlankData();
    this.saveData();
  }

  loadAllStats() {
    const dataObj = JSON.parse(window.localStorage.getItem('engligatorrr'));
    if (dataObj) {
      this.data = { ...this.data, ...dataObj };
    }
  }

  saveWord(stats, word, key) {
    const dataWord = {
      word: word.text,
      category: word.category,
      ...stats,
    };
    this.data[key] = dataWord;
    this.saveData();
  }

  saveData() {
    window.localStorage.setItem('engligatorrr', JSON.stringify(this.data));
  }
}

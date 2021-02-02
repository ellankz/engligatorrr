export class StatsCollection {
  constructor(storage) {
    this.storage = storage;
  }

  init() {
    this.currentStats = this.storage.init().getStats();
    document.addEventListener('statstrainclick', (event) => { this.countTrain(event.detail); });
    document.addEventListener('statsplayright', (event) => { this.countCorrect(event.detail); });
    document.addEventListener('statsplaywrong', (event) => { this.countInorrect(event.detail); });
    return this;
  }

  countCorrect(word) {
    const key = JSON.stringify(word);
    this.currentStats[key].correct += 1;
    this.currentStats[key].percentCorrect = this.countPercentCorrect(key);
    this.storage.saveWord(this.currentStats[key], word, key);
  }

  countInorrect(word) {
    const key = JSON.stringify(word);
    this.currentStats[key].incorrect += 1;
    this.currentStats[key].percentCorrect = this.countPercentCorrect(key);
    this.storage.saveWord(this.currentStats[key], word, key);
  }

  countTrain(word) {
    const key = JSON.stringify(word);
    this.currentStats[key].train += 1;
    this.storage.saveWord(this.currentStats[key], word, key);
  }

  countPercentCorrect(key) {
    return Math.round(
      (this.currentStats[key].correct
      / (this.currentStats[key].correct + this.currentStats[key].incorrect || 0))
      * 100,
    );
  }
}

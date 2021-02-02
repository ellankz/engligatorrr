const CORRECT_SOUND = './audio/effects/correct.mp3';
const INCORRECT_SOUND = './audio/effects/incorrect.mp3';
const SUCCESS_SOUND = './audio/effects/success.mp3';
const FAILURE_SOUND = './audio/effects/failure.mp3';

export class SoundPlay {
  constructor() {
    this.category = undefined;
    this.name = undefined;
    this.audio = new Audio();
    this.beepAudio = new Audio();
    this.resAudio = new Audio();
  }

  playWord(category, name) {
    if (this.category && this.category === category && this.name && this.name === name) {
      try {
        this.audio.currentTime = 0;
        this.audio.play();
      } catch (err) {
        throw new Error('error playing audio');
      }
    } else {
      const soundPath = `./audio/${category}/${name.toLowerCase()}.mp3`;
      this.audio = new Audio(soundPath);
      this.audio.play();
    }

    if (category && typeof category === 'string') this.category = category;
    if (name && typeof name === 'string') this.name = name;
  }

  playBeep(correct) {
    let soundPath = '';
    if (correct) {
      soundPath = CORRECT_SOUND;
    } else {
      soundPath = INCORRECT_SOUND;
    }
    this.beepAudio = new Audio(soundPath);
    this.beepAudio.play();
  }

  playGameResult(success) {
    let soundPath = '';
    if (success) {
      soundPath = SUCCESS_SOUND;
    } else {
      soundPath = FAILURE_SOUND;
    }
    this.resAudio = new Audio(soundPath);
    this.resAudio.play();
  }
}

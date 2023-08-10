import { AppDispatch } from 'src/redux/store';
import { soundObj } from './utils';
import { clearSound } from 'src/redux/HUDReducer';
import { deleteInAudios } from './AudioCore';

class AudioBuilder {
    audio: HTMLAudioElement;
    audioId: string;
    volume: number;
    id: string;
    currentVolume: number;
    dispatch: AppDispatch;
    constructor(
        audioId: string,
        dispatch: AppDispatch,
        volume: number,
        id: string
    ) {
        this.audio = new Audio(soundObj[audioId]);
        this.audioId = audioId;
        this.dispatch = dispatch;
        this.volume = volume;
        this.currentVolume;
        this.id = id;
    }

    setVolume(value: number) {
        this.currentVolume = value;
        this.audio.volume = (value / 100) * (this.volume / 100);
        return this;
    }

    play() {
        this.audio.play();
        return this;
    }

    pause() {
        this.audio.pause();
        return this;
    }

    to(value: string) {
        const length = value.length;
        const minutes = Number(value.slice(0, length - 2));
        const seconds = Number(value.slice(length - 2, length));
        const totalSeconds = seconds + minutes * 60;
        this.audio.currentTime = totalSeconds;
        return this;
    }

    looped() {
        this.audio.loop = true;
        return this;
    }

    clearByEnd() {
        this.audio.onended = () => {
            this.audio.pause();
            this.dispatch(clearSound(this.id));
            this.audio = null;
            deleteInAudios(this.id);
        };
        return this;
    }

    clear() {
        this.audio.pause();
        this.dispatch(clearSound(this.id));
        this.audio = null;
        deleteInAudios(this.id);
    }
}

export { AudioBuilder };

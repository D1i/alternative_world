import {sounds} from './sounds'


const currentSoundTrack = [];

export function playSound(id: number) {
    const audio = new Audio(sounds[id]);
    audio.play();
    if (id === 3) {
        audio.volume = 0.5;
    }

    currentSoundTrack.push(audio);

    return currentSoundTrack.length - 1;
}

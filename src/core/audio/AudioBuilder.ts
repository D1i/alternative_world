import { AppDispatch } from 'src/redux/store'
import { clearSound } from '../../redux/HUDReducer'
import { soundObj } from './utils'

class AudioBuilder {
    audio: HTMLAudioElement
    id: string
    dispatch: AppDispatch
    constructor(audioId: string, dispatch: AppDispatch) {
        this.audio = new Audio(soundObj[audioId])
        this.id = audioId
        this.dispatch = dispatch
    }

    setVolume(value: number) {
        this.audio.volume = value / 100
        return this
    }

    play() {
        this.audio.play()
        return this
    }

    pause() {
        this.audio.pause()
        return this
    }

    to(value: string) {
        const length = value.length
        const minutes = Number(value.slice(0, length - 2))
        const seconds = Number(value.slice(length - 2, length))
        const totalSeconds = seconds + minutes * 60
        this.audio.currentTime = totalSeconds
        return this
    }

    looped() {
        this.audio.loop = true
        return this
    }

    clearByEnd() {
        this.audio.onended = () => {
            this.audio.pause()
            this.dispatch(clearSound(this.id))
            this.audio = null
        }
        return this
    }

    clear() {
        this.audio.pause()
        this.dispatch(clearSound(this.id))
        this.audio = null
    }
}

export { AudioBuilder }

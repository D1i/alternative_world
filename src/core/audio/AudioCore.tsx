import { createContext } from 'react'

import { sounds } from './sounds'

const AudioContext = createContext(null)

export function AudioCore(props) {
    class audioCoreInit {
        audio: HTMLAudioElement
        constructor(audioId: number) {
            this.audio = new Audio(sounds[audioId])
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

        clear() {
            delete this.audio
        }
    }

    return (
        <AudioContext.Provider value={audioCoreInit}>
            {props.children}
        </AudioContext.Provider>
    )
}

export { AudioContext }

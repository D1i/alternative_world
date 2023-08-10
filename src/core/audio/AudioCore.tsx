import { createContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AudioBuilder } from './AudioBuilder';
import { addSound } from 'src/redux/HUDReducer';

const AudioContext = createContext<(id: string) => AudioBuilder>(null);

interface props {
    children: React.ReactNode;
}

const audios = [];

const deleteInAudios = (id) => {
    let index = null;
    for (let i = 0; i < audios.length; i++) {
        if (audios[i].id === id) {
            index = i;
            break;
        }
    }

    if (index !== null) {
        audios.splice(index, 1);
    }
};

function AudioCore(props: props) {
    const dispatch = useAppDispatch();
    const volume = useAppSelector(
        (state) => state.coreStateReducer.settings.volme
    );
    const sounds = useAppSelector((state) => state.coreStateReducer.sounds);

    useEffect(() => {
        sounds.forEach((sound) => {
            const audio = audios.find((audio) => sound === audio.id);
            audio.volume = volume;
            audio.setVolume(audio.currentVolume);
        });
    }, [volume]);

    const audioCoreInit = (audioId: string): AudioBuilder => {
        const id = String(Math.random());
        const sound: AudioBuilder = new AudioBuilder(
            audioId,
            dispatch,
            volume,
            id
        );
        audios.push(sound);
        dispatch(addSound(id));
        return sound;
    };

    return (
        <AudioContext.Provider value={audioCoreInit}>
            {props.children}
        </AudioContext.Provider>
    );
}

export { AudioContext, AudioCore, deleteInAudios };

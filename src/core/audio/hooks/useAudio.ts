import { useContext } from 'react';
import { AudioContext } from '../AudioCore';

const useAudio = () => {
    const audioCoreInit = useContext(AudioContext);
    return audioCoreInit;
};

export { useAudio };

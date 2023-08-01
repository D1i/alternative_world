import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux/es/exports'

// @ts-ignore
import {Game} from './game.tsx';
import {store} from "./redux/store";

import './index.css';


const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Game/>
    </Provider>
);


import { MoveBtns } from './move';
import { Inventory } from './HUD/inventory/inventory';
import { Map } from './Map';

import data from './assets/maps/map.json';
import { Player } from './classes';
import creator from './assets/creator.png';
import stone from './assets/stone.jpg';
import './App.css';

const player = new Player('Creator', creator, 64, 64, 0, 0);

export function App() {
  return (
    <div className="app">
      <MoveBtns>
        <Map
          data={data}
          bg={stone}
          chunk={64}
          width={100}
          height={100}
          player={player}
        />
      </MoveBtns>
    </div>
  );
}

import { layers } from '../layers';

const createLayer = (layer) => {
    layers.push(layer.reverse());
};

export { createLayer };

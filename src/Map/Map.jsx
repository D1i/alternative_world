import { useContext, useEffect, useRef, useState } from 'react';
import s from './Map.module.css';
import { MoveContext, showVector } from '../move';

import grass from '../assets/textures/TX Tileset Grass.png';
import wall from '../assets/textures/TX Tileset Stone Ground.png';

const Map = (props) => {
  const [player, setPlayer] = useState(props.player);
  const box = useRef();
  const canvas = useRef();
  const context = useRef();
  const bg = useRef();
  const images = useRef([]);
  const moveKeysStack = useContext(MoveContext);
  const { height, width, layers, tileheight, tilewidth } = props.data;

  useEffect(() => {
    setPlayer((e) => {
      const vector = showVector(moveKeysStack);
      const baseSpeed = e.baseSpeed;
      const diagonalSpeed = baseSpeed / 2 ** (1 / 2);
      console.log(vector);
      switch (vector) {
        case '➚':
          return { ...e, xSpeed: diagonalSpeed, ySpeed: diagonalSpeed };
        case '⇱':
          return { ...e, xSpeed: -diagonalSpeed, ySpeed: diagonalSpeed };
        case '🠕':
          return { ...e, xSpeed: 0, ySpeed: baseSpeed };
        case '⬊':
          return { ...e, xSpeed: diagonalSpeed, ySpeed: -diagonalSpeed };
        case '⇙':
          return { ...e, xSpeed: -diagonalSpeed, ySpeed: -diagonalSpeed };
        case '🠔':
          return { ...e, xSpeed: -baseSpeed, ySpeed: 0 };
        case '🠖':
          return { ...e, xSpeed: baseSpeed, ySpeed: 0 };
        case '🠗':
          return { ...e, xSpeed: 0, ySpeed: -baseSpeed };

        default:
          return { ...e, xSpeed: 0, ySpeed: 0 };
      }
    });
  }, [moveKeysStack]);

  useEffect(() => {
    const { sprite, url, x, y } = player;
    const playerWidth = player.width;
    const playerHeight = player.height;
    if (!sprite) {
      const image = new Image();
      image.src = url;
      setPlayer((e) => ({ ...e, sprite: image }));

      const grassImage = new Image();
      const wallImage = new Image();
      grassImage.src = grass;
      wallImage.src = wall;
      images.current.push(grassImage);
      images.current.push(wallImage);
      images.current.push(false);
      images.current.push(false);
      images.current[0].onload = () => {
        images.current[2] = true;
        setPlayer((e) => ({ ...e, images: 'first' }));
      };
      images.current[1].onload = () => {
        images.current[3] = true;
        setPlayer((e) => ({ ...e, images: 'second' }));
      };
      return;
    }
    if (!images.current[2] || !images.current[3]) {
      return;
    }
    if (!context.current) {
      context.current = canvas.current.getContext('2d');
    }

    requestAnimationFrame(() => {
      const ctx = context.current;
      const grassImage = images.current[0];
      const wallImage = images.current[1];
      const boxWidth = box.current.offsetWidth;
      const boxHeight = box.current.offsetHeight;
      const mapWidth = width;
      const mapHeight = height;
      ctx.clearRect(0, 0, boxWidth, boxHeight);

      layers[0].data.forEach((cell, i) => {
        console.log(i % 10);
        const bgPositionX =
          boxWidth / 2 -
          (mapWidth * tilewidth * 2) / 2 +
          (i % 10) * tilewidth * 2 -
          x;
        const bgPositionY =
          boxHeight / 2 -
          (mapHeight * tileheight * 2) / 2 +
          Math.floor(i / 10) * tileheight * 2 +
          y;
        // ctx.drawImage(grassImage, 32, 32, 32, 32, 32, 32, 32, 32);
        // console.log(tilewidth);
        // console.log(tileheight);
        if (cell < 65) {
          ctx.drawImage(
            grassImage,
            tilewidth * ((cell - 1) % 8),
            tileheight * Math.floor((cell - 1) / 8),
            tilewidth,
            tileheight,
            bgPositionX,
            bgPositionY,
            tilewidth * 2,
            tileheight * 2
          );
        } else {
          ctx.drawImage(
            wallImage,
            tilewidth * ((cell - 1 - 64) % 8),
            tileheight * Math.floor((cell - 1 - 64) / 8),
            tilewidth,
            tileheight,
            bgPositionX,
            bgPositionY,
            tilewidth * 2,
            tileheight * 2
          );
        }
      });

      // for (let i = 0; i < props.width; i++) {
      //   for (let j = 0; j < props.height; j++) {
      //     const bgPositionX =
      //       boxWidth / 2 -
      //       (props.width * props.chunk) / 2 +
      //       i * props.chunk -
      //       x;
      //     const bgPositionY =
      //       boxHeight / 2 -
      //       (props.height * props.chunk) / 2 +
      //       j * props.chunk +
      //       y;
      //     ctx.drawImage(
      //       bgImage,
      //       bgPositionX,
      //       bgPositionY,
      //       props.chunk,
      //       props.chunk
      //     );
      //   }
      // }

      const positionX = boxWidth / 2 - width / 2;
      const positionY = boxHeight / 2 - height / 2;
      ctx.drawImage(sprite, positionX, positionY, playerWidth, playerHeight);
    });
  }, [player, height, width, layers, tileheight, tilewidth]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setPlayer((e) => {
        return { ...e, x: e.x + e.xSpeed, y: e.y + e.ySpeed };
      });
    }, 10);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div ref={box} className={s.box}>
      <canvas ref={canvas} width={2000} height={2000}></canvas>
    </div>
  );
};

export { Map };

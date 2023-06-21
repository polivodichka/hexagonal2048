import { EDirection } from "../constants/EDirection";
import { ITile } from "../models/ITile";
import { AppDispatch, store } from "../store/store";
import { collapse } from "./collapseTiles";

export const shiftToEnd = (
  direction: EDirection,
  table: ITile[][],
  dispatch: AppDispatch
) => {
  const radius = store.getState().board.gameRadius;
  switch (direction) {
    case EDirection.top:
      table.forEach((tilesArray) => {
        const maxY = Math.min(radius - tilesArray[0].x, radius) - 1;
        const maxZ = -tilesArray[0].x - maxY;
        tilesArray.forEach((tile, i) => {
          tile.y !== maxY - i &&
            tile.z !== maxZ + i &&
            collapse(
              [[{ x: tile.x, y: maxY - i, z: maxZ + i, value: 0 }, tile]],
              dispatch,
              direction
            );
        });
      });
      break;
    case EDirection.bottom:
      table.forEach((tilesArray) => {
        const maxZ = Math.min(radius - tilesArray[0].x, radius) - 1;
        const maxY = -tilesArray[0].x - maxZ;
        tilesArray.forEach((tile, i) => {
          tile.y !== maxY - i &&
            tile.z !== maxZ + i &&
            collapse(
              [[{ x: tile.x, y: maxY + i, z: maxZ - i, value: 0 }, tile]],
              dispatch,
              direction
            );
        });
      });
      break;
    case EDirection.topLeft:
      table.forEach((tilesArray) => {
        const maxY = Math.min(radius - tilesArray[0].z, radius) - 1;
        const maxX = -tilesArray[0].z - maxY;
        tilesArray.forEach((tile, i) => {
          tile.y !== maxY - i &&
            tile.x !== maxX + i &&
            collapse(
              [[{ x: maxX + i, y: maxY - i, z: tile.z, value: 0 }, tile]],
              dispatch,
              direction
            );
        });
      });
      break;
    case EDirection.bottomRight:
      table.forEach((tilesArray) => {
        const maxX = Math.min(radius - tilesArray[0].z, radius) - 1;
        const maxY = -tilesArray[0].z - maxX;
        tilesArray.forEach((tile, i) => {
          tile.y !== maxY - i &&
            tile.x !== maxX + i &&
            collapse(
              [[{ x: maxX - i, y: maxY + i, z: tile.z, value: 0 }, tile]],
              dispatch,
              direction
            );
        });
      });
      break;
    case EDirection.topRight:
      table.forEach((tilesArray) => {
        const maxX = Math.min(radius - tilesArray[0].y, radius) - 1;
        const maxZ = -tilesArray[0].y - maxX;
        tilesArray.forEach((tile, i) => {
          tile.x !== maxX - i &&
            tile.z !== maxZ + i &&
            collapse(
              [[{ z: maxZ + i, x: maxX - i, y: tile.y, value: 0 }, tile]],
              dispatch,
              direction
            );
        });
      });
      break;
    case EDirection.bottomLeft:
      table.forEach((tilesArray) => {
        const maxZ = Math.min(radius - tilesArray[0].y, radius) - 1;
        const maxX = -tilesArray[0].y - maxZ;
        tilesArray.forEach((tile, i) => {
          tile.x !== maxX - i &&
            tile.z !== maxZ + i &&
            collapse(
              [[{ z: maxZ - i, x: maxX + i, y: tile.y, value: 0 }, tile]],
              dispatch,
              direction
            );
        });
      });
      break;
  }
};

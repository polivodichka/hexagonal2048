import { EDirection } from "../constants/EDirection";
import { ITile } from "../models/ITile";

export const sortTable = (table: ITile[][], direction: EDirection) => {
  switch (direction) {
    case EDirection.top:
      table.forEach((tilesArray) => {
        tilesArray.sort((a, b) => b.y - a.y);
      });
      break;
    case EDirection.bottom:
      table.forEach((tilesArray) => tilesArray.sort((a, b) => a.y - b.y));
      break;

    case EDirection.bottomRight:
      table.forEach((tilesArray) => {
        tilesArray.sort((a, b) => b.x - a.x);
      });
      break;
    case EDirection.topLeft:
      table.forEach((tilesArray) => tilesArray.sort((a, b) => a.x - b.x));
      break;

    case EDirection.bottomLeft:
      table.forEach((tilesArray) => {
        tilesArray.sort((a, b) => b.z - a.z);
      });
      break;
    case EDirection.topRight:
      table.forEach((tilesArray) => tilesArray.sort((a, b) => a.z - b.z));
      break;
  }
};

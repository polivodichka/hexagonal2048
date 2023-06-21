import { sqrt3, stroke, animationDuration } from "../constants/constants";
import { EDirection } from "../constants/EDirection";
import { ITile } from "../models/ITile";
import {
  updateTileValue,
  deleteTile,
  setNeedNewTiles,
  updateScore,
} from "../store/slice";
import { AppDispatch, store } from "../store/store";

export const collapse = (
  collapsePairs: ITile[][],
  dispatch: AppDispatch,
  direction: EDirection,
  additionMode = false
) => {
  const size = store.getState().board.tileSize;
  collapsePairs.forEach((pair) => {
    const [dest, src] = pair;
    if (dest.x === src.x && dest.y === src.y && dest.z === src.z) return;
    const tile = document.getElementById(`tile${src.x}${src.y}${src.z}`);
    switch (direction) {
      case EDirection.top:
      case EDirection.bottom:
        tile!.style.transform = `translateY(calc((${
          size * sqrt3 - stroke
        }px ) * ${
          Math.abs(src.y - dest.y) * (direction === EDirection.top ? -1 : 1)
        }) )`;
        dispatch(setNeedNewTiles(true));
        break;

      case EDirection.topLeft:
      case EDirection.bottomRight:
        tile!.style.transform = `translate(calc((${
          (3 / 2) * (size - stroke / 2)
        }px ) * ${
          Math.abs(src.y - dest.y) * (direction === EDirection.topLeft ? -1 : 1)
        }), calc((${(sqrt3 / 2) * (size - stroke / 2)}px ) * ${
          Math.abs(src.y - dest.y) * (direction === EDirection.topLeft ? -1 : 1)
        }) )`;
        dispatch(setNeedNewTiles(true));
        break;

      case EDirection.topRight:
      case EDirection.bottomLeft:
        tile!.style.transform = `translate(calc((${
          (3 / 2) * (size - stroke / 2)
        }px ) * ${
          Math.abs(src.x - dest.x) *
          (direction === EDirection.topRight ? 1 : -1)
        }), calc((${(sqrt3 / 2) * (size - stroke / 2)}px ) * ${
          Math.abs(src.x - dest.x) *
          (direction === EDirection.topRight ? -1 : 1)
        }) )`;
        dispatch(setNeedNewTiles(true));
        break;
    }

    setTimeout(() => {
      collapsePairs.forEach((pair) => {
        const [dest, src] = pair;
        additionMode && dispatch(updateScore(dest.value! + src.value!));
        dispatch(updateTileValue({ ...dest, value: dest.value! + src.value! }));
        dispatch(updateTileValue({ ...src, value: 0 }));
        dispatch(deleteTile({ ...src }));
      });
    }, animationDuration * 1000 + 0.1);
  });
};

export const setCollapsePairs = (table: ITile[][]) => {
  const collapsePairs = [];

  for (let i = 0; i < table.length; i++) {
    const tilesArray = table[i];
    if (tilesArray.length > 1)
      for (let j = 1; j < tilesArray.length; j++) {
        if (tilesArray[j].value === tilesArray[j - 1].value) {
          collapsePairs.push([tilesArray[j - 1], tilesArray[j]]);
          j++;
        }
      }
  }
  return collapsePairs;
};

import { createSlice } from "@reduxjs/toolkit";

import { maxTileValue } from "../constants/constants";
import { EGameStatus } from "../constants/EGameStatus";
import { checkGameStatus } from "../utils/checkGameStatus";
import { getCoordinates } from "../utils/getCoordinates";
import initialState from "./initial";

const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard(state, action) {
      state.coordinates = action.payload;
    },
    resetBoard(state) {
      state.coordinates = [];
      state.tiles = [];
    },

    updateTileValue(state, action) {
      const { x, y, z, value } = action.payload;
      const tile = state.tiles.find(
        (tile) => tile.x === x && tile.y === y && tile.z === z
      );
      const ceil = state.coordinates.find(
        (coordinate) =>
          coordinate.x === x && coordinate.y === y && coordinate.z === z
      );
      !tile && state.tiles.push(action.payload);
      tile && (tile.value = value);
      ceil && (ceil.value = value);
    },
    deleteTile(state, action) {
      const { x, y, z } = action.payload;
      const tile = state.tiles.find(
        (tile) => tile.x === x && tile.y === y && tile.z === z
      );
      const ceil = state.coordinates.find(
        (coordinate) =>
          coordinate.x === x && coordinate.y === y && coordinate.z === z
      );

      tile && state.tiles.splice(state.tiles.indexOf(tile), 1);
      ceil && (ceil.value = 0);
    },
    setNeedNewTiles(state, action) {
      state.needNewTiles = action.payload;
    },
    resetTileSize(state) {
      state.tileSize = 0;
    },

    disableKeyboard(state) {
      state.keyboard = false;
    },
    enableKeyboard(state) {
      state.keyboard = true;
    },

    setGameStatus(state, action) {
      state.gameStatus = action.payload;
    },

    updateScore(state, action) {
      state.score += action.payload;
    },
    resetScore(state) {
      state.score = 0;
    },

    updateGameRadius(state, action) {
      state.gameRadius = action.payload;
      state.tileSize =
        (document.documentElement.clientHeight * 0.35) /
        (2 * action.payload - 1);
    },

    restartGame(state) {
      state.tiles = [];
      state.restartFlag = !state.restartFlag;
      state.keyboard = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoordinates.fulfilled, (state, action) => {
      state.coordinates = action.payload;
      state.tiles = action.payload.filter((tile) => tile.value);
      state.gameStatus = checkGameStatus(state.coordinates, state.gameRadius)
        ? EGameStatus.Playing
        : EGameStatus.GameOver;
      if (
        Math.max(...state.tiles.map((tile) => tile.value ?? 0)) === maxTileValue
      ) {
        state.gameStatus = EGameStatus.Win;
      }
    });
  },
});

export const {
  setBoard,
  resetBoard,
  updateTileValue,
  deleteTile,
  disableKeyboard,
  enableKeyboard,
  setNeedNewTiles,
  setGameStatus,
  updateScore,
  updateGameRadius,
  resetTileSize,
  restartGame,
  resetScore,
} = BoardSlice.actions;
export default BoardSlice.reducer;

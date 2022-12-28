import { createSlice } from "@reduxjs/toolkit";
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
    disableKeyboard(state) {
      state.keyboard = false;
    },
    enableKeyboard(state) {
      state.keyboard = true;
    },
    setNeedNewTiles(state, action) {
      state.needNewTiles = action.payload;
    },
    setGameStatus(state, action) {
      state.gameStatus = action.payload;
    },
    updateScore(state, action) {
      state.score += action.payload;
    },
    updateGameRadius(state, action) {
      state.gameRadius = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoordinates.fulfilled, (state, action) => {
      state.coordinates = action.payload;
      state.tiles = action.payload.filter((tile) => tile.value);
      state.gameStatus = checkGameStatus(state.coordinates)
        ? EGameStatus.Playing
        : EGameStatus.GameOver;
    });
  },
});

export const {
  setBoard,
  updateTileValue,
  deleteTile,
  disableKeyboard,
  enableKeyboard,
  setNeedNewTiles,
  setGameStatus,
  updateScore,
  updateGameRadius,
} = BoardSlice.actions;
export default BoardSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITile } from "../models/ITile";
import { POST } from "../server/post";
import { store } from "../store/store";

export const getCoordinates = createAsyncThunk(
  "board/initBoard",
  async ({ radius, initial }: { radius: number; initial?: boolean }) => {
    const oldCoordinates = initial ? [] : store.getState().board.coordinates;
    const tiles = initial ? [] : store.getState().board.tiles;
    const coordinates: ITile[] = oldCoordinates ? [...oldCoordinates] : [];

    if (!oldCoordinates || !oldCoordinates.length) {
      for (let x = -radius + 1; x < radius; x++) {
        for (let y = -radius + 1; y < radius; y++) {
          for (let z = -radius + 1; z < radius; z++) {
            if (x + y + z === 0) coordinates.push({ x, y, z });
          }
        }
      }
    }

    const values: ITile[] = await POST(radius, tiles);
    values.forEach((value) => {
      const current = coordinates.find(
        (coordinate) =>
          coordinate.x === value.x &&
          coordinate.y === value.y &&
          coordinate.z === value.z
      );
      if (current) {
        const index = coordinates.indexOf(current);
        coordinates[index] = { ...value };
      }
    });
    return coordinates;
  }
);

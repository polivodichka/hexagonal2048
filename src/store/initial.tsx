import { EGameStatus } from "../constants/EGameStatus";
import { ITile } from "../models/ITile";

const initial: {
  coordinates: ITile[];
  tiles: ITile[];
  keyboard: boolean;
  needNewTiles: boolean;
  gameStatus: EGameStatus;
  score: number;
  stepsNumber: number;
  gameRadius: number;
  tileSize: number;
  restartFlag: boolean;
} = {
  coordinates: [],
  tiles: [],
  keyboard: true,
  needNewTiles: false,
  gameStatus: EGameStatus.Playing,
  score: 0,
  stepsNumber: 0,
  gameRadius: 2,
  tileSize: 0,
  restartFlag: false,
};
initial.tileSize =
  (document.documentElement.clientHeight * 0.35) / (2 * initial.gameRadius - 1);
export default initial;

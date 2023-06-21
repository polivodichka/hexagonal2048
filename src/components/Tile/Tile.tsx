import { useAppSelector } from "../../hooks/hooks";
import { ITile } from "../../models/ITile";
import { IsGameWin } from "../../utils/checkGameStatus";
import { TileStyled } from "./Tile.styled";

const Cell = ({ x, y, z, value }: ITile) => {
  const { size, gameStatus } = useAppSelector((state) => {
    return {
      size: state.board.tileSize,
      gameStatus: state.board.gameStatus,
    };
  });
  return (
    <TileStyled
      id={`tile${x}${y}${z}`}
      {...{ x, y, z, size }}
      value-data={value ?? 0}
      className={`tile${value} ${IsGameWin(gameStatus) && "hide"}`}
    >
      {value}
    </TileStyled>
  );
};

export default Cell;

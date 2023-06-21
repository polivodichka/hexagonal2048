import { useAppSelector } from "../../hooks/hooks";
import { IsGameOver, IsGameWin } from "../../utils/checkGameStatus";
import { GameStatusStyled } from "../GameStatus/GameStatus.styles";
import { BeeStyled } from "./Bee.styled";

const Bee = () => {
  const gameStatus = useAppSelector((state) => state.board.gameStatus);
  return (
    <GameStatusStyled>
      <BeeStyled
        className={`${IsGameOver(gameStatus) ? "moveOut" : "moveIn"} ${
          IsGameWin(gameStatus) && "winnerDance"
        }`}
      >
        <div className="bee">
          <div className="antennae"></div>
          <div className="wing one"></div>
          <div className="wing two"></div>
        </div>
        <div className="shadow"></div>
      </BeeStyled>
    </GameStatusStyled>
  );
};

export default Bee;

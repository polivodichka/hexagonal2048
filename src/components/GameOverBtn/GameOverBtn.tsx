import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resetScore, restartGame } from "../../store/slice";
import { IsGameOver } from "../../utils/checkGameStatus";
import { GameOverBtnStyled } from "./GameOverBtn.styled";

const GameOverBtn = () => {
  const gameStatus = useAppSelector((state) => state.board.gameStatus);
  const dispatch = useAppDispatch();
  return (
    <GameOverBtnStyled
      className={IsGameOver(gameStatus) ? "show" : ""}
      onClick={() => {
        dispatch(resetScore());
        dispatch(restartGame());
      }}
    >
      Restart
    </GameOverBtnStyled>
  );
};

export default GameOverBtn;

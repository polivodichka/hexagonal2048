import { useAppSelector } from "../../hooks/hooks";
import { GameStatusStyled } from "./GameStatus.styles";

const GameStatus = () => {
  const { gameStatus, score } = useAppSelector((state) => {
    return {
      gameStatus: state.board.gameStatus,
      score: state.board.score,
    };
  });
  return (
    <GameStatusStyled>
      <div>
        Game Status: <span data-status={gameStatus}>{gameStatus}</span>
      </div>
      <div>Score: {score}</div>
    </GameStatusStyled>
  );
};

export default GameStatus;

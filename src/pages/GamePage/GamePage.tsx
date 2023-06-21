import { useEffect, TouchEvent, useState } from "react";

import Bee from "../../components/Bee/Bee";
import Board from "../../components/Board/Board";
import Description from "../../components/Description/Description";
import GameOverBtn from "../../components/GameOverBtn/GameOverBtn";
import GameStatus from "../../components/GameStatus/GameStatus";
import LevelControl from "../../components/LevelControl/LevelControl";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateGameRadius } from "../../store/slice";
import { determineSwipeDirection } from "../../utils/determineSwipeDirection";
import { makeMove } from "../../utils/makeMove";
import { GamePageStyled, RawStyyled } from "./GamePage.styled";

const GamePage = () => {
  const [startSwipe, setStartSwipe] = useState<[number, number]>([0, 0]);

  const dispatch = useAppDispatch();
  const keyboardIsAble = useAppSelector((state) => state.board.keyboard);

  useEffect(() => {
    const urlRadius = +global.location.pathname.replace(/\D/g, "");
    dispatch(
      updateGameRadius(
        urlRadius ? urlRadius : global.location.pathname === "/" ? 2 : 0
      )
    );
  }, [dispatch]);

  const handleTouchStartEvent = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.changedTouches[0];
    setStartSwipe(() => [clientX, clientY]);
  };

  const handleTouchEndEvent = (e: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e.changedTouches[0];
    makeMove(
      determineSwipeDirection(startSwipe, [clientX, clientY]),
      keyboardIsAble,
      dispatch
    );
  };
  return (
    <GamePageStyled
      onTouchStart={handleTouchStartEvent}
      onTouchEnd={handleTouchEndEvent}
    >
      <RawStyyled>
        <GameOverBtn />
        <Bee />
        <GameStatus />
      </RawStyyled>
      <Board />
      <RawStyyled>
        <LevelControl />
        <Description message={"Help this little bee to clean the honeycomb"} />
      </RawStyyled>
    </GamePageStyled>
  );
};

export default GamePage;

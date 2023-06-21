import styled from "styled-components";

export const BoardStyled = styled.div.attrs(
  (props: { size: number; radius: number }) => props
)`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  clear: both;
`;

import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "../../shared/constants/colors";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${colors.background_primary};
`;

export const Board = styled.div`
  width: 800px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${colors.background_secondary};
  border-radius: 0.5rem;
  justify-content: flex-start;
  padding: 1rem 0;
  box-shadow: 10px 10px 15px 2px rgba(0, 0, 0, 0.2);
`;

export const Question = styled.p`
  font-size: 2rem;
  color: ${colors.text_highlight};
  margin: 0 auto;
`;

export const AnswerBoard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  margin: 2rem 0;
`;

export const Answer = styled.button<{ selected: boolean; right?: boolean }>`
  width: 45%;
  padding: 1rem 0;
  margin: 1rem 0;
  border: none;
  color: ${colors.text_primary};
  background-color: ${({ selected, right }) =>
    right !== undefined
      ? right
        ? colors.success
        : colors.error
      : selected
      ? colors.info
      : colors.background_secondary};
  border: 1px solid ${colors.info};
  cursor: pointer;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  transition: all 0.2s linear;
  :hover {
    background-color: ${colors.info};
  }
`;

export const CheckAnswer = styled.button<{ disabled: boolean }>`
  width: calc(100% - 2rem);
  padding: 1rem 0;
  margin: 0 1rem;
  border: none;
  color: ${colors.text_primary};
  background-color: ${({ disabled }) =>
    disabled ? "gray" : colors.background_secondary};
  border: 1px solid ${({ disabled }) => (disabled ? "gray" : colors.success)};
  border-radius: 0.5rem;
  transition: all 0.2s linear;
  font-size: 1.2rem;
  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
  :hover {
    background-color: ${({ disabled }) => (disabled ? "gray" : colors.success)};
  }
`;

export const HeaderContainer = styled.div`
  display: grid;
  grid-row: 1;
  grid-column: 1;
  grid-template-rows: min-content;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: ${colors.text_highlight};
  grid-column: 2;
  white-space: nowrap;
  text-align: center;
`;

export const NextQuestion = styled.button`
  width: 800px;
  padding: 1rem 0;
  margin: 1rem 0;
  border: none;
  color: ${colors.text_primary};
  background-color: ${colors.background_secondary};
  border: 1px solid ${colors.success};
  border-radius: 0.5rem;
  transition: all 0.2s linear;
  font-size: 1.2rem;
  cursor: pointer;
  :hover {
    background-color: ${colors.success};
  }
`;

export const EndGame = styled.div`
  width: 800px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: ${colors.background_secondary};
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  box-shadow: 10px 10px 15px 2px rgba(0, 0, 0, 0.2);
`;

export const EndGameText = styled.h1`
  color: ${colors.text_highlight};
  font-size: 1.4rem;
`;

export const EndGameSubText = styled.p`
  color: ${colors.text_primary};
  font-size: 1.2rem;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: ${colors.text_primary};
  :hover,
  :focus,
  :active {
    text-decoration: none;
    color: ${colors.text_highlight};
  }
  font-size: 1.1rem;
`;

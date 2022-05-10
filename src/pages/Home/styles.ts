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

export const Menu = styled.div`
  background-color: ${colors.background_secondary};
  width: 80%;
  max-width: 600px;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 10px 10px 15px 2px rgba(0, 0, 0, 0.2);
`;
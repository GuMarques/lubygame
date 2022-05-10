import styled from "styled-components";
import colors from "../../shared/constants/colors";

export const CoinContainer = styled.div`
  background-color: ${colors.background_secondary};
  box-shadow: 10px 10px 15px 2px rgba(0, 0, 0, 0.2);
  width: 60%;
  max-width: 200px;
  margin-left: auto;
  margin-right: 5%;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
`;

export const CoinImage = styled.img``;

export const CoinText = styled.p`
  color: ${colors.text_primary};
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  margin-left: 0.5rem;
`;

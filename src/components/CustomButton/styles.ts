import styled from "styled-components";
import colors from "../../shared/constants/colors";

export const CustomButton = styled.button`
  width: 80%;
  padding: 0.3rem;
  font-size: 1.2rem;
  background-color: ${colors.background_secondary};
  color: ${colors.text_primary};
  transition: all 0.2s linear;
  border: 1px solid ${colors.success};
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  :hover {
    background-color: ${colors.success};
  }
  margin: 0.5rem 0;
  cursor: pointer;
`;

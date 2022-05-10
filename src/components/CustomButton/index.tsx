import { FC } from "react";
import React from "react";
import { CustomButton as Button } from "./styles";

interface CustomButtonProps {
  handleClick: () => void;
  text: string;
}

const CustomButton: FC<CustomButtonProps> = ({ handleClick, text }) => {
  return <Button onClick={handleClick}>{text}</Button>;
};

export default CustomButton;

import React, { useState, FC, useEffect, useContext } from "react";
import {
  Answer,
  AnswerBoard,
  Board,
  CheckAnswer,
  Container,
  CustomLink,
  EndGame,
  EndGameSubText,
  EndGameText,
  HeaderContainer,
  NextQuestion,
  Question,
  Title,
} from "./styles";
import { questions } from "../../shared/questions.json";
import AppContext from "../../context/appContext";
import convertLbc from "../../shared/utils/convertLBC";
import CoinVisualizer from "../../components/CoinVisualizer";
import LubyContract from "../../shared/utils/lubyContract";

const Game: FC = () => {
  const context = useContext(AppContext);
  const { account, contract, handleNotification, handleUpdateCoin } = context;
  const [game, setGame] = useState<LubyContract>();

  useEffect(() => {
    if (account && contract) {
      setGame(new LubyContract(account, contract));
    }
  }, [account, contract]);

  useEffect(() => {
    if (game && account) {
      game.setAccount(account);
    }
  }, [account]);

  const [selected, setSelected] = useState<string>();
  const [right, setRight] = useState<string>();
  const [question, setQuestion] = useState<string>();
  const [answers, setAnswers] = useState<string[]>();
  const [index, setIndex] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);

  useEffect(() => {
    setRight(undefined);
    setQuestion(questions[index].question);
    setAnswers(questions[index].answers);
  }, [index]);

  const handleSelectAnswer = (option: "a" | "b" | "c" | "d") => {
    if (selected === option) {
      setSelected("");
    } else {
      setSelected(option);
    }
  };

  const correctAnswer = async () => {
    if (game && handleUpdateCoin && handleNotification)
      game
        .correctAnswer()
        .then(() => {
          setRight(questions[index].correctAnswer);
          handleUpdateCoin();
          handleNotification({ text: "Certa Resposta!", type: "success" });
          setSelected(undefined);
          setRightAnswers((prevState) => ++prevState);
        })
        .catch(console.log);
  };

  const incorrectAnswer = async () => {
    if (game && handleUpdateCoin && handleNotification)
      game
        .incorrectAnswer()
        .then(() => {
          setRight(questions[index].correctAnswer);
          handleUpdateCoin!();
          handleNotification!({ text: "Resposta Errada", type: "error" });
          setSelected(undefined);
        })
        .catch(console.log);
  };

  const handleCheckAnswer = () => {
    if (!right) {
      if (selected === questions[index].correctAnswer) {
        correctAnswer();
      } else {
        incorrectAnswer();
      }
    }
  };

  const handleNextQuestion = () => {
    setIndex((prevState) => ++prevState);
  };
  return (
    <Container>
      <HeaderContainer>
        <Title>Valendo 0.5 LBC</Title>
        <CoinVisualizer />
      </HeaderContainer>
      {index !== 10 && (
        <Board>
          <Question>{question}</Question>
          <AnswerBoard>
            <Answer
              selected={selected === "a"}
              onClick={() => handleSelectAnswer("a")}
              right={right === undefined ? undefined : right === "a"}
              disabled={right !== undefined ? true : false}
            >
              {answers ? answers[0] : ""}
            </Answer>
            <Answer
              selected={selected === "b"}
              onClick={() => handleSelectAnswer("b")}
              right={right === undefined ? undefined : right === "b"}
              disabled={right !== undefined ? true : false}
            >
              {answers ? answers[1] : ""}
            </Answer>
            <Answer
              selected={selected === "c"}
              onClick={() => handleSelectAnswer("c")}
              right={right === undefined ? undefined : right === "c"}
              disabled={right !== undefined ? true : false}
            >
              {answers ? answers[2] : ""}
            </Answer>
            <Answer
              selected={selected === "d"}
              onClick={() => handleSelectAnswer("d")}
              right={right === undefined ? undefined : right === "d"}
              disabled={right !== undefined ? true : false}
            >
              {answers ? answers[3] : ""}
            </Answer>
          </AnswerBoard>
          <CheckAnswer
            onClick={handleCheckAnswer}
            disabled={selected ? false : true}
          >
            Check Answer
          </CheckAnswer>
        </Board>
      )}
      {right && index < 9 && (
        <NextQuestion onClick={handleNextQuestion}>
          Proxima Questão
        </NextQuestion>
      )}
      {right && index === 9 && (
        <NextQuestion onClick={handleNextQuestion}>Ver Resultado</NextQuestion>
      )}
      {index === 10 && (
        <EndGame>
          <EndGameText>Você finalizou o quiz!</EndGameText>
          <EndGameSubText>Acertos: {rightAnswers}/10</EndGameSubText>
          <CustomLink to="/">Voltar a tela inicial</CustomLink>
        </EndGame>
      )}
    </Container>
  );
};

export default Game;

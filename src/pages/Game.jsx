import { useEffect, useState } from "react";
import { StartScreen } from "../components/StartScreen";
import { QuestionCard } from "../components/QuestionCard";
import { GameOver } from "../components/GameOver";
import { Header } from "../components/Header";
import { Navigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";
import { Navbar } from "../components/Navbar";

export const Game = () => {
  const [data, setData] = useState([]);
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        // console.log(res);
        setData(res.data.results);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

  const handleStart = () => {
    setGameState("playing");
    setScore(0);
    setTimeLeft(60);
    setAnsweredCount(0);
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    if (timeLeft === 0) {
      setGameState("end");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex justify-center p-6 pt-24 bg-gray-100">
        <div className="w-full max-w-3xl">
          <Header />
          <div>
            {gameState === "start" && <StartScreen onStart={handleStart} />}
            {gameState === "playing" && (
              <QuestionCard
                data={data}
                setScore={setScore}
                setGameState={setGameState}
                timeLeft={timeLeft}
                setAnsweredCount={setAnsweredCount}
              />
            )}
            {gameState === "end" && (
              <GameOver
                data={data}
                score={score}
                onStart={handleStart}
                answeredCount={answeredCount}
                setGameState={setGameState}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import he from "he";

export const QuestionCard = ({ data, setScore, setGameState, timeLeft, setAnsweredCount }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const widthTimer = (timeLeft / 60) * 100;

  useEffect(() => {
    if (data.length > 0) {
      const currentQuestion = data[index];

      const allAnswers = [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ];

      const shuffled = [...allAnswers].sort(() => Math.random() - 0.5);

      setAnswers(shuffled);
    }
  }, [data, index]);

  const handleContinue = () => {
    if (index < data.length - 1) {
      setIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameState("end");
    }
  };

  const currentQuestion = data[index];

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    setAnsweredCount((prev) => prev + 1);
    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === data[index].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  if (!data.length) return <p className="text-center text-xl text-gray-400 font-bold tracking-widest mt-10">Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-4 bg-gray-300 rounded-full">
        <div
          className="rounded-full h-full bg-linear-to-br from-[#53c1de] to-[#0290B8] text-[#00041f] transition-all duration-1000"
          style={{ width: `${widthTimer}%`, transition: "width 1s linear", }}
        ></div>
      </div>
      <div className="w-full rounded-lg p-8 border-2 border-[#53c1de]">
        <div className="flex justify-center -translate-y-16">
        </div>
        <div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-white bg-[#0290B8] py-1 px-3 rounded-md">
              Question {index + 1} of {data.length}
            </p>
            <p className="text-white bg-[#0290B8] py-1 px-6 rounded-md">{timeLeft}</p>
          </div>
          <h2 className="text-lg text-slate-700 font-semibold mt-8 mb-6">
            {he.decode(currentQuestion.question)}
          </h2>
          <ul className="flex flex-col gap-2 mt-2 font-semibold text-sm">
            {answers.map((answer, answerIndex) => (
              <li key={answerIndex}>
                <button
                  onClick={() => handleAnswerClick(answer)}
                  disabled={isAnswered}
                  className={`w-full py-2.5 px-4 rounded-md text-start cursor-pointer
                    ${
                      isAnswered
                        ? answer === currentQuestion.correct_answer
                          ? "bg-green-500"
                          : answer === selectedAnswer
                            ? "bg-red-500"
                            : "bg-blue-400 opacity-50"
                        : "bg-gray-300 hover:bg-[#53c1de]"
                    }
                  `}
                >
                  {he.decode(answer)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={handleContinue}
        disabled={!selectedAnswer}
        className="w-full p-2 bg-linear-to-br from-[#53c1de] to-[#0290B8] text-white font-semibold flex justify-center rounded-full cursor-pointer hover:scale-95 transition"
      >
        Continue
      </button>
    </div>
  );
};

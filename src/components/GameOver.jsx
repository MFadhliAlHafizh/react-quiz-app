export const GameOver = ({ data, score, onStart, answeredCount, setGameState }) => {
  return (
    <div className="text-center">
      <div>
        <div className="w-44 mb-8 mx-auto">
          <img
            src="game-over-image.png"
            alt="Game Over Image"
            className="w-full"
          />
        </div>
        <h2 className="text-2xl text-slate-700 tracking-widest font-bold mt-2">
          Game Over!
        </h2>
        <p className="text-gray-500 mt-1">
          You answered {answeredCount} out of {data.length} questions.
        </p>
      </div>
      <div className="my-8">
        <p className="text-slate-700 tracking-widest">YOUR SCORE</p>
        <h2 className="text-2xl text-slate-700 font-bold tracking-widest mt-2">
          <span className="text-[#0290B8]">{score}</span>/10
        </h2>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onStart}
          className="w-40 p-2 rounded-full bg-linear-to-br from-[#53c1de] to-[#0290B8] text-white cursor-pointer font-semibold hover:scale-95 transition"
        >
          Restart
        </button>
        <button
          onClick={() => setGameState("start")}
          className="w-40 p-2 rounded-full border border-[#0290B8] text-[#0290B8] cursor-pointer font-semibold hover:bg-[#0290B8] hover:text-white transition"
        >
          Home
        </button>
      </div>
    </div>
  );
};

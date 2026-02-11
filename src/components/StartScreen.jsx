export const StartScreen = ({ onStart }) => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg text-slate-700 tracking-widest">Welcome to React Quiz App!</h2>
        <div className="w-32 mx-auto my-2">
          <img src="start-screen-image.png" alt="Start Screen Image" className="w-full" />
        </div>
        <p className="text-lg text-slate-700 tracking-widest">Wanna Chalenge your knowledge?</p>
      </div>
      <div className="mt-8">
        <button onClick={onStart} className="w-52 p-2 rounded-full bg-linear-to-br from-[#53c1de] to-[#0290B8] text-white cursor-pointer font-semibold hover:scale-95 transition">Let's Start</button>
      </div>
    </div>
  );
};

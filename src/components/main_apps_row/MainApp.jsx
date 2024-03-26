export default function MainApp({ src, name }) {
  return (
    <div className="flex flex-col justify-center items-center transition text-center cursor-pointer hover:scale-105">
      <div className="bg-bg_light w-20 h-20 rounded-xl flex justify-center items-center overflow-hidden">
        <img src={src} alt="app logo" className="w-full" />
      </div>
      <p className="mt-1.5 text-bg_light text-xs">{name}</p>
    </div>
  );
}

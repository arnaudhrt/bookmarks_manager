export default function AppButton({ id, src, href, name }) {
  return (
    <a href={href} id={id}>
      <div className="flex flex-col justify-center items-center transition text-center cursor-pointer hover:scale-105">
        <div className={`bg-app_bg border border-card-foreground/20 shadow-md w-16 h-16 rounded-xl flex justify-center items-center overflow-hidden`}>
          <img src={src} alt="app logo" className="w-full p-2 rounded-2xl " />
        </div>
        <p className="mt-1.5 text-xs">{name}</p>
      </div>
    </a>
  );
}

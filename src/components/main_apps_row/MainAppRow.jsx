import MainApp from "./MainApp";

export default function MainAppRow() {
  return (
    <div className="mt-12 flex justify-center items-center gap-10">
      <MainApp
        src="https://static.vecteezy.com/system/resources/previews/017/395/388/non_2x/pinterest-mobile-apps-icon-free-png.png"
        name="Pinterest"
      />
      <MainApp src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" name="LinkedIn" />
      <MainApp src="https://play-lh.googleusercontent.com/KSuaRLiI_FlDP8cM4MzJ23ml3og5Hxb9AapaGTMZ2GgR103mvJ3AAnoOFz1yheeQBBI" name="Gmail" />
      <MainApp src="https://play-lh.googleusercontent.com/kCKeckQNFF9P2470x4lF9v3OW_ZZtvk1SIo9RmvJDa6WtBboqfzyefEZ2_rwWRYgM_M" name="CoinMarketCap" />
      <MainApp src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" name="Netflix" />
      <MainApp
        src="https://static.vecteezy.com/system/resources/previews/017/395/388/non_2x/pinterest-mobile-apps-icon-free-png.png"
        name="Pinterest"
      />
    </div>
  );
}

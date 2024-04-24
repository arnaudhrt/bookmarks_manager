import logo from "../../assets/logo.png";

export default function LogoBlock() {
  return (
    <div className="flex justify-center items-center gap-3">
      <div className="rounded-md">
        <img src={logo} alt="" className="w-full" />
      </div>
      <p className="tx-lg font-bold tracking-[8px]">MARKER</p>
    </div>
  );
}

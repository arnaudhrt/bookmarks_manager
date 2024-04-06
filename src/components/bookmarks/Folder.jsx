import { CiFolderOn } from "react-icons/ci";
export default function Folder({ name, counter, selected, onClick, onContextMenu }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-accent cursor-pointer ${selected} `}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <div className="grow flex items-center gap-2">
        <CiFolderOn className="h-5 w-5" />
        <div>{name}</div>
      </div>
      <span>{counter}</span>
    </div>
  );
}

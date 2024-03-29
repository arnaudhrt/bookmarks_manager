export default function Button({ id, handleClick, selectedButton, children }) {
  const isOpen = id === selectedButton;
  return (
    <button
      onClick={() => handleClick(id)}
      className={`py-1 px-7 border border-border_color rounded-xl shadow-md shadow-white/10 text-xs cursor-pointer  hover:bg-bg_light hover:text-black transition  ${
        isOpen ? "bg-bg_light text-black" : "bg-bg_light/10 text-bg_light"
      }`}
    >
      {children}
    </button>
  );
}

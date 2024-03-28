export default function Button({ id, handleClick, selectedButton, children }) {
  const isOpen = id === selectedButton;
  return (
    <button
      onClick={() => handleClick(id)}
      className={`py-1.5 px-8 border border-border rounded-full text-xs cursor-pointer  hover:bg-bg_light hover:text-black transition shadow ${
        isOpen ? "bg-bg_light text-black" : "bg-bg_light/10 text-bg_light"
      }`}
    >
      {children}
    </button>
  );
}

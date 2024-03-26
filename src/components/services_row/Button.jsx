export default function Button(props) {
  return (
    <button className="py-1.5 px-8 border border-border bg-bg_light/10 rounded-full text-xs cursor-pointer text-bg_light hover:bg-bg_light hover:text-black transition shadow">
      {props.children}
    </button>
  );
}

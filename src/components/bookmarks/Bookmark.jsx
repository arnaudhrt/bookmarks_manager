export default function Bookmark({ url, name, description, icon }) {
  return (
    <a href={url} className="flex gap-5 hover:bg-accent rounded-sm px-5 py-4" draggable>
      <div className="flex w-12 h-12 bg-white border border-card-foreground/20 rounded-sm p-1">
        <img src={icon} alt="icon bookmark" className="rounded-sm" />
      </div>
      <div>
        <h3 className="text-md font-medium mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  );
}

export default function AppButton({ id, src, href, name, index, draggedApp, setDragging, dragging, userApps, setUserApps, setDraggedApp }) {
  const handleDragStart = () => {
    setDraggedApp(userApps[index]);
    setTimeout(() => {
      setDragging(name);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(null);
  };

  const handleDragEnter = () => {
    if (draggedApp === null) {
      return;
    }
    setUserApps((prev) => {
      if (draggedApp.index === index) {
        return [...prev];
      }
      prev.splice(draggedApp.index, 1);
      prev.splice(index, 0, draggedApp);
      prev.forEach((folder, index) => {
        folder.index = index;
      });
      return [...prev];
    });
  };
  return (
    <a href={href} id={id}>
      <div
        className={`flex flex-col justify-center items-center transition text-center cursor-pointer hover:scale-105 ${
          dragging === name ? "opacity-0" : ""
        }`}
        draggable
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragEnter={(e) => {
          handleDragEnter(e);
        }}
      >
        <div className={`bg-app_bg border border-card-foreground/20 shadow-md w-16 h-16 rounded-xl flex justify-center items-center overflow-hidden`}>
          <img src={src} alt="app logo" className="w-full p-2 rounded-2xl " draggable={false} />
        </div>
        <p className="mt-1.5 text-xs">{name}</p>
      </div>
    </a>
  );
}

import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { servicesLinks } from "../../utils/servicesLinks";

export default function ServicesButtons() {
  const popupRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const handleClick = (id) => {
    setSelectedButton(id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedButton(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-5 flex justify-center gap-4 relative">
      {servicesLinks.map((service) => (
        <Button key={service.id} id={service.id} handleClick={handleClick} selectedButton={selectedButton}>
          {service.name}
        </Button>
      ))}
      <div
        ref={popupRef}
        className={`absolute top-full mt-4 left-0 right-0 h-[600px] bg-white rounded-3xl overflow-hidden border border-border ${
          selectedButton ? "" : "hidden"
        }`}
      >
        <iframe
          src={selectedButton ? servicesLinks.find((link) => link.id === selectedButton).url : ""}
          title="text/html"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}

import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { servicesLinks } from "../../utils/servicesLinks";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoPlus } from "react-icons/go";

export default function ServicesButtons() {
  const popupRef = useRef(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedServices, setSelectedServices] = useState(() => {
    // Try to load the selection from localStorage
    const savedServices = localStorage.getItem("selectedServices");
    return savedServices ? JSON.parse(savedServices) : servicesLinks.slice(0, 4);
  });

  const handleServiceChange = (service, isChecked) => {
    if (isChecked) {
      setSelectedServices((prevServices) => [...prevServices, service]);
    } else {
      setSelectedServices((prevServices) => prevServices.filter((s) => s.id !== service.id));
    }
  };
  useEffect(() => {
    // Save the selection to localStorage whenever it changes
    localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
    console.log(selectedServices);
  }, [selectedServices]);

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
    <div className="flex justify-center relative items-center">
      <div className="mt-2 flex justify-center gap-4 flex-wrap max-w-[900px] mx-auto">
        {selectedServices.map((service) => (
          <Button key={service.id} id={service.id} handleClick={handleClick} selectedButton={selectedButton}>
            <span className="text-[10px]">{service.name}</span>
          </Button>
        ))}

        <Popover>
          <PopoverTrigger className="absolute top-2 right-0">
            <button className="py-1 px-2 bg-bg_light/10 text-bg_light border border-border_color rounded-xl shadow-md shadow-white/10 text-xs cursor-pointer hover:bg-bg_light hover:text-black transition  ">
              <GoPlus className="text-sm" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className=" bg-bg_input border border-border_color rounded-xl">
            <p className="text-white text-sm px-2.5 py-3 medium">Add Services</p>
            <Separator className="mb-2" />
            {servicesLinks.map((el) => {
              return (
                <div key={el.id} className=" flex items-center text-white text-xs hover:bg-hover_color rounded-lg">
                  <Label htmlFor={el.id} className="px-2.5 py-2.5 cursor-pointer grow">
                    {el.name}
                  </Label>
                  <Checkbox
                    id={el.id}
                    checked={selectedServices.some((s) => s.id === el.id)}
                    onCheckedChange={(checked) => handleServiceChange(el, checked)}
                  />
                </div>
              );
            })}
          </PopoverContent>
        </Popover>

        <div
          ref={popupRef}
          className={`absolute top-full mt-4 left-0 right-0 h-[600px] bg-white rounded-3xl overflow-hidden border border-border_color ${
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
    </div>
  );
}

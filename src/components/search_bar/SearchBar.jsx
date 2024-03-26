import google from "../../assets/google.png";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { googleGetRequest } from "../../api/google_api";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // API CALL TO GET SEARCH SUGGESTIONS
  useEffect(() => {
    if (searchValue) {
      googleGetRequest(searchValue).then((res) => {
        console.log(res);
        setSearchResult(res[1]);
      });
    } else {
      setSearchResult([]);
    }
  }, [searchValue]);

  // FUNCTION THAT DECODE ACCENTS AND SPECIAL CHARACTERS
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  // FUNCTION THAT DELETE HTML TAGS IN API RESPONSE
  const renderTextWithoutBoldTags = (text) => {
    const decodedText = decodeHtmlEntities(text);
    const textWithoutBoldTags = decodedText.replace(/<\/?b>/g, "");
    return textWithoutBoldTags;
  };

  return (
    <div className="mt-24 flex justify-center flex-col items-center">
      {/* GOOGLE IMAGE */}
      <div className="max-w-48 mb-10">
        <img src={google} alt="google logo" className="w-full" />
      </div>
      {/* GOOGLE SEARCH BAR WITH SUGGESTIONS */}
      <Combobox
        value={searchValue}
        onChange={setSearchValue}
        as="div"
        className="max-w-2xl w-full rounded-3xl transition  bg-bg_input overflow-hidden"
      >
        {/* SEARCH INPUT */}
        <div className="relative">
          <IoIosSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-lg text-border" />
          <Combobox.Input
            className="w-full py-3 px-12 rounded-full text-bg_light bg-bg_dark border border-border focus:bg-bg_input hover:bg-bg_input hover:border-bg_input focus:border-bg_input"
            onChange={(event) => setSearchValue(event.target.value)}
            displayValue={searchValue}
          />
          <IoClose
            className={`absolute top-1/2 right-5 -translate-y-1/2 text-border text-2xl cursor-pointer ${!searchValue ? "hidden" : ""}`}
            onClick={() => setSearchValue("")}
          />
        </div>
        {/* SEARCH OPTIONS */}
        {searchResult.length > 0 && (
          <Combobox.Options className=" ">
            <div className="w-4/5 h-px bg-border mb-1 mx-auto "></div>
            <Combobox.Option value={searchValue}></Combobox.Option>
            {searchResult.map((result, index) => (
              <Combobox.Option key={index} value={renderTextWithoutBoldTags(result[0])} className="text-bg_light cursor-pointer">
                {({ active }) => (
                  <div className={`transition w-full py-1.5 px-5 flex items-center gap-3 hover:bg-hover_color ${active ? "bg-hover_color" : ""}`}>
                    <IoIosSearch className="text-border text-lg" />
                    <span className="grow first-letter:uppercase">{renderTextWithoutBoldTags(result[0])}</span>
                  </div>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  );
}

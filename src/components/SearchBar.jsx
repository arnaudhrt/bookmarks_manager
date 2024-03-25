import google from "../assets/google.png";
import "./search_bar.css";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="search_container">
      <div className="google_logo_block">
        <img src={google} alt="google logo" />
      </div>
      <div className="search_bar_block">
        <div className="search_bar">
          <IoIosSearch className="search_icon" />
          <input type="text" className="search_input" />
          <IoClose className="close_icon" />
        </div>
        <div className="search_result"></div>
      </div>
    </div>
  );
}

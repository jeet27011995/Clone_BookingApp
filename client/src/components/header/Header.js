import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCar,
  faTaxi,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contextApi/SearchContext";
import { AuthContext } from "../../contextApi/AuthSearchContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOtions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItems active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rentals</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItems">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            {" "}
            <h1 className="headerTitle">
              {" "}
              A Lifetime of discounts? Its a genius{" "}
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free TrivagoBooking account
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                    dates[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenOtions(!openOptions);
                  }}
                >{`${options.adult} Adult ${options.children} Children ${options.room} Room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <div className="optionCounter">
                        <span className="optionText">Adult</span>
                        <button
                          class="optionCounterButton"
                          onClick={() => {
                            handleOption("adult", "i");
                          }}
                        >
                          +
                        </button>
                        <span class="optionCounterNumber">{options.adult}</span>
                        <button
                          disabled={options.adult <= 0}
                          class="optionCounterButton"
                          onClick={() => {
                            handleOption("adult", "d");
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div className="optionCounter">
                        <span className="optionText">Children</span>
                        <button
                          class="optionCounterButton"
                          onClick={() => {
                            handleOption("children", "i");
                          }}
                        >
                          +
                        </button>
                        <span class="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          disabled={options.children <= 0}
                          class="optionCounterButton"
                          onClick={() => {
                            handleOption("children", "d");
                          }}
                        >
                          -
                        </button>
                      </div>

                      <div className="optionCounter">
                        <span className="optionText">Room</span>
                        <button
                          class="optionCounterButton"
                          onClick={() => {
                            handleOption("room", "i");
                          }}
                        >
                          +
                        </button>
                        <span class="optionCounterNumber">{options.room}</span>
                        <button
                          disabled={options.room <= 0}
                          class="optionCounterButton"
                          onClick={() => {
                            handleOption("room", "d");
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

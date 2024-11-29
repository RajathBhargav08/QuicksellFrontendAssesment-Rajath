import React, { useEffect, useState } from "react";
import { TiThList } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../../Actions/DataAction";
import "./NavBar.css";

// Retrieve values from localStorage or set defaults
const getOrder = () => localStorage.getItem("order") || "priority";
const getGroup = () => localStorage.getItem("group") || "status";

const NavBar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());

  // Handle changes in group or order
  const handleGroupValue = (e, isGroup) => {
    const { value } = e.target;
    
    if (isGroup) {
      setGroupValue(value);
      localStorage.setItem("group", value);
    } else {
      setOrderValue(value);
      localStorage.setItem("order", value);
    }
    setDisplayOnClick(!displayOnClick);  // Toggle the display state
  };

  // Dispatch data based on group and order
  useEffect(() => {
    const dataToDispatch = groupValue === "user" ? { allTickets, allUser } : allTickets;
    dispatch(selectData(groupValue, dataToDispatch, orderValue));
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  return (
    <div className="top-header">
      <div className="displayButton">
        <button
          className="p-10 f-16 btn"
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <TiThList /> Display
        </button>

        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span className="label">Grouping</span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span className="label">Ordering</span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

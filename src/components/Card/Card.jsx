import React from "react";
import "./Card.css";
import { FaRegCircle } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { BsCheckCircleFill, BsFillExclamationSquareFill } from "react-icons/bs";

const Card = ({ id, title, tag, status, priority }) => {
  const isStatusGroup = localStorage.getItem("group") === "status";
  const isPriorityGroup = localStorage.getItem("group") === "priority";

  const statusHierarchy = ['Backlog', 'Todo', 'In progress', 'Done'];

  const getStatusIndex = (status) => {
    return statusHierarchy.indexOf(status);
  };

  return (
    <div className="cardContainer flex-gap-10" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span style={{ textTransform: "uppercase" }} className="color-grey">
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "30px", height: "30px" }}
        >
          <img
            style={{ width: "95%", height: "95%", borderRadius: "50%" }}
            src="data:image/jpeg;base64,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"
            alt="Profile"
          />
        </div>
      </div>
      <div className="cardDetails">
        <h4>{title}</h4>
        <div className="flex-gap-10">
          <div>
            {isStatusGroup ? (
              <div
                className="statusCard flex-gap-10"
                style={{ justifyContent: "space-between" }}
              >
                <span>{status}</span>
                <div>
                  {getStatusIndex(status) === 0 && <FaRegCircle />}
                  {getStatusIndex(status) === 1 && <BiLoader />}
                  {getStatusIndex(status) === 2 && <BiAdjust />}
                  {getStatusIndex(status) === 3 && <BsCheckCircleFill />}
                </div>
              </div>
            ) : (
              <div
                className="priorityCard flex-gap-10"
                style={{ justifyContent: "space-between" }}
              >
                <span>{priority}</span>
                <div>
                  {priority === "low" && <FaRegCircle />}
                  {priority === "medium" && <BsFillExclamationSquareFill />}
                  {priority === "high" && <IoMdCloseCircleOutline />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

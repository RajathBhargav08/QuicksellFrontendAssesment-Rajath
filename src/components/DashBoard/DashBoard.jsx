import { React } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { DiCodeigniter } from "react-icons/di";
import {
  BsCheckCircleFill,
  BsFillExclamationSquareFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import "./DashBoard.css";
import Card from "../Card/Card";

const DashBoard = () => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Backlog":
        return <BiLoader style={{ fontSize: "13px" }} />;
      case "Todo":
        return <FaRegCircle style={{ fontSize: "13px", color: "#ddeded" }} />;
      case "In progress":
        return <BiAdjust style={{ fontSize: "13px", color: "#f2d750" }} />;
      case "Done":
        return <BsCheckCircleFill />;
      default:
        return <IoMdCloseCircleOutline />;
    }
  };

  const renderPriorityIcon = (priority) => {
    switch (priority) {
      case "Low":
      case "Medium":
      case "High":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-signal"
            viewBox="0 0 16 16"
          >
            <rect x="1" y="10" width="3" height="2" />
            <rect
              x="5"
              y="7"
              width="3"
              height="5"
              opacity={priority === "Medium" || priority === "High" ? 1 : 0.25}
            />
            <rect
              x="9"
              y="4"
              width="3"
              height="8"
              opacity={priority === "High" ? 1 : 0.25}
            />
          </svg>
        );
      case "Urgent":
        return <BsFillExclamationSquareFill />;
      default:
        return null;
    }
  };

  return (
    selectedData && (
      <div
        className="dashContainer"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {selectedData.map((element, index) => {
          const cardWidthPercentage = 18.7;
          return (
            <div
              key={index}
              className="dashCardContainer"
              style={{ width: `${cardWidthPercentage}%` }}
            >
              <div className="dashCardHeading flex-sb">
                <div className="leftView">
                  {user ? (
                    <div className="imageContainer relative" style={{ width: "10px", height: "15px" }}></div>
                  ) : isStatus ? (
                    <div className="cardTitle" style={{ fontWeight: 200 }}>
                      {renderStatusIcon(element.title)}
                    </div>
                  ) : isPriority ? (
                    <div className="tags color-grey" style={{ width: "35px", height: "30px" }}>
                      {renderPriorityIcon(element.title)}
                    </div>
                  ) : (
                    <DiCodeigniter />
                  )}
                  <span>{element.title} {element.value?.length}</span>
                </div>
                <div className="rightView">
                  <AiOutlinePlus /> <span style={{ letterSpacing: "2px" }}>...</span>
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {element.value?.map((el, ind) => (
                  <Card
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    tag={el.tag}
                    status={el.status}
                    priority={el.priority}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {isStatus && (
          <>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "90px" }}>
                <BsFillCheckCircleFill style={{ color: "blue" }} />
                <span>Done</span>
                <span style={{ color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <AiOutlinePlus /> <span>...</span>
              </div>
            </div>
            <div className="dashCardHeading flex-sb">
              <div className="leftView" style={{ fontSize: "15px", marginRight: "60px" }}>
                <MdCancel style={{ color: "grey" }} />
                <span>Canceled</span>
                <span style={{ color: "#8F9997" }}>0</span>
              </div>
              <div className="rightView">
                <AiOutlinePlus /> <span>...</span>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};

export default DashBoard;

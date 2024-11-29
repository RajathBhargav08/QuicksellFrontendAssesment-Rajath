import axios from "axios";
import Card from "../components/Card/Card";

// Define action types as constants
const DATA_REQUEST = "DATA_REQUEST";
const DATA_SUCCESS = "DATA_SUCCESS";
const DATA_FAILURE = "DATA_FAILURE";
const SELECT_DATA_REQUEST = "SELECT_DATA_REQUEST";
const SELECT_DATA_SUCCESS = "SELECT_DATA_SUCCESS";
const SELECT_DATA_FAILURE = "SELECT_DATA_FAILURE";

// Fetch all data
export const fetchAllData = () => async (dispatch) => {
  dispatch({ type: DATA_REQUEST });
  try {
    const response = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );
    dispatch({ type: DATA_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: DATA_FAILURE, payload: error.message });
  }
};

// Select and organize data
export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  dispatch({ type: SELECT_DATA_REQUEST });
  try {
    let isUserGroup = false;
    const uniqueItems = new Set();
    let groupData = [];
    let selectedData = [];

    // Grouping logic based on the selected group
    if (group === "status") {
      allTickets.forEach((ticket) => uniqueItems.add(ticket.status));
      groupData = Array.from(uniqueItems);

      selectedData = groupData.map((status, index) => {
        const ticketsByStatus = allTickets.filter((ticket) => ticket.status === status);
        return {
          [index]: {
            title: status,
            value: ticketsByStatus,
          },
        };
      });
    } else if (group === "user") {
      isUserGroup = true;
      allTickets?.allUser?.forEach((user, index) => {
        const userTickets = allTickets?.allTickets?.filter(
          (ticket) => ticket.userId === user.id
        );
        selectedData.push({
          [index]: {
            title: user.name,
            value: userTickets,
          },
        });
      });
    } else {
      const priorityLevels = ["No priority", "Urgent", "High", "Medium", "Low"];
      selectedData = priorityLevels.map((priority, index) => {
        const ticketsByPriority = allTickets.filter(
          (ticket) => ticket.priority === index
        );
        return {
          [index]: {
            title: priority,
            value: ticketsByPriority,
          },
        };
      });
    }

    // Ordering logic based on the selected order value
    if (orderValue === "title") {
      selectedData.forEach((item, index) => {
        item[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    } else if (orderValue === "priority") {
      selectedData.forEach((item, index) => {
        item[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    dispatch({
      type: SELECT_DATA_SUCCESS,
      payload: { selectedData, user: isUserGroup },
    });
  } catch (error) {
    dispatch({
      type: SELECT_DATA_FAILURE,
      payload: error.message,
    });
  }
};

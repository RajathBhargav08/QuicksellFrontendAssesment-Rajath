import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import DashBoard from "./components/DashBoard/DashBoard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "./Actions/DataAction";
import Loading from "./components/Loading/Loading";

const App = () => {
  const dispatch = useDispatch();
  const { allTickets, loading } = useSelector((state) => state.DataReducer);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  return (
    <div style={{ paddingTop: "10px" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavBar />
          <hr style={{ marginTop: "10px" }} />
          <DashBoard />
        </>
      )}
    </div>
  );
};

export default App;

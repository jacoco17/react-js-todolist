import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Tabs(props) {
  const { selectedTab, setSelectedTab, todos } = props;
  const todoCount = todos.filter((todo) => !todo.completed).length;


  return (  
    <nav>
      <div
        className={selectedTab === "all" ? "active" : ""}
        onClick={() => {
          setSelectedTab("all");
          notify();
        }}
      >
        <p>All</p>
      </div>

      <div
        className={selectedTab === "to do" ? "active" : ""}
        onClick={() => {
          setSelectedTab("to do");
        }}
      >
        To do
        {todoCount > 0 ? <div className="tab-count">{todoCount}</div> : ""}
      </div>

      <div
        className={selectedTab === "completed" ? "active" : ""}
        onClick={() => {
          setSelectedTab("completed");
        }}
      >
        Completed
      </div>
    </nav>
  );
}

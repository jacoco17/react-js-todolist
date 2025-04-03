import React, { useState, useEffect, useRef } from "react";
import { taskSuggestions } from "../utils";

const TodoForm = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [placeholder, setPlaceholder] = useState("Add a new task...");
  const [filteredSuggestionList, setFilteredSuggestionList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSubmit(input);
      setInput("");
    }
  };

  // ito yung function for filtering the predictive suggestions sa input
  function handleFilterSuggestions(value) {
    if (value === "") {
      return setFilteredSuggestionList([]);
    }
    const suggestionList = taskSuggestions.filter((task) =>
      task.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestionList(suggestionList);
    setSelectedIndex(-1);
  }

  // ito yung function para sa traversing of suggestions using arrow keys
  function handleKeyDown(event) {
    if (filteredSuggestionList.length === 0) return;

    if (event.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        prev < filteredSuggestionList.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestionList.length - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();

      if (selectedIndex !== -1) {
        setInput(filteredSuggestionList[selectedIndex]);
        setFilteredSuggestionList([]);
        setSelectedIndex(-1);
      } else {
        handleSubmit(event);
      }
    }

    setTimeout(() => {
      const selectedItem = document.querySelector(".suggestion-highlight");
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }, 0);
  }


  // pang close ng suggestions container when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setFilteredSuggestionList([]);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleFilterSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="todo-input"
        />

        <div className="suggestion-container" ref={suggestionRef}>
          {filteredSuggestionList.length > 0 &&
            filteredSuggestionList.map((task, index) => {
              const regex = new RegExp(`(${input})`, "gi"); 
              const parts = task.split(regex); 

              return (
                <div
                  key={index}
                  className={`suggestion ${
                    index === selectedIndex ? "suggestion-highlight" : ""
                  }`}
                  onClick={()=>setInput(task)}
                >
                  {parts.map((part, i) =>
                    part.toLowerCase() === input.toLowerCase() ? (
                      <span key={i} className="highlight">
                        {part}
                      </span> 
                    ) : (
                      part
                    )
                  )}
                </div>
              );
            })}
        </div>

        <button type="submit" className="add-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;

import { useState, useEffect } from "react";
import { todoQuotes } from "../utils";

export default function TodoQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * todoQuotes.length);
    setQuote(todoQuotes[randomIndex]);
  }, []);

  return <p className="quote-text">{quote}</p>;
}

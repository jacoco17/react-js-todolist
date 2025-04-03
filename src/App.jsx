import TodoList from "./pages/TodoList";
import SparklingBackground from "./components/SparklingBackground";
import "./styles/App.css";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const popFade = cssTransition({
    enter: "pop-fade-in",
    exit: "pop-fade-out",
    appendPosition: false, 
    collapse: true, 
    duration: [500, 500], 
  });
  
  const notify = (message) => {
    toast.success(message, {
      transition: popFade, 
      autoClose: 2000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="app">
      <SparklingBackground />
      <TodoList notify={notify} />
      <ToastContainer transition={popFade} position="bottom-right" />
    </div>
  );
}

export default App;

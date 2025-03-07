import { useContext, useEffect} from "react";
import { TasksContext } from "../../App";
import { ModalContext } from "../../App";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function Task({ task }) {
  const { tasks, setTasks } = useContext(TasksContext);
  const [modal, setModal] = useContext(ModalContext);

  const handleDelete = id => {
    setTasks(tasks.filter(task => task.id !== id));

  };

  const handleDone = id => {
    setTasks(
      tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task))
    );

};


 const formatDate = (string) => {

    if(!string) return "";
    const date = new Date(string);
    
    // Extract date components
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    
    // Extract time components
    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    
    // Format the output
    let formatted = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;
    return formatted;
}    
  return (
    <li  className="flex bg-gray-600 items-center justify-between m-4 p-4 rounded-md">
      <div className="data flex items-center">
        <input
            type="checkbox"
            checked={task.done}
            onChange={() => handleDone(task.id)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
        />
        <span className="px-4">
          <p className="text-lg font-bold">{task.text}</p>
          <p>{formatDate(task.date)}</p>
        </span>
      </div>
      <div className="actions">
        <button
            className="text-lg mx-2"
            onClick={() => setModal({open: !modal.open, task: task})}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button
            className="text-xl mx-2 text-red-500" 
            onClick={() => handleDelete(task.id)}
        >
                      <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
}

export default Task;

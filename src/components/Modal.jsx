import { useContext, useEffect, useRef, useState } from "react";
import { TasksContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function Modal({ useModal }) {
  const dialog = useRef(null);  
  const [modal, setModal] = useModal;
  const {tasks, setTasks } = useContext(TasksContext);
  const [newTask, setNewTask] = useState({
    id: ((Date.now()).toString(36) + Math.random().toString(36).substr(2, 5)),
    text: '',
    date: '',
    done: false,
  });

  useEffect(()=>{
    if(modal.task) setNewTask({...newTask, ...modal.task})
    

  }, [modal])

  useEffect(() => {
    if (modal.open) dialog.current.showModal();
    else dialog.current.close();
  }, [modal]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  const addTask = () =>{
     setTasks([...tasks, newTask])

    };
  const editTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...newTask } : task));

};


  return (
    <dialog ref={dialog}>
      <div className="flex flex-col rounded px-4 bg-gray-700">
        <div className="flex items-center justify-between pt-2">
            <h1 className="text-2xl font-bold">Add Todo</h1>
            <button
                className="w-fit rounded ml-auto m-2 text-red-500" 
                onClick={() => {
                    setModal({...modal, open: !modal.open})
                    setModal({task: {
                        id: ((Date.now()).toString(36) + Math.random().toString(36).substr(2, 5)),
                        text: '',
                        date: '',
                        done: false,
                      }, open: !modal.open});
                }}
            >
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
        <span className="flex flex-wrap items-center">
          <input
            className="flex-1 bg-gray-800 mx-2 my-2 p-2 rounded-md"
            value={newTask.text}
            placeholder="Enter Todo"
            type="text"
            onChange={e => setNewTask({ ...newTask, text: e.target.value })}
          />
          <input
            className="flex-1 bg-gray-800 mx-2 my-2 p-2 rounded-md"
            value={newTask.date}
            type="datetime-local"
            placeholder="dd-mm-yyyy"
            onChange={e => setNewTask({ ...newTask, date: e.target.value})}
          />
          </span>

          <button
            className="bg-orange-600 w-fit ml-auto mx-2 my-2 p-1 px-4 my-4 rounded"
            onClick={() => {
                if (modal.task && modal.task.text) 
                    editTask(modal.task.id);
                else if (newTask.text) 
                    addTask();
              
                setModal({task: {
                    id: ((Date.now()).toString(36) + Math.random().toString(36).substr(2, 5)),
                    text: '',
                    date: '',
                    done: false,
                  }, open: !modal.open});

            }}
          >
            done

          </button>
      </div>
    </dialog>
  );
}

export default Modal;

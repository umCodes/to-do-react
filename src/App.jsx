import { createContext, useState } from 'react';
import Header from './components/Header/Header';
import Task from './components/Task/Task';
import Modal from './components/Modal';

export const TasksContext = createContext();
export const ModalContext = createContext();




function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
  const [modal, setModal] = useState({
    open: false,
    task: null
  });

  const tasksList = tasks.map(task => <Task key={task.id} task={task} />);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <ModalContext.Provider value={[modal, setModal]}>
        <Header />
        <ul>
          {tasksList}
        </ul>
        <Modal useModal={[modal, setModal]} />

      </ModalContext.Provider>
    </TasksContext.Provider>
  );
}

export default App;

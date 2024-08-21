import { useEffect, useState } from "react";
import axios from "axios";
import Counter from "../Counter/Counter";
import Form from "../Form/Form";
import Tasks from "../Tasks/Tasks";
import "./App.scss";
import ITask from "../../@types/task";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const notDoneTasks = tasks.filter((task) => !task.done);
  const doneTasks = tasks.filter((task) => task.done);

  const loadTasks = async () => {
    try {
      const result = await axios.get("http://localhost:3000/tasks");
      setTasks(result.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const addTask = async (inputValue: string) => {
    try {
      const result = await axios.post("http://localhost:3000/tasks", {
        label: inputValue,
        done: false,
      });
      setTasks([...result.data]);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const updateTask = async (taskToUpdate: ITask) => {
    try {
      const result = await axios.put(
        `http://localhost:3000/tasks/${taskToUpdate.id}`,
        taskToUpdate
      );
      const modifiedTask = result.data;
      const updatedTasks = tasks.map((task) =>
        task.id === taskToUpdate.id ? modifiedTask : task
      );
      setTasks(updatedTasks);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const result = await axios.delete(
        `http://localhost:3000/tasks/${taskId}`
      );
      setTasks([...result.data]);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="App">
      <Form addTask={addTask} />
      <Counter nb={notDoneTasks.length} />
      <Tasks
        tasks={notDoneTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
      <Tasks
        tasks={doneTasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;

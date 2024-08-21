import ITask from '../../@types/task';
import Task from '../Task/Task';

interface TasksProps {
  tasks: ITask[];
  updateTask: (taskToUpdate: ITask) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

function Tasks({ tasks, updateTask, deleteTask }: TasksProps) {
  return (
    <ul className="list">
      {tasks.map((item) => (
        <Task
          key={item.id}
          task={item}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default Tasks;

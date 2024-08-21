import { useState } from 'react';
import { Trash, Edit, Check } from 'react-feather';
import './Task.scss';
import ITask from '../../@types/task';

interface TaskProps {
  task: ITask;
  updateTask: (taskToUpdate: ITask) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
}

function Task({ task, updateTask, deleteTask }: TaskProps) {
  const { id, label, done } = task;

  const [isEditing, setEditing] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);

  return (
    <li key={id} className="item">
      <label
        className={done ? 'item-label item-label--done' : 'item-label'}
        htmlFor={`task-${id}`}
      >
        <input
          className="item-checkbox"
          type="checkbox"
          defaultChecked={done}
          id={`task-${id}`}
          onChange={() => {
            updateTask({ id, label, done: !done });
          }}
        />
        {!isEditing ? (
          <span>{label}</span>
        ) : (
          <form
            className="item-form"
            onSubmit={(event) => {
              event.preventDefault();
              updateTask({ ...task, label: editedLabel });
              setEditing(false);
            }}
          >
            <input
              type="text"
              value={editedLabel}
              onChange={(e) => {
                setEditedLabel(e.target.value);
              }}
            />
            <button type="submit" className="item-delete">
              <Check size={20} />
            </button>
          </form>
        )}
      </label>
      <button
        type="button"
        className="item-delete"
        onClick={() => {
          setEditing(true);
        }}
      >
        <Edit size={20} />
      </button>
      <button
        type="button"
        className="item-delete"
        onClick={() => {
          deleteTask(id);
        }}
      >
        <Trash size={20} />
      </button>
    </li>
  );
}

export default Task;

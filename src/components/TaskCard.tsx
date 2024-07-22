
import React from "react";
import { deleteTask } from "../api/api";
import toast from "react-hot-toast";
import { formatDate } from "../utils/formateDate";
import { formatDistanceToNow, parseISO } from "date-fns";

const TaskCard = ({ task, onDelete, setTask, tasks, openModal}) => {
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      const updatedTasks = tasks.filter((item) => item._id !== task._id);

      setTask(updatedTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task:", error);
    }
  };

  const dueDate = task.dueDate ? parseISO(task.dueDate) : null;
  const isDueSoon =
    dueDate &&
    formatDistanceToNow(dueDate, { addSuffix: true }).includes("day");

  return (
    <div className="bg-sky-100 w-full hover:bg-sky-200 duration-300 transition-all hover:shadow-lg p-4 rounded mb-4 mt-3">
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      {dueDate && (
        <p className={`mt-2 ${isDueSoon ? "text-red-600" : ""}`}>
          Due {formatDistanceToNow(dueDate, { addSuffix: true })}
        </p>
      )}
      <p className="mt-2">Created at: {formatDate(task?.updatedAt)}</p>
      <div className="flex items-end justify-end gap-3 mt-4">
        <button
          className="bg-red-500 text-white py-1 px-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-blue-600 text-white py-1 px-2 rounded"
          onClick={() => openModal("edit", task)}
        >
          Edit
        </button>
        <button
          className="bg-blue-600 text-white py-1 px-2 rounded"
          onClick={() => openModal("view", task)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

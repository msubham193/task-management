import { Loader } from "lucide-react";
import React, { useState, useEffect } from "react";
import { formatDate } from "../utils/formateDate";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "create" | "edit";
  task?: {
    _id?: string;
    title: string;
    description: string;
    updatedAt: string;
    dueDate?: string;
  };
  onSave?: ({
    _id,
    title,
    description,
    dueDate,
  }: {
    _id?: string;
    title: string;
    description: string;
    dueDate: string;
  }) => void;
  loading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  mode,
  task,
  onSave,
  loading,
}) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task && (mode === "edit" || mode === "view")) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    } else if (mode === "create") {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [task, mode]);

  const handleSave = () => {
    if (onSave) {
      onSave({ _id: task?._id, title, description, dueDate });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={onClose}
      ></div>
      <div className="bg-white w-[50%] rounded-lg shadow-lg p-6 z-10">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          {mode === "view" && "Task Details"}
          {mode === "create" && "Create Task"}
          {mode === "edit" && "Edit Task"}
        </h2>
        <div className="mb-4">
          <p>
            <strong>Title:</strong>
          </p>
          {mode === "view" ? (
            <p>{task?.title}</p>
          ) : (
            <input
              type="text"
              className="border p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
        </div>
        <div className="mb-4">
          <p>
            <strong>Description:</strong>
          </p>
          {mode === "view" ? (
            <p>{task?.description}</p>
          ) : (
            <textarea
              className="border p-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
        </div>
        {mode !== "view" && (
          <div className="mb-4">
            <p>
              <strong>Due Date:</strong>
            </p>
            <input
              type="date"
              className="border p-2 w-full"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        )}
        {mode === "view" && (
          <>
            <p>
              <strong>Due Date:</strong>{" "}
              {task?.dueDate ? formatDate(task.dueDate) : "No due date set"}
            </p>
            <p>
              <strong>Created at:</strong> {formatDate(task?.updatedAt)}
            </p>
          </>
        )}
        <div className="mt-4">
          {mode !== "view" && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
            >
              {loading ? <Loader className="animate-spin" /> : " Save"}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            {mode === "view" ? "Close" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

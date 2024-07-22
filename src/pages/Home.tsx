import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import { addTask, getTask, updateTask } from "../api/api";
import toast from "react-hot-toast";
import Modal from "../components/Modal";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [modalMode, setModalMode] = useState("view");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");

  const columns = [
    { id: "todo", title: "TODO" },
    { id: "inprogress", title: "IN PROGRESS" },
    { id: "done", title: "DONE" },
  ];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTask();
        setTasks(data);
      } catch (err) {
        toast.error(err.message);
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);

  const openModal = (mode, task?) => {
    setModalMode(mode);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createTask = async (title, description, dueDate) => {
    try {
      setLoading(true);
      const data = await addTask(title, description, dueDate);
      setLoading(false);
      toast.success("Task created successfully");
      setTasks([...tasks, data.task]);
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  const updateTaskDetails = async (updatedTask) => {
    try {
      setLoading(true);

      // Await the updateTask function to ensure it completes before proceeding
      const response = await updateTask(updatedTask._id, updatedTask);

      // Extract the updated task from the response if necessary
      const updatedTaskFromResponse = response;

      // Update the state with the modified task list
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTaskFromResponse._id
            ? updatedTaskFromResponse
            : task
        )
      );

      setLoading(false);
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleSaveTask = async (task) => {
    if (modalMode === "create") {
      await createTask(task.title, task.description, task.dueDate);
    } else if (modalMode === "edit") {
      await updateTaskDetails(task);
    }
    closeModal();
  };

  const handleDeleteTask = (taskId) => {
    console.log(taskId);
    // Implement delete functionality here
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const updatedTasks = tasks.map((task) => {
      if (task._id === taskId) {
        task.status = status;
        updateTaskDetails(task);
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredAndSortedTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "recent") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <div className="px-8 pt-5 h-screen">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        task={selectedTask}
        onSave={handleSaveTask}
      />
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded mb-3"
        onClick={() => openModal("create")}
      >
        Add Task
      </button>
      <div className="w-full flex flex-wrap items-center justify-between p-2 bg-white shadow-md mb-2 mt-1 border-2 rounded-md">
        <div className="flex items-center mb-4 sm:mb-0">
          <label htmlFor="search" className="mr-2 text-gray-600">
            Search:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search using title.."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md w-full sm:w-64"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="mr-2 text-gray-600">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="recent">Recent</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-around bg-gray-100 h-fit gap-2">
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, column.id)}
            className="bg-white shadow-lg w-full h-screen p-4 rounded md:w-1/3"
          >
            <h2 className="bg-blue-600 text-white p-2 rounded">
              {column.title}
            </h2>
            <div className="mt-4">
              {filteredAndSortedTasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task._id)}
                    className="mb-2"
                  >
                    <TaskCard
                      task={task}
                      tasks={tasks}
                      setTask={setTasks}
                      onDelete={handleDeleteTask}
                      openModal={openModal}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

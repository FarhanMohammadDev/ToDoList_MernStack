/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

const Todolist = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [tasksTodo, setTasksTodo] = useState([]);
  const [tasksDoing, setTasksDoing] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFindTask, setIsLoadingFindTask] = useState(true);
  const [taskId, setTaskId] = useState(null);
  const [task, setTask] = useState("");
  const [updatedTaskData, setUpdatedTaskData] = useState({
    title: "",
    status: "",
    priorite: "",
    description: "",
    startDate: null,
    endDate: null,
  });
  // console.log(task);

  // Function to format ISO date to "yyyy-MM-dd"
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); 
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  async function fetchTaskById(taskId) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tasks/${taskId}`
      );
      console.log("API Response Task by ID:", response.data.data);
      setTask(response.data.data);
      setUpdatedTaskData(response.data.data);
      setIsLoadingFindTask(false);
    } catch (error) {
      console.error("Error fetching task by ID:", error);
      throw error;
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/api/tasks");
      // console.log("API Response all Tasks:", response.data.data);
      setTasks(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  // --------------------------------useFilter------------------------------------
  useEffect(() => {
    if (Array.isArray(tasks)) {
      const filterTasks = tasks.filter((task) => task.status === "To do");
      // console.log("API Response all Tasks: To do", filterTasks);
      setTasksTodo(filterTasks);
    } else {
      console.error("tasks is not an array:", tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const filterTasks = tasks.filter((task) => task.status === "Doing");
      // console.log("API Response all Tasks: Doing", filterTasks);
      setTasksDoing(filterTasks);
    } else {
      console.error("tasks is not an array:", tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (Array.isArray(tasks)) {
      const filterTasks = tasks.filter((task) => task.status === "Done");
      // console.log("API Response all Tasks: Done", filterTasks);
      setTasksDone(filterTasks);
    } else {
      console.error("tasks is not an array:", tasks);
    }
  }, [tasks]);
  // --------------------------------useFilter------------------------------------

  // --------------------------------AddTask------------------------------------
  const addTask = async () => {
    const newTask = {
      title: taskTitle,
      status: "To do",
      description: "",
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/api/tasks",
        newTask
      );
      if (result.data) {
        console.log("ok");
        setTaskTitle("");
        fetchData();
      } else {
        console.log("ko");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // --------------------------------------------------------
  const updateTask = async (
    task_Id = updatedTaskData._id,
    updatedTask_Data = updatedTaskData
  ) => {
    if (task_Id) {
      try {
        const result = await axios.put(
          `http://localhost:3000/api/tasks/${updatedTask_Data._id}`,
          updatedTask_Data
        );
        if (result.data) {
          console.log("Task updated successfully");
          setShowModal(false);
          fetchData();
          // Call fetchData or any other method to update the tasks list
        } else {
          console.log("Failed to update task");
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error updating task:", error);
        setShowModal(false);
      }
    }
  };
  // ----------------------------------------------handleStatusChange-------------------------------------------------
  const handleStatusChange = (taskId,newStatus) => {
    const task = tasks.find(task => task._id === taskId);
    const taskUpdatedStatus = {...task,status:newStatus}
    console.log(taskUpdatedStatus)
    updateTask(taskId,taskUpdatedStatus)
    
  };
  //  ------------------------------Function to remove a task------------------------------------
  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
      setShowModal(false);
      fetchData();
    } catch (error) {
      console.error("Error removing task:", error);
    }
  };

  // ----------------------------------Function to soft delete a task--------------------------------
  const softDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/api/softDeleteTask/${taskId}`);
      fetchData();
    } catch (error) {
      console.error("Error soft deleting task:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        <h1>loading</h1>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-teal-lightest font-sans ">
          <div className="flex flex-row flex-wrap justify-center">
            {/* ---------------------showModal--------------------------- */}
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full my-6 mx-auto max-w-3xl">
                    {isLoadingFindTask ? (
                      <h1>loading ... </h1>
                    ) : (
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                          <div className="flex flex-col">
                            <h3 className="text-3xl font-semibold ">
                              title :{" "}
                              {isLoadingFindTask ? (
                                <h1>loading</h1>
                              ) : (
                                task.title
                              )}
                            </h3>
                            <p className="text-slate-500 ">
                              Create by : ...........{" "}
                              <span className="text-slate-500 ">
                                {" "}
                                at :{" "}
                                {updatedTaskData.createdAt &&
                                  formatDate(updatedTaskData.createdAt)}
                              </span>
                            </p>
                          </div>

                          <button
                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <div className="w-full min-w-full">
                            <div className="mb-4">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                              >
                                Titre
                              </label>
                              <input
                                value={updatedTaskData.title}
                                onChange={(e) =>
                                  setUpdatedTaskData({
                                    ...updatedTaskData,
                                    title: e.target.value,
                                  })
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3
                             text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Titre de task"
                              />
                            </div>
                            <div className="mb-4 flex gap-2">
                              <div className="w-full">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="username"
                                >
                                  start Date
                                </label>
                                <input
                                  value={
                                    updatedTaskData.startDate &&
                                    formatDate(updatedTaskData.startDate)
                                  }
                                  onChange={(e) =>
                                    setUpdatedTaskData({
                                      ...updatedTaskData,
                                      startDate: formatDate(e.target.value),
                                    })
                                  }
                                  className="shadow appearance-none border rounded w-full py-2 px-3
                           text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="username"
                                  type="date"
                                  placeholder="Titre de task"
                                />
                              </div>

                              <div className="w-full">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2"
                                  htmlFor="username"
                                >
                                  end Date
                                </label>
                                <input
                                  value={
                                    updatedTaskData.endDate &&
                                    formatDate(updatedTaskData.endDate)
                                  }
                                  onChange={(e) =>
                                    setUpdatedTaskData({
                                      ...updatedTaskData,
                                      endDate: formatDate(e.target.value),
                                    })
                                  }
                                  className="shadow appearance-none border rounded w-full py-2 px-3
                                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  id="username"
                                  type="date"
                                  placeholder="Titre de task"
                                />
                              </div>
                            </div>
                            <div className="mb-6">
                              <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="username"
                              >
                                Description
                              </label>
                              <textarea
                                value={updatedTaskData.description}
                                onChange={(e) =>
                                  setUpdatedTaskData({
                                    ...updatedTaskData,
                                    description: e.target.value,
                                  })
                                }
                                className="resize rounded-md shadow appearance-none border w-full py-2 px-3
                           text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              ></textarea>
                            </div>

                            <div className="mb-4 flex gap-2">
                              <div className="w-full">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-state"
                                >
                                  Statut
                                </label>
                                <div className="relative">
                                  <select
                                    value={updatedTaskData.status}
                                    onChange={(e) =>
                                      setUpdatedTaskData({
                                        ...updatedTaskData,
                                        status: e.target.value,
                                      })
                                    }
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                  >
                                    <option value="To do">To do</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                      className="fill-current h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              <div className="w-full">
                                <label
                                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                  htmlFor="grid-state"
                                >
                                  priorite
                                </label>
                                <div className="relative">
                                  <select
                                    value={updatedTaskData.priorite}
                                    onChange={(e) =>
                                      setUpdatedTaskData({
                                        ...updatedTaskData,
                                        priorite: e.target.value,
                                      })
                                    }
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                  >
                                    <option
                                      value="Hight"
                                      className="text-red-500 "
                                    >
                                      Hight
                                    </option>
                                    <option
                                      value="Medium"
                                      className="text-yellow-500 "
                                    >
                                      Medium
                                    </option>
                                    <option
                                      value="Low"
                                      className="text-green-500 "
                                    >
                                      Low{" "}
                                    </option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg
                                      className="fill-current h-4 w-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => removeTask(updatedTaskData._id)}
                          >
                            REMOVE TASK
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={updateTask}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
            {/* -------------------------Todo----------------------- */}
            <div className="bg-white rounded shadow-xl p-4 m-4 md:basis-1/3 border-solid border-2 border-yellow-500 ">
              <div className="mb-4 p-6 bg-yellow-500">
                <h1 className="text-grey-darkest">To do</h1>
                <div className="flex mt-4 ">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Add Todo"
                  />
                  <button
                    className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-slate-800 hover:bg-teal"
                    onClick={addTask}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                {tasksTodo.map((task, index) => {
                  return (
                    <div
                      className="flex mb-4 items-center shadow p-3"
                      key={index}
                    >
                      <div
                        onClick={() => {
                          setShowModal(true);
                          setTaskId(task._id);
                          fetchTaskById(task._id);
                        }}
                        className="w-full text-grey-darkest"
                      >
                        <div
                          className={
                            task.deleted == true
                              ? "flex items-center line-through"
                              : "flex items-center"
                          }
                        >
                          <div
                            className={
                              task.priorite === "Hight" &&
                              "h-2.5 w-2.5 rounded-full bg-red-500 me-2"
                            }
                          ></div>
                          <div
                            className={
                              task.priorite === "Medium" &&
                              "h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"
                            }
                          ></div>
                          <div
                            className={
                              task.priorite === "Low" &&
                              "h-2.5 w-2.5 rounded-full bg-green-500 me-2"
                            }
                          ></div>
                          {task.title}
                        </div>
                      </div>
                      <button title="Doing"  onClick={() => handleStatusChange(task._id,"Doing")}
                        className="flex-no-shrink  border-2 rounded hover:text-white hover:bg-slate-800 text-grey border-grey hover:bg-grey">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                          />
                        </svg>
                      </button>
                      <button title="Done" onClick={() => handleStatusChange(task._id,"Done")}
                      className="flex-no-shrink ml-1 mr-1 border-2 rounded hover:text-white hover:bg-slate-800 text-green border-green hover:bg-green">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>
                      <button title="Soft Delete"
                        onClick={() => softDeleteTask(task._id)}
                        className="flex-no-shrink  border-2 rounded text-red border-red hover:text-white hover:bg-slate-800 hover:bg-red"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* --------------------------Doing--------------------- */}
            <div className="bg-white rounded shadow-xl p-4 m-4 md:basis-1/4 border-solid border-2 border-blue-400">
              <div className="mb-4 bg-blue-600 p-6">
                <h1 className="text-grey-darkest">Doing</h1>
              </div>
              <div>
                {tasksDoing.map((task, index) => {
                  return (
                    <div
                      className="flex mb-4 items-center shadow p-3"
                      key={index}
                    >
                      <div
                        onClick={() => {
                          setShowModal(true);
                          setTaskId(task._id);
                          fetchTaskById(task._id);
                        }}
                        className="w-full text-grey-darkest"
                      >
                        <div
                          className={
                            task.deleted == true
                              ? "flex items-center line-through"
                              : "flex items-center"
                          }
                        >
                          <div
                            className={
                              task.priorite === "Hight" &&
                              "h-2.5 w-2.5 rounded-full bg-red-500 me-2"
                            }
                          ></div>
                          <div
                            className={
                              task.priorite === "Medium" &&
                              "h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"
                            }
                          ></div>
                          <div
                            className={
                              task.priorite === "Low" &&
                              "h-2.5 w-2.5 rounded-full bg-green-500 me-2"
                            }
                          ></div>
                          {task.title}
                        </div>
                      </div>

                      <button title="Done" onClick={() => handleStatusChange(task._id,"To do")}
                      className="flex-no-shrink ml-1 mr-1 border-2 rounded hover:text-white hover:bg-slate-800 text-green border-green hover:bg-green">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                      </button>
                      <button title="Done" onClick={() => handleStatusChange(task._id,"Done")}
                      className="flex-no-shrink ml-1 mr-1 border-2 rounded hover:text-white hover:bg-slate-800 text-green border-green hover:bg-green">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                      </button>
                      <button title="Soft Delete"
                        onClick={() => softDeleteTask(task._id)}
                        className="flex-no-shrink  border-2 rounded text-red border-red hover:text-white hover:bg-slate-800 hover:bg-red"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* --------------------------Done----------------------- */}
            <div className="bg-white rounded shadow-xl p-4 m-4 md:basis-1/4 border-solid border-2 border-green-600">
              <div className="mb-4  bg-green-600 p-6">
                <h1 className="text-grey-darkest ">Done</h1>
              </div>
              <div>
                {tasksDone.map((task, index) => {
                  return (
                    <div
                      className="flex mb-4 items-center shadow p-3"
                      key={index}
                    >
                      <div
                        onClick={() => {
                          setShowModal(true);
                          setTaskId(task._id);
                          fetchTaskById(task._id);
                        }}
                        className="w-full text-grey-darkest"
                      >
                        <div
                          className={
                            task.deleted == true
                              ? "flex items-center line-through"
                              : "flex items-center"
                          }
                        >
                          <div
                            className={
                              task.priorite === "Hight" &&
                              "h-2.5 w-2.5 rounded-full bg-red-500 me-2"
                            }
                          ></div>
                          <div
                            className={
                              task.priorite === "Medium" &&
                              "h-2.5 w-2.5 rounded-full bg-yellow-500 me-2"
                            }
                          ></div>
                          <div
                            className={
                              task.priorite === "Low" &&
                              "h-2.5 w-2.5 rounded-full bg-green-500 me-2"
                            }
                          ></div>
                          {task.title}
                        </div>
                      </div>
                      <button title="Done" onClick={() => handleStatusChange(task._id,"To do")}
                      className="flex-no-shrink ml-1 mr-1 border-2 rounded hover:text-white hover:bg-slate-800 text-green border-green hover:bg-green">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                      </button>
                      <button title="Doing"  onClick={() => handleStatusChange(task._id,"Doing")}
                        className="flex-no-shrink  border-2 rounded hover:text-white hover:bg-slate-800 text-grey border-grey hover:bg-grey">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3"
                          />
                        </svg>
                      </button>

                      <button title="Soft Delete" onClick={() => softDeleteTask(task._id)}
                        className="flex-no-shrink  border-2 rounded text-red border-red hover:text-white hover:bg-slate-800 hover:bg-red"
                        >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todolist;

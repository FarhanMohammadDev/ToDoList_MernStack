/* eslint-disable no-undef */
import TodoModel from "../models/todo.schema.js";
import TodoController from "../controllers/todos.controller.js"; 

jest.mock("../models/todo.schema.js");

describe("getTask", () => {
  it("should return all tasks with a success message", async () => {
    const mockResponse = [
      {
        title: "Task 1",
        priorite: "Hight",
        status: "To do",
        description: "Description for Task 1",
      },
    ];
    TodoModel.find.mockResolvedValue(mockResponse);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TodoController.getTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockResponse,
      message: "All tasks are fetched",
    });
  });
});

describe("getTaskById", () => {
  // Test case for successful task retrieval
  it("should return task data with status 200", async () => {
    const mockTask = { _id: "mockId", title: "Mock Task" };

    // Mocking the findById method of TodoModel
    TodoModel.findById.mockResolvedValue(mockTask);

    const req = { params: { id: "mockId" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TodoController.getTaskById(req, res);

    // Asserting that the response is as expected
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockTask,
      message: "Task is fetched",
    });
  });
});

describe("TodoController", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should create a new task", async () => {
    const mockTaskData = {
      title: "Test Task",
      priorite: "Hight",
      status: "To do",
      description: "This is a test task.",
    };

    TodoModel.create.mockResolvedValue(mockTaskData);

    const req = { body: mockTaskData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TodoController.CreateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockTaskData,
      message: "Task is created",
    });
    expect(TodoModel.create).toHaveBeenCalledWith(mockTaskData);
  });

  it("should handle errors during task creation", async () => {
    const mockErrorMessage = "Error creating task";

    TodoModel.create.mockRejectedValue(new Error(mockErrorMessage));

    const mockTaskData = {
      title: "Test Task",
      priorite: "Hight",
      status: "To do",
      description: "This is a test task.",
    };

    const req = { body: mockTaskData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await TodoController.CreateTask(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: mockErrorMessage,
    });
    expect(TodoModel.create).toHaveBeenCalledWith(mockTaskData);
  });
});

describe("UpdateTask Controller", () => {
  it("should update a task successfully", async () => {
    const mockRequest = {
      params: { id: "mockId" },
      body: { title: "Updated Task", description: "Task description" },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    TodoModel.findByIdAndUpdate.mockResolvedValueOnce({
      _id: "mockId",
      title: "Updated Task",
      description: "Task description",
    });

    await TodoController.UpdateTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      data: {
        _id: "mockId",
        title: "Updated Task",
        description: "Task description",
      },
      message: "Task is updated",
    });
  });

  it("should handle errors during update", async () => {
    const mockRequest = {
      params: { id: "mockId" },
      body: { title: "Updated Task", description: "Task description" },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const errorMessage = "Update failed";
    TodoModel.findByIdAndUpdate.mockRejectedValueOnce(new Error(errorMessage));

    await TodoController.UpdateTask(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe("DeleteTask controller", () => {
  it("should delete a task and return a success message", async () => {
    const mockId = "mockTaskId";

    // Mocking TodoModel.findByIdAndDelete to return a success response
    TodoModel.findByIdAndDelete.mockResolvedValue({});

    // Mock Express request and response objects
    const req = { params: { id: mockId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await TodoController.DeleteTask(req, res);

    // Assert that TodoModel.findByIdAndDelete was called with the correct arguments
    expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(mockId);

    // Assert that Express response methods were called with the expected values
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Task is deleted" });
  });

  it("should handle errors and return a 400 status with an error message", async () => {
    const mockId = "mockTaskId";
    const errorMessage = "An error occurred";

    // Mocking TodoModel.findByIdAndDelete to throw an error
    TodoModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));

    // Mock Express request and response objects
    const req = { params: { id: mockId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await TodoController.DeleteTask(req, res);

    // Assert that TodoModel.findByIdAndDelete was called with the correct arguments
    expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(mockId);

    // Assert that Express response methods were called with the expected values
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

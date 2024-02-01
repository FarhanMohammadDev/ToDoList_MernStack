import TodoController from "../controllers/todos.controller";

// eslint-disable-next-line no-undef
// it ('should send a status code of 200 when a task is created' ,async()=> {} )

import TodoModel from '../models/todo.schema';
import mongoose from 'mongoose';

describe('TodoController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://oumaima2001ezarouali:oum123@cluster0.ydv5kbe.mongodb.net/mydata', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await TodoModel.deleteMany({});
  });

  describe('CreateTask', () => {
    const req = { body: { title: 'Task 1', description: 'Description 1' } };

    // eslint-disable-next-line no-undef
    it('should create a task', async () => {
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await TodoController.CreateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.objectContaining(req.body),
        message: 'Task is created',
      });
    });

    it('should handle errors during task creation', async () => {
      const invalidReq = { body: { invalidField: 'Invalid Value' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await TodoController.CreateTask(invalidReq, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
    });
  });

  // Repeat the similar structure for other controller methods (getTask, getTaskById, UpdateTask, DeleteTask)
});

import type { NextFunction, Request, Response } from "express";
import { generalError, notFoundError } from "./errorMiddlewares.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with the error message 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const expectedError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a generalError middleware", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives an error with status code 404 and message 'Endpoint not found'", () => {
    const error = new CustomError(404, "Endpoint not found");
    test("Then it should call de response method with status code 404", () => {
      const expectedStatusCode = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the method json with the message 'Endpoint not found'", () => {
      const expectedText = "Endpoint not found";

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedText });
    });
  });

  describe("When it receives an error without status code and a response", () => {
    const error = new Error();
    test("Then it should call de response method with status code 500", () => {
      const expectedStatusCode = 500;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the json method with the message 'General error'", () => {
      const expectedMessage = "General error";

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});

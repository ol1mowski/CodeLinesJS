import { vi } from 'vitest';
import { Response } from 'express';

export const setupResponseMocks = () => {
  const jsonMock = vi.fn().mockReturnThis();

  const successMock = vi.fn().mockImplementation(function(data, message, statusCode) {
    jsonMock();
    return this;
  });

  const failMock = vi.fn().mockImplementation(function(message, errors, statusCode) {
    jsonMock();
    return this;
  });

  const errorMock = vi.fn().mockImplementation(function(message, statusCode, errors) {
    jsonMock();
    return this;
  });

  const paginatedMock = vi.fn().mockImplementation(function(data, page, limit, total, message) {
    jsonMock();
    return this;
  });

  const cookieMock = vi.fn().mockImplementation(function(name, value, options) {
    return this;
  });

  const clearCookieMock = vi.fn().mockImplementation(function(name, options) {
    return this;
  });

  return {
    createMockResponse: () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: jsonMock,
        success: successMock,
        fail: failMock,
        error: errorMock,
        paginated: paginatedMock,
        cookie: cookieMock,
        clearCookie: clearCookieMock,
        setHeader: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis(),
      } as unknown as Response;
      
      return res;
    },
    successMock,
    failMock,
    errorMock,
    paginatedMock,
    cookieMock,
    clearCookieMock,
    jsonMock
  };
};

export const mockResponseUtils = setupResponseMocks();

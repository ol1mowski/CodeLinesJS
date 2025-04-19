import { vi } from 'vitest';
import { Response } from 'express';

/**
 * Konfiguracja mockowanych funkcji odpowiedzi dla testów Express
 */
export const setupResponseMocks = () => {
  // Tworzymy wspólny mock dla JSON
  const jsonMock = vi.fn().mockReturnThis();

  // Tworzenie mocka dla funkcji res.success
  const successMock = vi.fn().mockImplementation(function(data, message, statusCode) {
    jsonMock();
    return this;
  });

  // Tworzenie mocka dla funkcji res.fail
  const failMock = vi.fn().mockImplementation(function(message, errors, statusCode) {
    jsonMock();
    return this;
  });

  // Tworzenie mocka dla funkcji res.error
  const errorMock = vi.fn().mockImplementation(function(message, statusCode, errors) {
    jsonMock();
    return this;
  });

  // Tworzenie mocka dla funkcji res.paginated
  const paginatedMock = vi.fn().mockImplementation(function(data, page, limit, total, message) {
    jsonMock();
    return this;
  });

  // Funkcja do tworzenia mockowanego obiektu Response
  return {
    createMockResponse: () => {
      const res = {
        status: vi.fn().mockReturnThis(),
        json: jsonMock,
        success: successMock,
        fail: failMock,
        error: errorMock,
        paginated: paginatedMock,
        setHeader: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis(),
      } as unknown as Response;
      
      return res;
    },
    successMock,
    failMock,
    errorMock,
    paginatedMock,
    jsonMock
  };
};

// Tworzenie gotowej instancji mockowanej odpowiedzi do bezpośredniego użycia w testach
export const mockResponseUtils = setupResponseMocks();

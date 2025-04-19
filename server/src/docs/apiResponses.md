# Dokumentacja struktury odpowiedzi API

## Standardowa struktura odpowiedzi

Wszystkie endpointy API zwracają dane w jednolitej strukturze, co ułatwia obsługę odpowiedzi po stronie klienta. Struktura odpowiedzi zawiera następujące elementy:

```json
{
  "status": "success | error | fail",
  "code": 200,
  "message": "Opis odpowiedzi",
  "data": { /* Dane odpowiedzi */ },
  "errors": [
    {
      "code": "KOD_BŁĘDU",
      "field": "pole_z_błędem", // opcjonalne
      "message": "Szczegółowy opis błędu"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890",
    "page": 1, // dla odpowiedzi z paginacją
    "limit": 10, // dla odpowiedzi z paginacją
    "totalPages": 5, // dla odpowiedzi z paginacją
    "totalItems": 42 // dla odpowiedzi z paginacją
  }
}
```

## Typy odpowiedzi

### Pozytywna odpowiedź (`status: "success"`)

Pozytywna odpowiedź zwracana jest, gdy zapytanie zostało przetworzone pomyślnie. Zawiera dane wynikowe w polu `data`.

```json
{
  "status": "success",
  "code": 200,
  "message": "Operacja zakończona pomyślnie",
  "data": {
    "id": "12345",
    "name": "Przykładowy obiekt"
  },
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

### Odpowiedź z błędem walidacji/logiki biznesowej (`status: "fail"`)

Odpowiedź `fail` oznacza, że zapytanie nie mogło zostać przetworzone z powodu błędów po stronie klienta, np. nieprawidłowe dane wejściowe, brak uprawnień, itp.

```json
{
  "status": "fail",
  "code": 400,
  "message": "Nieprawidłowe dane wejściowe",
  "errors": [
    {
      "code": "INVALID_EMAIL",
      "field": "email",
      "message": "Nieprawidłowy format adresu email"
    },
    {
      "code": "MISSING_FIELD",
      "field": "password",
      "message": "Pole jest wymagane"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

### Odpowiedź z błędem serwera (`status: "error"`)

Odpowiedź `error` oznacza, że wystąpił nieoczekiwany błąd po stronie serwera.

```json
{
  "status": "error",
  "code": 500,
  "message": "Wystąpił nieoczekiwany błąd",
  "errors": [
    {
      "code": "INTERNAL_SERVER_ERROR",
      "message": "Serwer napotkał nieoczekiwany błąd"
    }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890"
  }
}
```

### Odpowiedź z paginacją

Dla endpointów zwracających listy danych z paginacją, struktura odpowiedzi zawiera dodatkowe metadane:

```json
{
  "status": "success",
  "code": 200,
  "message": "Dane pobrane pomyślnie",
  "data": [
    { "id": "1", "name": "Element 1" },
    { "id": "2", "name": "Element 2" }
  ],
  "meta": {
    "timestamp": "2024-04-18T06:45:12.345Z",
    "requestId": "req-1234567890",
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalItems": 42
  }
}
```

## Kody HTTP

API używa standardowych kodów HTTP dla różnych typów odpowiedzi:

| Kod | Opis | Typ odpowiedzi |
|-----|------|---------------|
| 200 | OK | success |
| 201 | Created | success |
| 400 | Bad Request | fail |
| 401 | Unauthorized | fail |
| 403 | Forbidden | fail |
| 404 | Not Found | fail |
| 409 | Conflict | fail |
| 422 | Unprocessable Entity | fail |
| 500 | Internal Server Error | error |
| 503 | Service Unavailable | error |

## Kody błędów

API używa określonych kodów błędów, które pozwalają na precyzyjną identyfikację przyczyny problemu:

| Kod | Opis |
|-----|------|
| `MISSING_FIELD` | Wymagane pole nie zostało podane |
| `INVALID_FORMAT` | Nieprawidłowy format danych |
| `INVALID_CREDENTIALS` | Nieprawidłowe dane logowania |
| `DUPLICATE_VALUE` | Wartość już istnieje w systemie |
| `RESOURCE_NOT_FOUND` | Żądany zasób nie istnieje |
| `UNAUTHORIZED` | Brak autoryzacji do wykonania operacji |
| `FORBIDDEN` | Brak uprawnień do wykonania operacji |
| `INTERNAL_SERVER_ERROR` | Wewnętrzny błąd serwera |

## Integracja z klientem

Przykład obsługi odpowiedzi po stronie klienta:

```typescript
// Przykładowa funkcja do obsługi odpowiedzi API
async function handleApiResponse(response) {
  const data = await response.json();
  
  if (data.status === 'success') {
    // Obsługa sukcesu
    return data.data;
  } else if (data.status === 'fail') {
    // Obsługa błędu walidacji
    const fieldErrors = {};
    
    if (data.errors) {
      data.errors.forEach(error => {
        if (error.field) {
          fieldErrors[error.field] = error.message;
        }
      });
    }
    
    throw new ValidationError(data.message, fieldErrors);
  } else {
    // Obsługa błędu serwera
    throw new ServerError(data.message);
  }
}
``` 
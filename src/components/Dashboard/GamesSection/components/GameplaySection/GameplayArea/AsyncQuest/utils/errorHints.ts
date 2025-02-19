type ErrorHint = {
  message: string;
  explanation: string;
  example?: string;
};

export const getErrorHint = (code: string, category: 'promises' | 'async-await' | 'callbacks'): ErrorHint => {
  // Sprawdzamy typ błędu na podstawie kodu i kategorii
  if (category === 'async-await') {
    if (!code.includes('async')) {
      return {
        message: 'Funkcja powinna być oznaczona jako asynchroniczna.',
        explanation: 'Użyj słowa kluczowego async przed deklaracją funkcji.',
        example: 'async function getData() { ... }'
      };
    }
    if (!code.includes('await')) {
      return {
        message: 'Brak słowa kluczowego await przy wywołaniu asynchronicznym.',
        explanation: 'Użyj await aby poczekać na wynik operacji asynchronicznej.',
        example: 'const data = await fetchData();'
      };
    }
  }

  if (category === 'promises') {
    if (!code.includes('.catch')) {
      return {
        message: 'Brak obsługi błędów w łańcuchu Promise.',
        explanation: 'Dodaj .catch() aby obsłużyć potencjalne błędy.',
        example: 'fetch(url).then(...).catch(error => { ... })'
      };
    }
    if (!code.includes('.then')) {
      return {
        message: 'Brak obsługi wyniku Promise.',
        explanation: 'Użyj .then() aby obsłużyć wynik pomyślnego wykonania.',
        example: 'promise.then(result => { ... })'
      };
    }
  }

  if (category === 'callbacks') {
    if (!code.includes('new Promise')) {
      return {
        message: 'Przekształć callback w Promise.',
        explanation: 'Użyj konstruktora Promise aby opakować callback.',
        example: 'new Promise((resolve, reject) => { ... })'
      };
    }
  }

  return {
    message: 'Sprawdź poprawność składni kodu.',
    explanation: 'Upewnij się, że kod jest zgodny z wymaganiami zadania.'
  };
}; 
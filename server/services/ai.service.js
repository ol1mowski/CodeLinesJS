import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  static async generateGameData(difficulty = 'medium', category = 'basics') {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Wygeneruj dane do gry programistycznej JavaScript w formacie JSON. 
      Trudność: ${difficulty}
      Kategoria: ${category}
      
      Format odpowiedzi powinien zawierać:
      - pytanie w JavaScript
      - 3 możliwe odpowiedzi
      - poprawną odpowiedź
      - wyjaśnienie odpowiedzi
      - punkty za zadanie (10-30)
      
      Odpowiedź ma być w czystym formacie JSON, bez dodatkowego tekstu.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const gameData = JSON.parse(response.text());

      return {
        success: true,
        data: gameData
      };
    } catch (error) {
      console.error('Błąd generowania danych gry:', error);
      return {
        success: false,
        error: 'Nie udało się wygenerować danych gry'
      };
    }
  }

  static async generateGameDescription(title, difficulty) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `Wygeneruj krótki (max 200 znaków) opis gry programistycznej o tytule "${title}" 
      i poziomie trudności "${difficulty}". 
      Opis powinien być w języku polskim i zachęcać do rozwiązania zadania.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      
      return {
        success: true,
        description: response.text().slice(0, 200)
      };
    } catch (error) {
      console.error('Błąd generowania opisu gry:', error);
      return {
        success: false,
        error: 'Nie udało się wygenerować opisu gry'
      };
    }
  }
}

export default AIService; 
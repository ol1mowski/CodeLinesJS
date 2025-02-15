export const messageValidators = {
  required: {
    required: true,
    minLength: {
      value: 1,
      message: 'Wiadomość nie może być pusta'
    },
    maxLength: {
      value: 2000,
      message: 'Wiadomość nie może być dłuższa niż 2000 znaków'
    }
  }
}; 
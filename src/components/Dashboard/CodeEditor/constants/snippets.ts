export const jsSnippets = [
  {
    label: 'console.log',
    insertText: 'console.log($1);',
    documentation: 'Wyświetl wartość w konsoli',
  },
  {
    label: 'function',
    insertText: 'function ${1:nazwaFunkcji}(${2:parametry}) {\n\t$0\n}',
    documentation: 'Zdefiniuj nową funkcję',
  },
  {
    label: 'arrow',
    insertText: 'const ${1:nazwaFunkcji} = (${2:parametry}) => {\n\t$0\n};',
    documentation: 'Zdefiniuj funkcję strzałkową',
  },
]; 
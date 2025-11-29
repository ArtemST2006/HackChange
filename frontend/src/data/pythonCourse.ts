import type { Quiz, QuizQuestion, CodeExercise } from '../types';

// ========================================
// МОДУЛЬ 1: ОСНОВЫ PYTHON
// ========================================

// Тест #1: Основы Python
export const quiz1_basics: Quiz = {
  id: 'quiz-python-basics',
  lessonId: 'l4',
  title: 'Тест: Основы Python',
  description: 'Проверьте свои знания основ программирования на Python',
  passingScore: 70,
  maxAttempts: 3,
  shuffleQuestions: true,
  showCorrectAnswers: true,
  questions: [
    {
      id: 'q1',
      type: 'single-choice',
      question: 'Что выведет следующий код?',
      code: 'print("Hello, " + "World!")',
      options: [
        { id: 'a', text: 'Hello, World!', isCorrect: true },
        { id: 'b', text: 'Hello, + World!', isCorrect: false },
        { id: 'c', text: 'Ошибка', isCorrect: false },
        { id: 'd', text: 'HelloWorld!', isCorrect: false },
      ],
      correctAnswer: 'a',
      explanation: 'Оператор + конкатенирует (соединяет) строки в Python.',
      points: 10,
    },
    {
      id: 'q2',
      type: 'single-choice',
      question: 'Какой тип данных будет у переменной x?',
      code: 'x = 42',
      options: [
        { id: 'a', text: 'str', isCorrect: false },
        { id: 'b', text: 'int', isCorrect: true },
        { id: 'c', text: 'float', isCorrect: false },
        { id: 'd', text: 'bool', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: '42 - это целое число, поэтому тип будет int.',
      points: 10,
    },
    {
      id: 'q3',
      type: 'true-false',
      question: 'Python - это компилируемый язык программирования',
      options: [
        { id: 'true', text: 'Правда', isCorrect: false },
        { id: 'false', text: 'Ложь', isCorrect: true },
      ],
      correctAnswer: 'false',
      explanation: 'Python - интерпретируемый язык, код выполняется построчно.',
      points: 10,
    },
    {
      id: 'q4',
      type: 'single-choice',
      question: 'Какая функция используется для ввода данных с клавиатуры?',
      options: [
        { id: 'a', text: 'print()', isCorrect: false },
        { id: 'b', text: 'input()', isCorrect: true },
        { id: 'c', text: 'read()', isCorrect: false },
        { id: 'd', text: 'scanf()', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'Функция input() используется для чтения ввода пользователя.',
      points: 10,
    },
    {
      id: 'q5',
      type: 'multiple-choice',
      question: 'Выберите все числовые типы данных в Python:',
      options: [
        { id: 'a', text: 'int', isCorrect: true },
        { id: 'b', text: 'float', isCorrect: true },
        { id: 'c', text: 'str', isCorrect: false },
        { id: 'd', text: 'complex', isCorrect: true },
        { id: 'e', text: 'bool', isCorrect: false },
      ],
      correctAnswer: ['a', 'b', 'd'],
      explanation: 'В Python есть три числовых типа: int, float и complex.',
      points: 15,
    },
    {
      id: 'q6',
      type: 'single-choice',
      question: 'Что выведет print(type(3.14))?',
      options: [
        { id: 'a', text: "<class 'int'>", isCorrect: false },
        { id: 'b', text: "<class 'float'>", isCorrect: true },
        { id: 'c', text: "<class 'double'>", isCorrect: false },
        { id: 'd', text: "<class 'number'>", isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: '3.14 - это число с плавающей точкой, тип float.',
      points: 10,
    },
    {
      id: 'q7',
      type: 'single-choice',
      question: 'Какой символ используется для однострочных комментариев?',
      options: [
        { id: 'a', text: '//', isCorrect: false },
        { id: 'b', text: '/* */', isCorrect: false },
        { id: 'c', text: '#', isCorrect: true },
        { id: 'd', text: '--', isCorrect: false },
      ],
      correctAnswer: 'c',
      explanation: 'В Python для комментариев используется символ #.',
      points: 10,
    },
    {
      id: 'q8',
      type: 'true-false',
      question: 'Python чувствителен к регистру (case-sensitive)',
      options: [
        { id: 'true', text: 'Правда', isCorrect: true },
        { id: 'false', text: 'Ложь', isCorrect: false },
      ],
      correctAnswer: 'true',
      explanation: 'В Python переменные Name, name и NAME - это разные переменные.',
      points: 10,
    },
    {
      id: 'q9',
      type: 'single-choice',
      question: 'Какой оператор используется для возведения в степень?',
      code: '# Например: 2 в степени 3 = 8',
      options: [
        { id: 'a', text: '^', isCorrect: false },
        { id: 'b', text: '**', isCorrect: true },
        { id: 'c', text: 'pow()', isCorrect: false },
        { id: 'd', text: 'power()', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'В Python оператор ** используется для возведения в степень: 2**3 = 8',
      points: 10,
    },
    {
      id: 'q10',
      type: 'single-choice',
      question: 'Что выведет следующий код?',
      code: 'x = 10\ny = 3\nprint(x // y)',
      options: [
        { id: 'a', text: '3.333...', isCorrect: false },
        { id: 'b', text: '3', isCorrect: true },
        { id: 'c', text: '3.0', isCorrect: false },
        { id: 'd', text: 'Ошибка', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'Оператор // выполняет целочисленное деление: 10 // 3 = 3',
      points: 15,
    },
  ],
};

// ========================================
// МОДУЛЬ 2: ПЕРЕМЕННЫЕ И ТИПЫ ДАННЫХ
// ========================================

// Практика: Калькулятор
export const exercise1_calculator: CodeExercise = {
  id: 'exercise-calculator',
  lessonId: 'l8',
  title: 'Создание простого калькулятора',
  description: 'Напишите функции для основных арифметических операций',
  instructions: `
Создайте 4 функции:
1. add(a, b) - сложение
2. subtract(a, b) - вычитание
3. multiply(a, b) - умножение
4. divide(a, b) - деление

Функция divide должна возвращать None, если делитель равен 0.
  `,
  starterCode: `def add(a, b):
    # Ваш код здесь
    pass

def subtract(a, b):
    # Ваш код здесь
    pass

def multiply(a, b):
    # Ваш код здесь
    pass

def divide(a, b):
    # Ваш код здесь
    # Не забудьте проверить деление на ноль!
    pass
`,
  language: 'python',
  difficulty: 'easy',
  testCases: [
    {
      id: 't1',
      input: 'add(5, 3)',
      expectedOutput: '8',
      isHidden: false,
      points: 10,
    },
    {
      id: 't2',
      input: 'subtract(10, 4)',
      expectedOutput: '6',
      isHidden: false,
      points: 10,
    },
    {
      id: 't3',
      input: 'multiply(6, 7)',
      expectedOutput: '42',
      isHidden: false,
      points: 10,
    },
    {
      id: 't4',
      input: 'divide(15, 3)',
      expectedOutput: '5.0',
      isHidden: false,
      points: 10,
    },
    {
      id: 't5',
      input: 'divide(10, 0)',
      expectedOutput: 'None',
      isHidden: false,
      points: 10,
    },
    {
      id: 't6',
      input: 'add(-5, 5)',
      expectedOutput: '0',
      isHidden: true,
      points: 10,
    },
    {
      id: 't7',
      input: 'multiply(100, 0)',
      expectedOutput: '0',
      isHidden: true,
      points: 10,
    },
  ],
  hints: [
    'Для сложения используйте оператор +',
    'Для деления используйте оператор /',
    'Проверьте b != 0 перед делением',
  ],
};

// ========================================
// МОДУЛЬ 3: ЦИКЛЫ И ФУНКЦИИ
// ========================================

// Тест #2: Циклы и условия
export const quiz2_loops: Quiz = {
  id: 'quiz-python-loops',
  lessonId: 'l13',
  title: 'Тест: Циклы и функции',
  description: 'Проверьте знания циклов for, while и функций',
  passingScore: 70,
  maxAttempts: 3,
  shuffleQuestions: true,
  showCorrectAnswers: true,
  questions: [
    {
      id: 'q1',
      type: 'single-choice',
      question: 'Сколько раз выполнится цикл?',
      code: 'for i in range(5):\n    print(i)',
      options: [
        { id: 'a', text: '4', isCorrect: false },
        { id: 'b', text: '5', isCorrect: true },
        { id: 'c', text: '6', isCorrect: false },
        { id: 'd', text: 'Бесконечно', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'range(5) генерирует числа от 0 до 4, всего 5 чисел.',
      points: 10,
    },
    {
      id: 'q2',
      type: 'single-choice',
      question: 'Какое ключевое слово используется для определения функции?',
      options: [
        { id: 'a', text: 'function', isCorrect: false },
        { id: 'b', text: 'def', isCorrect: true },
        { id: 'c', text: 'func', isCorrect: false },
        { id: 'd', text: 'define', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'В Python функции определяются с помощью ключевого слова def.',
      points: 10,
    },
    {
      id: 'q3',
      type: 'single-choice',
      question: 'Что выведет этот код?',
      code: 'def greet(name):\n    return "Hello, " + name\n\nprint(greet("Alice"))',
      options: [
        { id: 'a', text: 'Hello, name', isCorrect: false },
        { id: 'b', text: 'Hello, Alice', isCorrect: true },
        { id: 'c', text: 'greet("Alice")', isCorrect: false },
        { id: 'd', text: 'Ошибка', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'Функция возвращает строку "Hello, " + переданное имя.',
      points: 15,
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'Какие операторы используются в циклах?',
      options: [
        { id: 'a', text: 'break', isCorrect: true },
        { id: 'b', text: 'continue', isCorrect: true },
        { id: 'c', text: 'stop', isCorrect: false },
        { id: 'd', text: 'pass', isCorrect: true },
      ],
      correctAnswer: ['a', 'b', 'd'],
      explanation: 'break - выход из цикла, continue - переход к следующей итерации, pass - ничего не делать.',
      points: 15,
    },
    {
      id: 'q5',
      type: 'single-choice',
      question: 'Что выведет этот код?',
      code: 'numbers = [1, 2, 3]\nfor n in numbers:\n    print(n * 2)',
      options: [
        { id: 'a', text: '1 2 3', isCorrect: false },
        { id: 'b', text: '2 4 6', isCorrect: true },
        { id: 'c', text: '123123', isCorrect: false },
        { id: 'd', text: 'Ошибка', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'Каждое число из списка умножается на 2: 1*2=2, 2*2=4, 3*2=6',
      points: 15,
    },
  ],
};

// Практика: Функция для работы со списками
export const exercise2_list_functions: CodeExercise = {
  id: 'exercise-list-functions',
  lessonId: 'l13',
  title: 'Функции для работы со списками',
  description: 'Напишите функции для обработки списков',
  instructions: `
Создайте 3 функции:
1. sum_list(numbers) - возвращает сумму всех чисел в списке
2. find_max(numbers) - возвращает максимальное число
3. count_even(numbers) - возвращает количество четных чисел

Если список пустой, функции должны возвращать 0 (для sum_list и count_even)
или None (для find_max).
  `,
  starterCode: `def sum_list(numbers):
    # Ваш код здесь
    pass

def find_max(numbers):
    # Ваш код здесь
    pass

def count_even(numbers):
    # Ваш код здесь
    pass
`,
  language: 'python',
  difficulty: 'medium',
  testCases: [
    {
      id: 't1',
      input: 'sum_list([1, 2, 3, 4, 5])',
      expectedOutput: '15',
      isHidden: false,
      points: 10,
    },
    {
      id: 't2',
      input: 'find_max([1, 5, 3, 9, 2])',
      expectedOutput: '9',
      isHidden: false,
      points: 10,
    },
    {
      id: 't3',
      input: 'count_even([1, 2, 3, 4, 5, 6])',
      expectedOutput: '3',
      isHidden: false,
      points: 10,
    },
    {
      id: 't4',
      input: 'sum_list([])',
      expectedOutput: '0',
      isHidden: false,
      points: 10,
    },
    {
      id: 't5',
      input: 'find_max([])',
      expectedOutput: 'None',
      isHidden: false,
      points: 10,
    },
    {
      id: 't6',
      input: 'count_even([1, 3, 5, 7])',
      expectedOutput: '0',
      isHidden: true,
      points: 10,
    },
    {
      id: 't7',
      input: 'sum_list([10, -5, 3])',
      expectedOutput: '8',
      isHidden: true,
      points: 10,
    },
  ],
  hints: [
    'Используйте цикл for для обхода списка',
    'Для проверки четности используйте оператор %',
    'Не забудьте проверить, не пустой ли список',
  ],
};

// ========================================
// МОДУЛЬ 4: ООП
// ========================================

// Тест #3: ООП
export const quiz3_oop: Quiz = {
  id: 'quiz-python-oop',
  lessonId: 'l19',
  title: 'Итоговый тест: ООП',
  description: 'Проверьте знания объектно-ориентированного программирования',
  passingScore: 75,
  maxAttempts: 2,
  shuffleQuestions: true,
  showCorrectAnswers: true,
  questions: [
    {
      id: 'q1',
      type: 'single-choice',
      question: 'Какое ключевое слово используется для создания класса?',
      options: [
        { id: 'a', text: 'class', isCorrect: true },
        { id: 'b', text: 'def', isCorrect: false },
        { id: 'c', text: 'object', isCorrect: false },
        { id: 'd', text: 'create', isCorrect: false },
      ],
      correctAnswer: 'a',
      explanation: 'Классы в Python создаются с помощью ключевого слова class.',
      points: 10,
    },
    {
      id: 'q2',
      type: 'single-choice',
      question: 'Как называется метод-конструктор в Python?',
      options: [
        { id: 'a', text: 'constructor()', isCorrect: false },
        { id: 'b', text: '__init__()', isCorrect: true },
        { id: 'c', text: '__new__()', isCorrect: false },
        { id: 'd', text: 'new()', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: '__init__() - это специальный метод-конструктор в Python.',
      points: 10,
    },
    {
      id: 'q3',
      type: 'single-choice',
      question: 'Что такое self в методах класса?',
      options: [
        { id: 'a', text: 'Название класса', isCorrect: false },
        { id: 'b', text: 'Ссылка на текущий объект', isCorrect: true },
        { id: 'c', text: 'Ключевое слово Python', isCorrect: false },
        { id: 'd', text: 'Глобальная переменная', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'self - это ссылка на текущий экземпляр класса.',
      points: 15,
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      question: 'Какие принципы ООП существуют в Python?',
      options: [
        { id: 'a', text: 'Инкапсуляция', isCorrect: true },
        { id: 'b', text: 'Наследование', isCorrect: true },
        { id: 'c', text: 'Полиморфизм', isCorrect: true },
        { id: 'd', text: 'Компиляция', isCorrect: false },
      ],
      correctAnswer: ['a', 'b', 'c'],
      explanation: 'Основные принципы ООП: инкапсуляция, наследование, полиморфизм.',
      points: 15,
    },
    {
      id: 'q5',
      type: 'single-choice',
      question: 'Что выведет этот код?',
      code: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndog = Dog("Rex")\nprint(dog.name)',
      options: [
        { id: 'a', text: 'name', isCorrect: false },
        { id: 'b', text: 'Rex', isCorrect: true },
        { id: 'c', text: 'self.name', isCorrect: false },
        { id: 'd', text: 'Ошибка', isCorrect: false },
      ],
      correctAnswer: 'b',
      explanation: 'Создается объект dog с именем "Rex", которое выводится.',
      points: 20,
    },
  ],
};

// Практика: Создание класса
export const exercise3_class: CodeExercise = {
  id: 'exercise-car-class',
  lessonId: 'l18',
  title: 'Создание класса Автомобиль',
  description: 'Реализуйте класс Car с методами',
  instructions: `
Создайте класс Car со следующими характеристиками:

Свойства:
- brand (марка)
- model (модель)
- year (год выпуска)
- mileage (пробег, по умолчанию 0)

Методы:
- get_info() - возвращает строку вида "Brand Model (Year)"
- drive(km) - увеличивает пробег на km километров
- get_mileage() - возвращает текущий пробег

Пример:
car = Car("Toyota", "Camry", 2020)
car.get_info()  # "Toyota Camry (2020)"
car.drive(100)
car.get_mileage()  # 100
  `,
  starterCode: `class Car:
    def __init__(self, brand, model, year):
        # Ваш код здесь
        pass

    def get_info(self):
        # Ваш код здесь
        pass

    def drive(self, km):
        # Ваш код здесь
        pass

    def get_mileage(self):
        # Ваш код здесь
        pass
`,
  language: 'python',
  difficulty: 'medium',
  testCases: [
    {
      id: 't1',
      input: 'car = Car("Toyota", "Camry", 2020); car.get_info()',
      expectedOutput: 'Toyota Camry (2020)',
      isHidden: false,
      points: 15,
    },
    {
      id: 't2',
      input: 'car = Car("BMW", "X5", 2021); car.get_mileage()',
      expectedOutput: '0',
      isHidden: false,
      points: 10,
    },
    {
      id: 't3',
      input: 'car = Car("Honda", "Civic", 2019); car.drive(150); car.get_mileage()',
      expectedOutput: '150',
      isHidden: false,
      points: 15,
    },
    {
      id: 't4',
      input: 'car = Car("Ford", "Focus", 2018); car.drive(100); car.drive(50); car.get_mileage()',
      expectedOutput: '150',
      isHidden: true,
      points: 15,
    },
  ],
  hints: [
    'Используйте self для хранения атрибутов объекта',
    'В методе get_info() используйте f-строку для форматирования',
    'В методе drive() увеличивайте self.mileage на переданное значение',
  ],
};

// Экспорт всех тестов и заданий
export const pythonCourseQuizzes = [quiz1_basics, quiz2_loops, quiz3_oop];
export const pythonCourseExercises = [exercise1_calculator, exercise2_list_functions, exercise3_class];

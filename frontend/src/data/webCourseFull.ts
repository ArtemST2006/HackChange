// Полный контент курса Web-разработка

// ============================================
// МОДУЛЬ 1: ОСНОВЫ HTML
// ============================================

// Урок 1: Введение в HTML и структура документа
export const web_m1_l1_content = {
  id: 'w1-l1',
  moduleId: 'w1',
  title: 'Введение в HTML и структура документа',
  theory: `
# Введение в HTML и структура документа

HTML (HyperText Markup Language) — это язык разметки, используемый для создания веб-страниц. Он определяет структуру и содержание веб-страницы.

## Базовая структура HTML документа

\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая HTML страница.</p>
</body>
</html>
\`\`\`

## Основные элементы

- **\`<!DOCTYPE html>\`** - объявление типа документа
- **\`<html>\`** - корневой элемент страницы
- **\`<head>\`** - содержит метаинформацию
- **\`<body>\`** - содержит видимое содержимое страницы

## Метатеги

Метатеги предоставляют информацию о странице:

- **charset** - кодировка символов (UTF-8)
- **viewport** - настройки отображения на мобильных устройствах
- **title** - заголовок страницы в браузере
`,
  keyPoints: [
    'HTML - язык разметки для создания веб-страниц',
    'Каждый HTML документ начинается с <!DOCTYPE html>',
    'Основная структура: html > head + body',
    'Метатеги находятся в секции head'
  ]
};

// Урок 2: Теги разметки
export const web_m1_l2_content = {
  id: 'w1-l2',
  moduleId: 'w1',
  title: 'Теги разметки: заголовки, параграфы, списки',
  theory: `
# Теги разметки: заголовки, параграфы, списки

## Заголовки

HTML предоставляет 6 уровней заголовков от \`<h1>\` до \`<h6>\`:

\`\`\`html
<h1>Заголовок первого уровня</h1>
<h2>Заголовок второго уровня</h2>
<h3>Заголовок третьего уровня</h3>
\`\`\`

## Параграфы

Тег \`<p>\` используется для создания параграфов текста:

\`\`\`html
<p>Это первый параграф.</p>
<p>Это второй параграф.</p>
\`\`\`

## Списки

### Маркированные списки (ul)

\`\`\`html
<ul>
  <li>Элемент списка 1</li>
  <li>Элемент списка 2</li>
  <li>Элемент списка 3</li>
</ul>
\`\`\`

### Нумерованные списки (ol)

\`\`\`html
<ol>
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</ol>
\`\`\`

## Форматирование текста

- **\`<strong>\`** - жирный текст (важный)
- **\`<em>\`** - курсив (акцент)
- **\`<br>\`** - перенос строки
- **\`<hr>\`** - горизонтальная линия
`,
  keyPoints: [
    'Используйте h1 только один раз на странице',
    'Соблюдайте иерархию заголовков (h1 → h2 → h3)',
    'Списки ul для маркированных, ol для нумерованных',
    'Параграфы автоматически добавляют отступы'
  ]
};

// Урок 3: Ссылки и изображения
export const web_m1_l3_content = {
  id: 'w1-l3',
  moduleId: 'w1',
  title: 'Ссылки и изображения',
  theory: `
# Ссылки и изображения

## Ссылки

Тег \`<a>\` создает гиперссылки:

\`\`\`html
<!-- Внешняя ссылка -->
<a href="https://example.com">Перейти на сайт</a>

<!-- Ссылка на другую страницу -->
<a href="/about.html">О нас</a>

<!-- Открыть в новой вкладке -->
<a href="https://example.com" target="_blank">Открыть в новой вкладке</a>

<!-- Якорь на странице -->
<a href="#section1">Перейти к разделу</a>
\`\`\`

## Изображения

Тег \`<img>\` вставляет изображения:

\`\`\`html
<img src="image.jpg" alt="Описание изображения">

<!-- С указанием размеров -->
<img src="photo.jpg" alt="Фото" width="300" height="200">
\`\`\`

## Атрибуты

- **href** - адрес ссылки
- **target** - где открыть ссылку (_blank, _self)
- **src** - путь к изображению
- **alt** - альтернативный текст для изображения
- **width/height** - размеры изображения

## Относительные и абсолютные пути

\`\`\`html
<!-- Абсолютный путь -->
<img src="https://example.com/images/photo.jpg" alt="Фото">

<!-- Относительный путь -->
<img src="images/photo.jpg" alt="Фото">
<img src="../photo.jpg" alt="Фото">
\`\`\`
`,
  keyPoints: [
    'Всегда указывайте атрибут alt для изображений',
    'Используйте относительные пути для локальных файлов',
    'target="_blank" открывает ссылку в новой вкладке',
    'Оптимизируйте размер изображений для web'
  ]
};

// Урок 4: Таблицы в HTML
export const web_m1_l4_content = {
  id: 'w1-l4',
  moduleId: 'w1',
  title: 'Таблицы в HTML',
  theory: `
# Таблицы в HTML

## Структура таблицы

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Заголовок 1</th>
      <th>Заголовок 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ячейка 1</td>
      <td>Ячейка 2</td>
    </tr>
    <tr>
      <td>Ячейка 3</td>
      <td>Ячейка 4</td>
    </tr>
  </tbody>
</table>
\`\`\`

## Основные теги

- **\`<table>\`** - создает таблицу
- **\`<thead>\`** - заголовок таблицы
- **\`<tbody>\`** - тело таблицы
- **\`<tr>\`** - строка таблицы
- **\`<th>\`** - ячейка заголовка
- **\`<td>\`** - ячейка данных

## Объединение ячеек

\`\`\`html
<!-- Объединение по горизонтали -->
<td colspan="2">Объединенная ячейка</td>

<!-- Объединение по вертикали -->
<td rowspan="2">Объединенная ячейка</td>
\`\`\`

## Стилизация таблиц

\`\`\`html
<table border="1" cellpadding="10" cellspacing="0">
  <!-- содержимое -->
</table>
\`\`\`
`,
  keyPoints: [
    'Таблицы используются для табличных данных, не для верстки',
    'thead и tbody помогают структурировать таблицу',
    'colspan объединяет ячейки по горизонтали',
    'rowspan объединяет ячейки по вертикали'
  ]
};

// Урок 5: Формы в HTML
export const web_m1_l5_content = {
  id: 'w1-l5',
  moduleId: 'w1',
  title: 'Формы в HTML',
  theory: `
# Формы в HTML

## Основная структура формы

\`\`\`html
<form action="/submit" method="POST">
  <label for="name">Имя:</label>
  <input type="text" id="name" name="name" required>

  <button type="submit">Отправить</button>
</form>
\`\`\`

## Типы input

\`\`\`html
<input type="text" placeholder="Текст">
<input type="email" placeholder="Email">
<input type="password" placeholder="Пароль">
<input type="number" min="0" max="100">
<input type="date">
<input type="checkbox">
<input type="radio" name="choice">
\`\`\`

## Текстовые области

\`\`\`html
<textarea name="message" rows="5" cols="30">
  Текст по умолчанию
</textarea>
\`\`\`

## Выпадающие списки

\`\`\`html
<select name="country">
  <option value="ru">Россия</option>
  <option value="us">США</option>
  <option value="uk">Великобритания</option>
</select>
\`\`\`

## Атрибуты валидации

- **required** - обязательное поле
- **minlength/maxlength** - минимальная/максимальная длина
- **min/max** - минимальное/максимальное значение
- **pattern** - регулярное выражение для проверки
`,
  keyPoints: [
    'Всегда используйте label для доступности',
    'Атрибут name необходим для отправки данных',
    'required делает поле обязательным',
    'Используйте правильные типы input для валидации'
  ]
};

// ============================================
// МОДУЛЬ 2: CSS
// ============================================

// Урок 1: Введение в CSS
export const web_m2_l1_content = {
  id: 'w2-l1',
  moduleId: 'w2',
  title: 'Введение в CSS и способы подключения',
  theory: `
# Введение в CSS

CSS (Cascading Style Sheets) — это язык стилей, используемый для оформления веб-страниц.

## Способы подключения CSS

### 1. Внешний файл (рекомендуется)

\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

### 2. Внутренние стили

\`\`\`html
<head>
  <style>
    body {
      background-color: #f0f0f0;
    }
  </style>
</head>
\`\`\`

### 3. Встроенные стили

\`\`\`html
<p style="color: red;">Красный текст</p>
\`\`\`

## Базовый синтаксис

\`\`\`css
селектор {
  свойство: значение;
  другое-свойство: значение;
}
\`\`\`

## Пример

\`\`\`css
h1 {
  color: blue;
  font-size: 24px;
  text-align: center;
}
\`\`\`
`,
  keyPoints: [
    'CSS разделяет содержание и оформление',
    'Внешние файлы CSS - лучшая практика',
    'Селектор определяет, к чему применяются стили',
    'Свойства и значения определяют, как элемент выглядит'
  ]
};

// Урок 2: Селекторы
export const web_m2_l2_content = {
  id: 'w2-l2',
  moduleId: 'w2',
  title: 'Селекторы и специфичность',
  theory: `
# Селекторы и специфичность

## Типы селекторов

### Селектор тега

\`\`\`css
p {
  color: black;
}
\`\`\`

### Селектор класса

\`\`\`css
.my-class {
  color: blue;
}
\`\`\`

### Селектор ID

\`\`\`css
#my-id {
  color: red;
}
\`\`\`

### Комбинированные селекторы

\`\`\`css
/* Потомок */
div p {
  color: green;
}

/* Прямой потомок */
div > p {
  color: blue;
}

/* Соседний элемент */
h1 + p {
  margin-top: 0;
}
\`\`\`

### Псевдоклассы

\`\`\`css
a:hover {
  color: red;
}

input:focus {
  border-color: blue;
}

li:first-child {
  font-weight: bold;
}
\`\`\`

## Специфичность

Приоритет селекторов (от меньшего к большему):

1. Селекторы тегов (h1, p)
2. Селекторы классов (.class)
3. Селекторы ID (#id)
4. Встроенные стили (style="...")
5. !important
`,
  keyPoints: [
    'Используйте классы для многократного использования стилей',
    'ID должен быть уникальным на странице',
    'Специфичность определяет, какие стили применяются',
    'Избегайте !important без крайней необходимости'
  ]
};

// Урок 3: Цвета, фоны и границы
export const web_m2_l3_content = {
  id: 'w2-l3',
  moduleId: 'w2',
  title: 'Цвета, фоны и границы',
  theory: `
# Цвета, фоны и границы

## Цвета

\`\`\`css
/* Именованные цвета */
color: red;

/* HEX */
color: #ff0000;
color: #f00;

/* RGB */
color: rgb(255, 0, 0);

/* RGBA (с прозрачностью) */
color: rgba(255, 0, 0, 0.5);

/* HSL */
color: hsl(0, 100%, 50%);
\`\`\`

## Фоны

\`\`\`css
background-color: #f0f0f0;
background-image: url('image.jpg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;

/* Сокращенная запись */
background: #f0f0f0 url('image.jpg') no-repeat center/cover;
\`\`\`

## Градиенты

\`\`\`css
/* Линейный градиент */
background: linear-gradient(to right, #ff0000, #00ff00);

/* Радиальный градиент */
background: radial-gradient(circle, #ff0000, #00ff00);
\`\`\`

## Границы

\`\`\`css
border: 2px solid #000;
border-radius: 10px;
border-top: 1px dashed red;

/* Отдельные свойства */
border-width: 2px;
border-style: solid;
border-color: black;
\`\`\`
`,
  keyPoints: [
    'RGBA и HSLA позволяют задавать прозрачность',
    'background-size: cover масштабирует изображение',
    'border-radius создает скругленные углы',
    'Градиенты - мощный инструмент для создания фонов'
  ]
};

// Урок 4: Блочная модель
export const web_m2_l4_content = {
  id: 'w2-l4',
  moduleId: 'w2',
  title: 'Блочная модель (Box Model)',
  theory: `
# Блочная модель (Box Model)

Блочная модель CSS описывает, как элементы занимают место на странице. Каждый элемент представляет собой прямоугольную коробку.

## Компоненты блочной модели

\`\`\`
┌─────────────────────────────────────┐
│           Margin (отступ)           │
│  ┌───────────────────────────────┐  │
│  │     Border (рамка)            │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │   Padding (внутр. отступ)│  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │   Content         │  │  │  │
│  │  │  │  (содержимое)     │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
\`\`\`

## Свойства блочной модели

\`\`\`css
.box {
    /* Размеры содержимого */
    width: 300px;
    height: 200px;

    /* Внутренние отступы */
    padding: 20px;

    /* Рамка */
    border: 2px solid #000;

    /* Внешние отступы */
    margin: 10px;
}
\`\`\`

## Box-sizing

По умолчанию width и height применяются только к содержимому. Свойство \`box-sizing\` меняет это поведение:

\`\`\`css
/* Стандартное поведение */
.box-content {
    box-sizing: content-box;
    /* width = только содержимое */
}

/* Более удобное поведение */
.box-border {
    box-sizing: border-box;
    /* width = содержимое + padding + border */
}
\`\`\`

## Практический пример

\`\`\`css
* {
    box-sizing: border-box;
}

.card {
    width: 300px;
    padding: 20px;
    border: 1px solid #ddd;
    margin: 20px auto;
    background: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`
`,
  keyPoints: [
    'Блочная модель состоит из: content, padding, border, margin',
    'Width и height по умолчанию применяются только к content',
    'box-sizing: border-box включает padding и border в width',
    'Margin создает пространство между элементами'
  ],
  codeExamples: [
    {
      title: 'Пример блочной модели',
      code: `.container {
  width: 400px;
  padding: 30px;
  border: 5px solid #3498db;
  margin: 20px auto;
  background: #ecf0f1;
}

.item {
  padding: 15px;
  margin-bottom: 10px;
  border-left: 4px solid #e74c3c;
  background: white;
}`,
      explanation: 'Container имеет фиксированную ширину с padding, border и margin. Элементы внутри имеют свои отступы.'
    }
  ]
};

// Урок 5: Позиционирование
export const web_m2_l5_content = {
  id: 'w2-l5',
  moduleId: 'w2',
  title: 'Позиционирование элементов',
  theory: `
# Позиционирование элементов

## Типы позиционирования

### Static (по умолчанию)

\`\`\`css
position: static;
/* Элемент в потоке документа */
\`\`\`

### Relative

\`\`\`css
position: relative;
top: 10px;
left: 20px;
/* Сдвиг относительно исходной позиции */
\`\`\`

### Absolute

\`\`\`css
position: absolute;
top: 0;
right: 0;
/* Позиция относительно ближайшего позиционированного родителя */
\`\`\`

### Fixed

\`\`\`css
position: fixed;
top: 0;
left: 0;
/* Фиксированная позиция относительно окна браузера */
\`\`\`

### Sticky

\`\`\`css
position: sticky;
top: 0;
/* Прилипает при прокрутке */
\`\`\`

## Z-index

\`\`\`css
.element1 {
  position: relative;
  z-index: 1;
}

.element2 {
  position: relative;
  z-index: 2; /* Будет поверх element1 */
}
\`\`\`

## Центрирование

\`\`\`css
/* Центрирование с absolute */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`
`,
  keyPoints: [
    'relative сохраняет место элемента в потоке',
    'absolute вынимает элемент из потока',
    'fixed фиксирует элемент при прокрутке',
    'z-index работает только для позиционированных элементов'
  ]
};

// ============================================
// МОДУЛЬ 3: FLEXBOX И GRID
// ============================================

// Урок 1: Введение в Flexbox
export const web_m3_l1_content = {
  id: 'w3-l1',
  moduleId: 'w3',
  title: 'Введение в Flexbox',
  theory: `
# Введение в Flexbox

Flexbox — это модуль CSS для создания гибких одномерных макетов.

## Создание Flex-контейнера

\`\`\`css
.container {
  display: flex;
}
\`\`\`

## Направление (flex-direction)

\`\`\`css
.container {
  flex-direction: row; /* по умолчанию */
  flex-direction: row-reverse;
  flex-direction: column;
  flex-direction: column-reverse;
}
\`\`\`

## Выравнивание по главной оси (justify-content)

\`\`\`css
.container {
  justify-content: flex-start; /* по умолчанию */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;
}
\`\`\`

## Выравнивание по поперечной оси (align-items)

\`\`\`css
.container {
  align-items: stretch; /* по умолчанию */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline;
}
\`\`\`
`,
  keyPoints: [
    'Flexbox отлично подходит для одномерных макетов',
    'justify-content управляет главной осью',
    'align-items управляет поперечной осью',
    'flex-direction меняет направление главной оси'
  ]
};

// Урок 2: Свойства flex-элементов
export const web_m3_l2_content = {
  id: 'w3-l2',
  moduleId: 'w3',
  title: 'Свойства flex-контейнера',
  theory: `
# Свойства flex-элементов

## Flex-grow

\`\`\`css
.item {
  flex-grow: 1; /* Растет, заполняя свободное пространство */
}
\`\`\`

## Flex-shrink

\`\`\`css
.item {
  flex-shrink: 1; /* Сжимается при необходимости */
}
\`\`\`

## Flex-basis

\`\`\`css
.item {
  flex-basis: 200px; /* Базовый размер */
}
\`\`\`

## Сокращенная запись

\`\`\`css
.item {
  flex: 1 1 200px; /* grow shrink basis */
  flex: 1; /* равно 1 1 0 */
}
\`\`\`

## Перенос строк

\`\`\`css
.container {
  flex-wrap: wrap; /* Переносить элементы */
  flex-wrap: nowrap; /* Не переносить (по умолчанию) */
}
\`\`\`

## Порядок элементов

\`\`\`css
.item {
  order: 1; /* Меняет порядок отображения */
}
\`\`\`
`,
  keyPoints: [
    'flex-grow определяет, как элемент растет',
    'flex-shrink определяет, как элемент сжимается',
    'flex-basis задает начальный размер',
    'flex-wrap позволяет переносить элементы на новую строку'
  ]
};

// Урок 3: CSS Grid
export const web_m3_l3_content = {
  id: 'w3-l3',
  moduleId: 'w3',
  title: 'CSS Grid Layout',
  theory: `
# CSS Grid Layout

Grid — это система компоновки для создания двумерных макетов.

## Создание Grid-контейнера

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 колонки */
  grid-template-rows: 100px 200px; /* 2 строки */
  gap: 20px; /* Отступы между ячейками */
}
\`\`\`

## Repeat и единицы

\`\`\`css
.container {
  grid-template-columns: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
\`\`\`

## Размещение элементов

\`\`\`css
.item {
  grid-column: 1 / 3; /* С 1 по 3 линию */
  grid-row: 1 / 2;
  /* или */
  grid-column: span 2; /* Занимает 2 колонки */
}
\`\`\`

## Области (Grid Areas)

\`\`\`css
.container {
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
}

.header {
  grid-area: header;
}
\`\`\`

## Выравнивание

\`\`\`css
.container {
  justify-items: center; /* По горизонтали */
  align-items: center; /* По вертикали */
}
\`\`\`
`,
  keyPoints: [
    'Grid идеален для двумерных макетов',
    'fr единица делит доступное пространство',
    'grid-template-areas упрощает создание макета',
    'auto-fit создает адаптивную сетку'
  ]
};

// Урок 4: Адаптивная верстка
export const web_m3_l4_content = {
  id: 'w3-l4',
  moduleId: 'w3',
  title: 'Адаптивная верстка',
  theory: `
# Адаптивная верстка

## Media Queries

\`\`\`css
/* Мобильные устройства */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

/* Планшеты */
@media (min-width: 769px) and (max-width: 1024px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Десктоп */
@media (min-width: 1025px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
\`\`\`

## Mobile-First подход

\`\`\`css
/* Базовые стили для мобильных */
.container {
  padding: 10px;
}

/* Планшеты и выше */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Десктоп */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
  }
}
\`\`\`

## Адаптивные изображения

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

## Viewport units

\`\`\`css
.hero {
  height: 100vh; /* 100% высоты экрана */
  width: 100vw; /* 100% ширины экрана */
}
\`\`\`
`,
  keyPoints: [
    'Mobile-first начинает с мобильных стилей',
    'Media queries адаптируют дизайн под разные экраны',
    'max-width: 100% делает изображения адаптивными',
    'Viewport units основаны на размерах экрана'
  ]
};

// ============================================
// МОДУЛЬ 4: JAVASCRIPT
// ============================================

// Урок 1: Введение в JavaScript
export const web_m4_l1_content = {
  id: 'w4-l1',
  moduleId: 'w4',
  title: 'Введение в JavaScript',
  theory: `
# Введение в JavaScript

JavaScript — это язык программирования для создания интерактивных веб-страниц.

## Подключение JavaScript

\`\`\`html
<!-- Внешний файл -->
<script src="script.js"></script>

<!-- Встроенный код -->
<script>
  console.log('Hello, World!');
</script>
\`\`\`

## Вывод в консоль

\`\`\`javascript
console.log('Сообщение');
console.error('Ошибка');
console.warn('Предупреждение');
\`\`\`

## Комментарии

\`\`\`javascript
// Однострочный комментарий

/*
  Многострочный
  комментарий
*/
\`\`\`

## Strict Mode

\`\`\`javascript
'use strict';
// Включает строгий режим
\`\`\`
`,
  keyPoints: [
    'JavaScript делает страницы интерактивными',
    'console.log() выводит информацию в консоль',
    'Используйте внешние файлы для больших скриптов',
    'Strict mode помогает избежать ошибок'
  ]
};

// Урок 2: Переменные и типы данных
export const web_m4_l2_content = {
  id: 'w4-l2',
  moduleId: 'w4',
  title: 'Переменные и типы данных',
  theory: `
# Переменные и типы данных

## Объявление переменных

\`\`\`javascript
let name = 'Иван'; // Можно изменить
const age = 25; // Константа, нельзя изменить
var oldWay = 'Старый способ'; // Устаревший
\`\`\`

## Примитивные типы

\`\`\`javascript
// Number
let num = 42;
let float = 3.14;

// String
let text = 'Привет';
let text2 = "Мир";
let text3 = \`Шаблонная строка\`;

// Boolean
let isTrue = true;
let isFalse = false;

// Undefined
let notDefined;

// Null
let empty = null;
\`\`\`

## Операции со строками

\`\`\`javascript
let firstName = 'Иван';
let lastName = 'Петров';
let fullName = firstName + ' ' + lastName;
let template = \`Меня зовут \${firstName}\`;
\`\`\`

## Преобразование типов

\`\`\`javascript
let str = '123';
let num = Number(str); // 123
let str2 = String(456); // '456'
let bool = Boolean(1); // true
\`\`\`
`,
  keyPoints: [
    'Используйте const для значений, которые не меняются',
    'let для переменных, которые могут измениться',
    'JavaScript имеет динамическую типизацию',
    'Шаблонные строки упрощают работу со строками'
  ]
};

// Урок 3: Операторы и условия
export const web_m4_l3_content = {
  id: 'w4-l3',
  moduleId: 'w4',
  title: 'Операторы и условия',
  theory: `
# Операторы и условия

## Арифметические операторы

\`\`\`javascript
let sum = 5 + 3; // 8
let diff = 10 - 4; // 6
let product = 6 * 7; // 42
let quotient = 20 / 4; // 5
let remainder = 17 % 5; // 2
let power = 2 ** 3; // 8
\`\`\`

## Операторы сравнения

\`\`\`javascript
5 == '5' // true (нестрогое сравнение)
5 === '5' // false (строгое сравнение)
5 != '5' // false
5 !== '5' // true
10 > 5 // true
10 >= 10 // true
\`\`\`

## Логические операторы

\`\`\`javascript
true && false // false (И)
true || false // true (ИЛИ)
!true // false (НЕ)
\`\`\`

## Условный оператор if

\`\`\`javascript
if (age >= 18) {
  console.log('Совершеннолетний');
} else if (age >= 13) {
  console.log('Подросток');
} else {
  console.log('Ребенок');
}
\`\`\`

## Тернарный оператор

\`\`\`javascript
let status = age >= 18 ? 'Взрослый' : 'Ребенок';
\`\`\`

## Switch

\`\`\`javascript
switch (day) {
  case 'Понедельник':
    console.log('Начало недели');
    break;
  case 'Пятница':
    console.log('Конец недели');
    break;
  default:
    console.log('Обычный день');
}
\`\`\`
`,
  keyPoints: [
    'Используйте === для строгого сравнения',
    'Логические операторы возвращают boolean',
    'Тернарный оператор сокращает простые условия',
    'switch удобен для множественного выбора'
  ]
};

// Урок 4: Циклы
export const web_m4_l4_content = {
  id: 'w4-l4',
  moduleId: 'w4',
  title: 'Циклы в JavaScript',
  theory: `
# Циклы в JavaScript

## Цикл for

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
\`\`\`

## Цикл while

\`\`\`javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
\`\`\`

## Цикл do...while

\`\`\`javascript
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);
\`\`\`

## Break и Continue

\`\`\`javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // Прерывает цикл
  if (i % 2 === 0) continue; // Пропускает итерацию
  console.log(i);
}
\`\`\`

## For...of (для массивов)

\`\`\`javascript
let fruits = ['яблоко', 'банан', 'апельсин'];
for (let fruit of fruits) {
  console.log(fruit);
}
\`\`\`

## For...in (для объектов)

\`\`\`javascript
let person = { name: 'Иван', age: 25 };
for (let key in person) {
  console.log(key + ': ' + person[key]);
}
\`\`\`
`,
  keyPoints: [
    'for используется, когда известно число итераций',
    'while используется, когда число итераций неизвестно',
    'break прерывает цикл полностью',
    'continue пропускает текущую итерацию'
  ]
};

// Урок 5: Функции
export const web_m4_l5_content = {
  id: 'w4-l5',
  moduleId: 'w4',
  title: 'Функции',
  theory: `
# Функции в JavaScript

## Объявление функции

\`\`\`javascript
function greet(name) {
  return 'Привет, ' + name;
}

let message = greet('Иван'); // 'Привет, Иван'
\`\`\`

## Function Expression

\`\`\`javascript
const greet = function(name) {
  return 'Привет, ' + name;
};
\`\`\`

## Стрелочные функции

\`\`\`javascript
const greet = (name) => {
  return 'Привет, ' + name;
};

// Короткая запись
const greet = name => 'Привет, ' + name;

// Без параметров
const sayHello = () => 'Привет!';
\`\`\`

## Параметры по умолчанию

\`\`\`javascript
function greet(name = 'Гость') {
  return 'Привет, ' + name;
}
\`\`\`

## Rest параметры

\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4); // 10
\`\`\`

## Колбэки

\`\`\`javascript
function doSomething(callback) {
  callback();
}

doSomething(() => {
  console.log('Выполнено!');
});
\`\`\`
`,
  keyPoints: [
    'Функции делают код переиспользуемым',
    'Стрелочные функции имеют краткий синтаксис',
    'Параметры по умолчанию упрощают код',
    'Колбэки используются для асинхронных операций'
  ]
};

// Урок 6: Массивы и объекты
export const web_m4_l6_content = {
  id: 'w4-l6',
  moduleId: 'w4',
  title: 'Массивы и объекты',
  theory: `
# Массивы и объекты

## Массивы

\`\`\`javascript
let fruits = ['яблоко', 'банан', 'апельсин'];

// Доступ к элементам
console.log(fruits[0]); // 'яблоко'

// Длина массива
console.log(fruits.length); // 3

// Добавление элементов
fruits.push('груша'); // В конец
fruits.unshift('киви'); // В начало

// Удаление элементов
fruits.pop(); // Из конца
fruits.shift(); // Из начала

// Методы массивов
fruits.slice(1, 3); // Вырезать часть
fruits.splice(1, 1, 'манго'); // Удалить и вставить
fruits.indexOf('банан'); // Найти индекс
fruits.includes('яблоко'); // Проверить наличие
\`\`\`

## Методы высшего порядка

\`\`\`javascript
let numbers = [1, 2, 3, 4, 5];

// map - преобразует элементы
let doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// filter - фильтрует элементы
let even = numbers.filter(n => n % 2 === 0); // [2, 4]

// reduce - сводит к одному значению
let sum = numbers.reduce((total, n) => total + n, 0); // 15

// forEach - перебирает элементы
numbers.forEach(n => console.log(n));
\`\`\`

## Объекты

\`\`\`javascript
let person = {
  name: 'Иван',
  age: 25,
  city: 'Москва',
  greet: function() {
    console.log('Привет!');
  }
};

// Доступ к свойствам
console.log(person.name); // 'Иван'
console.log(person['age']); // 25

// Изменение свойств
person.age = 26;

// Добавление свойств
person.job = 'Разработчик';

// Удаление свойств
delete person.city;

// Методы объекта
Object.keys(person); // Ключи
Object.values(person); // Значения
Object.entries(person); // Пары ключ-значение
\`\`\`
`,
  keyPoints: [
    'Массивы хранят упорядоченные коллекции',
    'map, filter, reduce - мощные инструменты для работы с массивами',
    'Объекты хранят пары ключ-значение',
    'Методы объекта позволяют получить ключи и значения'
  ]
};

// ============================================
// МОДУЛЬ 5: DOM И СОБЫТИЯ
// ============================================

// Урок 1: Что такое DOM
export const web_m5_l1_content = {
  id: 'w5-l1',
  moduleId: 'w5',
  title: 'Что такое DOM',
  theory: `
# Что такое DOM

DOM (Document Object Model) — это программный интерфейс для HTML документов.

## Структура DOM

\`\`\`
document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── h1
          ├── p
          └── div
\`\`\`

## Document объект

\`\`\`javascript
console.log(document.title); // Заголовок страницы
console.log(document.URL); // URL страницы
console.log(document.domain); // Домен
\`\`\`

## Поиск элементов

\`\`\`javascript
// По ID
let element = document.getElementById('myId');

// По классу
let elements = document.getElementsByClassName('myClass');

// По тегу
let paragraphs = document.getElementsByTagName('p');

// По CSS селектору (один элемент)
let element = document.querySelector('.myClass');

// По CSS селектору (все элементы)
let elements = document.querySelectorAll('.myClass');
\`\`\`
`,
  keyPoints: [
    'DOM представляет HTML как дерево объектов',
    'querySelector - современный способ поиска элементов',
    'getElementById возвращает один элемент',
    'querySelectorAll возвращает все подходящие элементы'
  ]
};

// Урок 2: Изменение элементов
export const web_m5_l2_content = {
  id: 'w5-l2',
  moduleId: 'w5',
  title: 'Поиск и изменение элементов',
  theory: `
# Поиск и изменение элементов

## Изменение содержимого

\`\`\`javascript
let element = document.querySelector('h1');

// Изменить текст
element.textContent = 'Новый текст';

// Изменить HTML
element.innerHTML = '<span>HTML код</span>';
\`\`\`

## Изменение атрибутов

\`\`\`javascript
let img = document.querySelector('img');

// Получить атрибут
let src = img.getAttribute('src');

// Установить атрибут
img.setAttribute('alt', 'Описание');

// Прямой доступ
img.src = 'new-image.jpg';
img.className = 'my-class';
\`\`\`

## Изменение стилей

\`\`\`javascript
let element = document.querySelector('div');

// Изменить один стиль
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// Несколько стилей
element.style.cssText = 'color: red; background: blue;';
\`\`\`

## Работа с классами

\`\`\`javascript
let element = document.querySelector('div');

// Добавить класс
element.classList.add('active');

// Удалить класс
element.classList.remove('hidden');

// Переключить класс
element.classList.toggle('visible');

// Проверить наличие класса
if (element.classList.contains('active')) {
  console.log('Элемент активен');
}
\`\`\`

## Создание и удаление элементов

\`\`\`javascript
// Создать элемент
let newDiv = document.createElement('div');
newDiv.textContent = 'Новый элемент';

// Добавить на страницу
document.body.appendChild(newDiv);

// Удалить элемент
newDiv.remove();
\`\`\`
`,
  keyPoints: [
    'textContent безопаснее innerHTML',
    'classList удобнее для работы с классами',
    'style изменяет inline стили',
    'createElement создает новые элементы'
  ]
};

// Урок 3: События
export const web_m5_l3_content = {
  id: 'w5-l3',
  moduleId: 'w5',
  title: 'События и обработчики',
  theory: `
# События и обработчики

## Добавление обработчиков событий

\`\`\`javascript
let button = document.querySelector('button');

// addEventListener (рекомендуется)
button.addEventListener('click', function() {
  console.log('Кнопка нажата!');
});

// Стрелочная функция
button.addEventListener('click', () => {
  console.log('Кнопка нажата!');
});
\`\`\`

## Типы событий

\`\`\`javascript
// Клик мыши
element.addEventListener('click', handler);

// Двойной клик
element.addEventListener('dblclick', handler);

// Наведение мыши
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);

// Фокус
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);

// Ввод текста
input.addEventListener('input', handler);
input.addEventListener('change', handler);

// Отправка формы
form.addEventListener('submit', handler);
\`\`\`

## Event объект

\`\`\`javascript
button.addEventListener('click', (event) => {
  console.log(event.type); // 'click'
  console.log(event.target); // Элемент, на котором произошло событие
  event.preventDefault(); // Отменить действие по умолчанию
  event.stopPropagation(); // Остановить всплытие
});
\`\`\`

## Удаление обработчиков

\`\`\`javascript
function handleClick() {
  console.log('Клик');
}

// Добавить
button.addEventListener('click', handleClick);

// Удалить
button.removeEventListener('click', handleClick);
\`\`\`
`,
  keyPoints: [
    'addEventListener позволяет добавить несколько обработчиков',
    'event.target указывает на элемент события',
    'preventDefault отменяет действие по умолчанию',
    'Именованные функции можно удалить через removeEventListener'
  ]
};

// Урок 4: Формы и валидация
export const web_m5_l4_content = {
  id: 'w5-l4',
  moduleId: 'w5',
  title: 'Формы и валидация',
  theory: `
# Формы и валидация

## Получение значений формы

\`\`\`javascript
let form = document.querySelector('form');
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');

// Получить значение
let name = nameInput.value;
let email = emailInput.value;
\`\`\`

## Обработка отправки формы

\`\`\`javascript
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменить отправку

  // Получить данные
  let formData = new FormData(form);
  let name = formData.get('name');
  let email = formData.get('email');

  console.log(name, email);
});
\`\`\`

## Валидация

\`\`\`javascript
form.addEventListener('submit', (event) => {
  event.preventDefault();

  let name = nameInput.value.trim();
  let email = emailInput.value.trim();

  // Проверка имени
  if (name.length < 2) {
    alert('Имя должно быть не менее 2 символов');
    return;
  }

  // Проверка email
  let emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Введите корректный email');
    return;
  }

  // Форма валидна
  console.log('Форма отправлена');
});
\`\`\`

## Работа с checkbox и radio

\`\`\`javascript
let checkbox = document.querySelector('#agree');
if (checkbox.checked) {
  console.log('Согласен с условиями');
}

let selectedRadio = document.querySelector('input[name="gender"]:checked');
if (selectedRadio) {
  console.log(selectedRadio.value);
}
\`\`\`

## Работа с select

\`\`\`javascript
let select = document.querySelector('select');
let selectedValue = select.value;
let selectedIndex = select.selectedIndex;
let selectedText = select.options[selectedIndex].text;
\`\`\`
`,
  keyPoints: [
    'preventDefault() обязателен для обработки формы через JS',
    'FormData упрощает получение данных формы',
    'Всегда валидируйте данные на клиенте и сервере',
    'Регулярные выражения помогают проверить формат'
  ]
};

// ============================================
// ТЕСТЫ ДЛЯ УРОКОВ
// ============================================

export const web_m1_l1_quiz = {
  id: 'quiz-w1-l1',
  lessonId: 'w1-l1',
  title: 'Тест: Основы HTML',
  description: 'Проверьте свои знания о структуре HTML документа',
  questions: [
    {
      id: 'q1',
      type: 'single-choice' as const,
      question: 'Что означает аббревиатура HTML?',
      options: [
        { id: 'a', text: 'HyperText Markup Language' },
        { id: 'b', text: 'HighText Machine Language' },
        { id: 'c', text: 'HyperText Making Links' },
        { id: 'd', text: 'Home Tool Markup Language' }
      ],
      correctAnswer: 'a',
      explanation: 'HTML расшифровывается как HyperText Markup Language - язык гипертекстовой разметки.',
      points: 25
    },
    {
      id: 'q2',
      type: 'single-choice' as const,
      question: 'Какой тег является корневым элементом HTML документа?',
      options: [
        { id: 'a', text: '<body>' },
        { id: 'b', text: '<head>' },
        { id: 'c', text: '<html>' },
        { id: 'd', text: '<document>' }
      ],
      correctAnswer: 'c',
      explanation: 'Тег <html> является корневым элементом, который содержит всё содержимое страницы.',
      points: 25
    },
    {
      id: 'q3',
      type: 'single-choice' as const,
      question: 'Где размещаются метатеги в HTML документе?',
      options: [
        { id: 'a', text: 'В теге <body>' },
        { id: 'b', text: 'В теге <head>' },
        { id: 'c', text: 'В теге <footer>' },
        { id: 'd', text: 'В теге <meta>' }
      ],
      correctAnswer: 'b',
      explanation: 'Метатеги размещаются в секции <head>, которая содержит метаинформацию о документе.',
      points: 25
    },
    {
      id: 'q4',
      type: 'single-choice' as const,
      question: 'Для чего используется тег <title>?',
      options: [
        { id: 'a', text: 'Для заголовка статьи на странице' },
        { id: 'b', text: 'Для названия в браузерной вкладке' },
        { id: 'c', text: 'Для описания страницы' },
        { id: 'd', text: 'Для ключевых слов' }
      ],
      correctAnswer: 'b',
      explanation: 'Тег <title> определяет название страницы, которое отображается во вкладке браузера.',
      points: 25
    }
  ],
  timeLimit: 300,
  passingScore: 75,
  maxAttempts: 3,
  shuffleQuestions: false,
  showCorrectAnswers: true
};

export const web_m2_l4_quiz = {
  id: 'quiz-w2-l4',
  lessonId: 'w2-l4',
  title: 'Тест: Блочная модель',
  description: 'Проверьте понимание CSS Box Model',
  questions: [
    {
      id: 'q1',
      type: 'single-choice' as const,
      question: 'Из каких частей состоит блочная модель CSS (в правильном порядке изнутри наружу)?',
      options: [
        { id: 'a', text: 'Content → Padding → Border → Margin' },
        { id: 'b', text: 'Content → Border → Padding → Margin' },
        { id: 'c', text: 'Margin → Padding → Border → Content' },
        { id: 'd', text: 'Content → Margin → Padding → Border' }
      ],
      correctAnswer: 'a',
      explanation: 'Правильный порядок от содержимого наружу: Content (содержимое), Padding (внутренний отступ), Border (рамка), Margin (внешний отступ).',
      points: 25
    },
    {
      id: 'q2',
      type: 'single-choice' as const,
      question: 'Что делает свойство box-sizing: border-box?',
      options: [
        { id: 'a', text: 'Убирает border у элемента' },
        { id: 'b', text: 'Включает padding и border в указанную width' },
        { id: 'c', text: 'Увеличивает размер border' },
        { id: 'd', text: 'Применяет border только к box элементам' }
      ],
      correctAnswer: 'b',
      explanation: 'box-sizing: border-box включает padding и border в общую ширину элемента, что упрощает расчеты.',
      points: 25
    },
    {
      id: 'q3',
      type: 'single-choice' as const,
      question: 'Какое свойство создает пространство ВНУТРИ элемента между содержимым и рамкой?',
      options: [
        { id: 'a', text: 'margin' },
        { id: 'b', text: 'padding' },
        { id: 'c', text: 'border' },
        { id: 'd', text: 'spacing' }
      ],
      correctAnswer: 'b',
      explanation: 'Padding создает внутренний отступ между содержимым и границей элемента.',
      points: 25
    },
    {
      id: 'q4',
      type: 'single-choice' as const,
      question: 'Если у элемента width: 200px, padding: 20px и border: 5px (без box-sizing), какова будет полная ширина?',
      options: [
        { id: 'a', text: '200px' },
        { id: 'b', text: '220px' },
        { id: 'c', text: '250px' },
        { id: 'd', text: '245px' }
      ],
      correctAnswer: 'c',
      explanation: 'Полная ширина = 200 (content) + 20*2 (padding слева и справа) + 5*2 (border слева и справа) = 250px',
      points: 25
    }
  ],
  timeLimit: 300,
  passingScore: 75,
  maxAttempts: 3,
  shuffleQuestions: false,
  showCorrectAnswers: true
};

// ============================================
// ЭКСПОРТ МАППИНГА КОНТЕНТА И КВИЗОВ
// ============================================

export const webLessonContentMap: Record<string, any> = {
  // Модуль 1: HTML
  'w1-l1': web_m1_l1_content,
  'w1-l2': web_m1_l2_content,
  'w1-l3': web_m1_l3_content,
  'w1-l4': web_m1_l4_content,
  'w1-l5': web_m1_l5_content,

  // Модуль 2: CSS
  'w2-l1': web_m2_l1_content,
  'w2-l2': web_m2_l2_content,
  'w2-l3': web_m2_l3_content,
  'w2-l4': web_m2_l4_content,
  'w2-l5': web_m2_l5_content,

  // Модуль 3: Flexbox и Grid
  'w3-l1': web_m3_l1_content,
  'w3-l2': web_m3_l2_content,
  'w3-l3': web_m3_l3_content,
  'w3-l4': web_m3_l4_content,

  // Модуль 4: JavaScript
  'w4-l1': web_m4_l1_content,
  'w4-l2': web_m4_l2_content,
  'w4-l3': web_m4_l3_content,
  'w4-l4': web_m4_l4_content,
  'w4-l5': web_m4_l5_content,
  'w4-l6': web_m4_l6_content,

  // Модуль 5: DOM и события
  'w5-l1': web_m5_l1_content,
  'w5-l2': web_m5_l2_content,
  'w5-l3': web_m5_l3_content,
  'w5-l4': web_m5_l4_content,
};

export const webLessonQuizMap: Record<string, any> = {
  'w1-l1': web_m1_l1_quiz,
  'w2-l4': web_m2_l4_quiz,
};

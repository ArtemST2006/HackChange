// Полный контент курса SQL Основы

// ============================================
// МОДУЛЬ 1: ОСНОВЫ SQL
// ============================================

export const sql_m1_l1_content = {
  id: 'sql-m1-l1',
  moduleId: 'sql-m1',
  title: 'Введение в базы данных',
  theory: `
# Введение в базы данных

## Что такое база данных?

База данных (БД) — это организованная коллекция данных, хранящаяся и используемая в электронном виде.

## Типы баз данных

- **Реляционные (SQL)**: PostgreSQL, MySQL, SQLite
- **NoSQL**: MongoDB, Redis, Cassandra
- **Графовые**: Neo4j
- **Документо-ориентированные**: CouchDB

## SQL - Structured Query Language

SQL — язык структурированных запросов для работы с реляционными базами данных.

## Основные команды SQL

- **DDL** (Data Definition Language) - CREATE, ALTER, DROP
- **DML** (Data Manipulation Language) - SELECT, INSERT, UPDATE, DELETE
- **DCL** (Data Control Language) - GRANT, REVOKE

## Таблицы

Таблица — основная структура хранения данных в реляционной БД.

\`\`\`sql
-- Пример таблицы
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  created_at TIMESTAMP
);
\`\`\`
`,
  keyPoints: [
    'База данных хранит структурированные данные',
    'SQL - язык для работы с реляционными БД',
    'Таблицы состоят из строк и столбцов',
    'Каждая таблица имеет схему (структуру)'
  ]
};

export const sql_m1_l2_content = {
  id: 'sql-m1-l2',
  moduleId: 'sql-m1',
  title: 'SELECT и базовые запросы',
  theory: `
# SELECT и базовые запросы

## SELECT - выборка данных

\`\`\`sql
-- Выбрать все столбцы
SELECT * FROM users;

-- Выбрать определенные столбцы
SELECT name, email FROM users;

-- Уникальные значения
SELECT DISTINCT city FROM users;
\`\`\`

## WHERE - фильтрация

\`\`\`sql
-- Простое условие
SELECT * FROM users WHERE age > 18;

-- Несколько условий
SELECT * FROM users
WHERE age > 18 AND city = 'Москва';

-- Оператор IN
SELECT * FROM users
WHERE city IN ('Москва', 'Санкт-Петербург');

-- LIKE для поиска по шаблону
SELECT * FROM users
WHERE email LIKE '%@gmail.com';
\`\`\`

## ORDER BY - сортировка

\`\`\`sql
-- По возрастанию
SELECT * FROM users ORDER BY age ASC;

-- По убыванию
SELECT * FROM users ORDER BY age DESC;

-- По нескольким столбцам
SELECT * FROM users
ORDER BY city ASC, age DESC;
\`\`\`

## LIMIT - ограничение результатов

\`\`\`sql
-- Первые 10 записей
SELECT * FROM users LIMIT 10;

-- С пропуском (пагинация)
SELECT * FROM users LIMIT 10 OFFSET 20;
\`\`\`
`,
  keyPoints: [
    'SELECT выбирает данные из таблицы',
    'WHERE фильтрует результаты по условию',
    'ORDER BY сортирует результаты',
    'LIMIT ограничивает количество строк'
  ]
};

export const sql_m1_l3_content = {
  id: 'sql-m1-l3',
  moduleId: 'sql-m1',
  title: 'INSERT, UPDATE, DELETE',
  theory: `
# INSERT, UPDATE, DELETE

## INSERT - добавление данных

\`\`\`sql
-- Вставить одну запись
INSERT INTO users (name, email, age)
VALUES ('Иван', 'ivan@mail.ru', 25);

-- Вставить несколько записей
INSERT INTO users (name, email, age)
VALUES
  ('Петр', 'petr@mail.ru', 30),
  ('Мария', 'maria@mail.ru', 28);
\`\`\`

## UPDATE - изменение данных

\`\`\`sql
-- Изменить одно поле
UPDATE users
SET age = 26
WHERE name = 'Иван';

-- Изменить несколько полей
UPDATE users
SET age = 26, city = 'Москва'
WHERE id = 1;

-- Изменить все записи
UPDATE users SET active = true;
\`\`\`

## DELETE - удаление данных

\`\`\`sql
-- Удалить конкретную запись
DELETE FROM users WHERE id = 1;

-- Удалить по условию
DELETE FROM users WHERE age < 18;

-- Удалить все записи (осторожно!)
DELETE FROM users;
\`\`\`

## ВАЖНО: Всегда используйте WHERE!

\`\`\`sql
-- ОПАСНО - удалит ВСЕ данные
DELETE FROM users;

-- ПРАВИЛЬНО - удалит только нужное
DELETE FROM users WHERE id = 1;
\`\`\`
`,
  keyPoints: [
    'INSERT добавляет новые данные',
    'UPDATE изменяет существующие данные',
    'DELETE удаляет данные',
    'Всегда проверяйте WHERE перед UPDATE и DELETE'
  ]
};

export const sql_m1_l4_content = {
  id: 'sql-m1-l4',
  moduleId: 'sql-m1',
  title: 'JOIN - объединение таблиц',
  theory: `
# JOIN - объединение таблиц

## Зачем нужны JOIN?

JOIN позволяет объединять данные из нескольких таблиц.

## INNER JOIN

\`\`\`sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

Возвращает только те записи, для которых есть совпадение в обеих таблицах.

## LEFT JOIN

\`\`\`sql
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
\`\`\`

Возвращает все записи из левой таблицы и совпадающие из правой.

## RIGHT JOIN

\`\`\`sql
SELECT users.name, orders.total
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
\`\`\`

Возвращает все записи из правой таблицы и совпадающие из левой.

## FULL OUTER JOIN

\`\`\`sql
SELECT users.name, orders.total
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;
\`\`\`

Возвращает все записи из обеих таблиц.

## Пример с несколькими JOIN

\`\`\`sql
SELECT
  users.name,
  orders.total,
  products.title
FROM users
INNER JOIN orders ON users.id = orders.user_id
INNER JOIN products ON orders.product_id = products.id;
\`\`\`
`,
  keyPoints: [
    'JOIN объединяет данные из разных таблиц',
    'INNER JOIN возвращает только совпадения',
    'LEFT JOIN возвращает все из левой таблицы',
    'Можно объединять более двух таблиц'
  ]
};

export const sql_m1_l5_content = {
  id: 'sql-m1-l5',
  moduleId: 'sql-m1',
  title: 'Агрегатные функции и GROUP BY',
  theory: `
# Агрегатные функции и GROUP BY

## Агрегатные функции

\`\`\`sql
-- COUNT - подсчет записей
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT city) FROM users;

-- SUM - сумма
SELECT SUM(total) FROM orders;

-- AVG - среднее значение
SELECT AVG(age) FROM users;

-- MIN и MAX
SELECT MIN(age), MAX(age) FROM users;
\`\`\`

## GROUP BY - группировка

\`\`\`sql
-- Количество пользователей по городам
SELECT city, COUNT(*) as user_count
FROM users
GROUP BY city;

-- Средний возраст по городам
SELECT city, AVG(age) as avg_age
FROM users
GROUP BY city;

-- Сумма заказов по пользователям
SELECT user_id, SUM(total) as total_orders
FROM orders
GROUP BY user_id;
\`\`\`

## HAVING - фильтрация после группировки

\`\`\`sql
-- Города с более чем 100 пользователями
SELECT city, COUNT(*) as user_count
FROM users
GROUP BY city
HAVING COUNT(*) > 100;

-- Пользователи с заказами на сумму > 10000
SELECT user_id, SUM(total) as total_orders
FROM orders
GROUP BY user_id
HAVING SUM(total) > 10000;
\`\`\`

## Порядок выполнения SQL

1. FROM
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. ORDER BY
7. LIMIT
`,
  keyPoints: [
    'Агрегатные функции вычисляют значения по группам',
    'GROUP BY группирует строки по столбцам',
    'HAVING фильтрует результаты после группировки',
    'WHERE работает до группировки, HAVING - после'
  ]
};

// ============================================
// МОДУЛЬ 2: ПРОДВИНУТЫЙ SQL
// ============================================

export const sql_m2_l1_content = {
  id: 'sql-m2-l1',
  moduleId: 'sql-m2',
  title: 'Подзапросы (Subqueries)',
  theory: `
# Подзапросы (Subqueries)

## Что такое подзапрос?

Подзапрос — это SQL запрос внутри другого запроса.

## Подзапрос в WHERE

\`\`\`sql
-- Найти пользователей, которые сделали заказы
SELECT name FROM users
WHERE id IN (
  SELECT DISTINCT user_id FROM orders
);

-- Найти пользователей старше среднего возраста
SELECT name, age FROM users
WHERE age > (
  SELECT AVG(age) FROM users
);
\`\`\`

## Подзапрос в FROM

\`\`\`sql
-- Использовать результат подзапроса как таблицу
SELECT city, avg_age
FROM (
  SELECT city, AVG(age) as avg_age
  FROM users
  GROUP BY city
) AS city_stats
WHERE avg_age > 25;
\`\`\`

## Подзапрос в SELECT

\`\`\`sql
-- Добавить вычисляемый столбец
SELECT
  name,
  age,
  (SELECT AVG(age) FROM users) as avg_age,
  age - (SELECT AVG(age) FROM users) as diff
FROM users;
\`\`\`

## Коррелированные подзапросы

\`\`\`sql
-- Найти сотрудников с зарплатой выше средней в их отделе
SELECT e1.name, e1.salary, e1.department
FROM employees e1
WHERE e1.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department = e1.department
);
\`\`\`

## EXISTS и NOT EXISTS

\`\`\`sql
-- Найти пользователей, у которых есть заказы
SELECT name FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
);

-- Найти пользователей без заказов
SELECT name FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
);
\`\`\`
`,
  keyPoints: [
    'Подзапросы могут использоваться в WHERE, FROM, SELECT',
    'IN проверяет наличие значения в результате подзапроса',
    'EXISTS проверяет наличие строк в подзапросе',
    'Коррелированные подзапросы ссылаются на внешний запрос'
  ]
};

export const sql_m2_l2_content = {
  id: 'sql-m2-l2',
  moduleId: 'sql-m2',
  title: 'Индексы и оптимизация',
  theory: `
# Индексы и оптимизация

## Что такое индекс?

Индекс — это структура данных, которая ускоряет поиск в таблице.

## Создание индекса

\`\`\`sql
-- Простой индекс
CREATE INDEX idx_users_email ON users(email);

-- Уникальный индекс
CREATE UNIQUE INDEX idx_users_username ON users(username);

-- Составной индекс
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);
\`\`\`

## Удаление индекса

\`\`\`sql
DROP INDEX idx_users_email;
\`\`\`

## EXPLAIN - анализ запроса

\`\`\`sql
-- Посмотреть план выполнения запроса
EXPLAIN SELECT * FROM users WHERE email = 'test@mail.ru';

-- Подробный анализ
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
\`\`\`

## Оптимизация запросов

### 1. Используйте индексы для часто фильтруемых столбцов

\`\`\`sql
-- Плохо (без индекса на email)
SELECT * FROM users WHERE email = 'test@mail.ru';

-- Хорошо (с индексом)
CREATE INDEX idx_users_email ON users(email);
SELECT * FROM users WHERE email = 'test@mail.ru';
\`\`\`

### 2. Избегайте SELECT *

\`\`\`sql
-- Плохо
SELECT * FROM users;

-- Хорошо
SELECT id, name, email FROM users;
\`\`\`

### 3. Используйте LIMIT

\`\`\`sql
-- Ограничьте результаты
SELECT * FROM users LIMIT 100;
\`\`\`

### 4. Оптимизируйте JOIN

\`\`\`sql
-- Убедитесь, что столбцы JOIN проиндексированы
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_users_id ON users(id);

SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
\`\`\`

## Когда НЕ нужны индексы

- На маленьких таблицах (< 1000 строк)
- На столбцах, которые часто обновляются
- На столбцах с низкой селективностью (мало уникальных значений)
`,
  keyPoints: [
    'Индексы ускоряют поиск, но замедляют вставку/обновление',
    'EXPLAIN показывает план выполнения запроса',
    'Индексируйте столбцы в WHERE, JOIN, ORDER BY',
    'Избегайте SELECT * и используйте LIMIT'
  ]
};

export const sql_m2_l3_content = {
  id: 'sql-m2-l3',
  moduleId: 'sql-m2',
  title: 'Транзакции и ACID',
  theory: `
# Транзакции и ACID

## Что такое транзакция?

Транзакция — это группа SQL операций, которые выполняются как единое целое.

## Базовый синтаксис

\`\`\`sql
-- Начать транзакцию
BEGIN;

-- Выполнить операции
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Завершить транзакцию
COMMIT;
\`\`\`

## Откат транзакции

\`\`\`sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Что-то пошло не так
ROLLBACK; -- Отменить все изменения
\`\`\`

## ACID принципы

### Atomicity (Атомарность)

Все операции выполняются полностью или не выполняются вообще.

\`\`\`sql
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 1000);
  UPDATE products SET stock = stock - 1 WHERE id = 5;
  -- Либо обе операции, либо ни одной
COMMIT;
\`\`\`

### Consistency (Согласованность)

База данных переходит из одного корректного состояния в другое.

\`\`\`sql
BEGIN;
  -- Проверка ограничений
  UPDATE accounts SET balance = balance - 100 WHERE id = 1;
  -- Если balance < 0, транзакция откатится
COMMIT;
\`\`\`

### Isolation (Изолированность)

Транзакции не мешают друг другу.

\`\`\`sql
-- Уровни изоляции
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
\`\`\`

### Durability (Долговечность)

После COMMIT данные сохраняются навсегда.

## Пример: Перевод денег

\`\`\`sql
BEGIN;

-- Проверить баланс
SELECT balance FROM accounts WHERE id = 1;

-- Если достаточно средств
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Записать в историю
INSERT INTO transactions (from_account, to_account, amount)
VALUES (1, 2, 100);

COMMIT;
\`\`\`

## Savepoints (Точки сохранения)

\`\`\`sql
BEGIN;

UPDATE products SET price = price * 1.1;

SAVEPOINT price_update;

UPDATE products SET stock = 0 WHERE discontinued = true;

-- Откатиться к точке сохранения
ROLLBACK TO price_update;

COMMIT;
\`\`\`
`,
  keyPoints: [
    'Транзакции обеспечивают целостность данных',
    'ACID - ключевые принципы транзакций',
    'COMMIT сохраняет изменения, ROLLBACK отменяет',
    'Используйте транзакции для связанных операций'
  ]
};

export const sql_m2_l4_content = {
  id: 'sql-m2-l4',
  moduleId: 'sql-m2',
  title: 'Представления (Views)',
  theory: `
# Представления (Views)

## Что такое представление?

Представление (View) — это виртуальная таблица, основанная на результате SQL запроса.

## Создание представления

\`\`\`sql
CREATE VIEW active_users AS
SELECT id, name, email, created_at
FROM users
WHERE active = true;
\`\`\`

## Использование представления

\`\`\`sql
-- Использовать как обычную таблицу
SELECT * FROM active_users;

SELECT name, email FROM active_users
WHERE created_at > '2024-01-01';
\`\`\`

## Преимущества представлений

### 1. Упрощение сложных запросов

\`\`\`sql
-- Сложный запрос
CREATE VIEW user_stats AS
SELECT
  u.id,
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent,
  AVG(o.total) as avg_order
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Простое использование
SELECT * FROM user_stats WHERE order_count > 5;
\`\`\`

### 2. Безопасность данных

\`\`\`sql
-- Скрыть чувствительные данные
CREATE VIEW public_users AS
SELECT id, name, city
FROM users;
-- email и password скрыты
\`\`\`

### 3. Логическая независимость

\`\`\`sql
-- Представление адаптирует изменения структуры таблиц
CREATE VIEW customer_info AS
SELECT
  u.name as customer_name,
  u.email,
  a.street,
  a.city
FROM users u
LEFT JOIN addresses a ON u.id = a.user_id;
\`\`\`

## Изменение представления

\`\`\`sql
CREATE OR REPLACE VIEW active_users AS
SELECT id, name, email, created_at, last_login
FROM users
WHERE active = true AND last_login > NOW() - INTERVAL '30 days';
\`\`\`

## Удаление представления

\`\`\`sql
DROP VIEW active_users;
\`\`\`

## Материализованные представления

\`\`\`sql
-- PostgreSQL
CREATE MATERIALIZED VIEW user_stats_materialized AS
SELECT
  u.id,
  u.name,
  COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;

-- Обновить данные
REFRESH MATERIALIZED VIEW user_stats_materialized;
\`\`\`

## Обновляемые представления

\`\`\`sql
-- Простое представление (можно обновлять)
CREATE VIEW high_value_customers AS
SELECT id, name, email, loyalty_points
FROM users
WHERE loyalty_points > 1000;

-- Обновление через представление
UPDATE high_value_customers
SET loyalty_points = loyalty_points + 100
WHERE id = 5;
\`\`\`
`,
  keyPoints: [
    'Views упрощают сложные запросы и повышают безопасность',
    'Представления — это виртуальные таблицы',
    'Материализованные Views хранят данные физически',
    'Можно обновлять данные через простые Views'
  ]
};

// ============================================
// МОДУЛЬ 3: РАБОТА С POSTGRESQL
// ============================================

export const sql_m3_l1_content = {
  id: 'sql-m3-l1',
  moduleId: 'sql-m3',
  title: 'Установка и настройка PostgreSQL',
  theory: `
# Установка и настройка PostgreSQL

## Установка PostgreSQL

### Windows

1. Скачайте установщик с postgresql.org
2. Запустите установщик
3. Выберите компоненты (PostgreSQL Server, pgAdmin, Command Line Tools)
4. Установите пароль для суперпользователя postgres
5. Выберите порт (по умолчанию 5432)

### macOS

\`\`\`bash
# Через Homebrew
brew install postgresql@15
brew services start postgresql@15
\`\`\`

### Linux (Ubuntu/Debian)

\`\`\`bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
\`\`\`

## Первое подключение

\`\`\`bash
# Подключиться как пользователь postgres
psql -U postgres

# В Windows через pgAdmin или командную строку
psql -U postgres -W
\`\`\`

## Базовые команды psql

\`\`\`sql
-- Список баз данных
\\l

-- Подключиться к базе данных
\\c database_name

-- Список таблиц
\\dt

-- Описание таблицы
\\d table_name

-- Список пользователей
\\du

-- Выход
\\q
\`\`\`

## Создание базы данных

\`\`\`sql
-- Создать базу данных
CREATE DATABASE my_shop;

-- Подключиться к базе
\\c my_shop

-- Создать таблицу
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Создание пользователя

\`\`\`sql
-- Создать пользователя
CREATE USER shop_user WITH PASSWORD 'secure_password';

-- Дать права на базу данных
GRANT ALL PRIVILEGES ON DATABASE my_shop TO shop_user;

-- Дать права на таблицы
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO shop_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO shop_user;
\`\`\`

## Конфигурация postgresql.conf

Основные параметры:

\`\`\`conf
# Максимум подключений
max_connections = 100

# Память для операций
shared_buffers = 256MB
work_mem = 4MB

# Логирование
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d.log'
\`\`\`

## pg_hba.conf - контроль доступа

\`\`\`conf
# Локальные подключения
local   all   all   md5

# IPv4 подключения
host    all   all   127.0.0.1/32   md5

# Разрешить подключения из сети
host    all   all   192.168.1.0/24   md5
\`\`\`

## Backup и Restore

\`\`\`bash
# Создать backup
pg_dump -U postgres my_shop > backup.sql

# Восстановить из backup
psql -U postgres my_shop < backup.sql

# Backup всех баз данных
pg_dumpall -U postgres > all_databases.sql
\`\`\`
`,
  keyPoints: [
    'PostgreSQL - мощная open-source СУБД',
    'psql - консольный клиент для работы с PostgreSQL',
    'Используйте pg_dump для создания резервных копий',
    'pg_hba.conf управляет доступом к базе данных'
  ]
};

export const sql_m3_l2_content = {
  id: 'sql-m3-l2',
  moduleId: 'sql-m3',
  title: 'Особенности PostgreSQL',
  theory: `
# Особенности PostgreSQL

## Типы данных PostgreSQL

### Специальные типы

\`\`\`sql
-- JSON
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200),
  attributes JSONB
);

INSERT INTO products (name, attributes)
VALUES ('Laptop', '{"brand": "Dell", "ram": "16GB", "ssd": "512GB"}');

-- Запросы к JSON
SELECT name, attributes->>'brand' as brand
FROM products
WHERE attributes->>'ram' = '16GB';

-- Array (массив)
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  tags TEXT[]
);

INSERT INTO posts (title, tags)
VALUES ('SQL Tutorial', ARRAY['sql', 'database', 'tutorial']);

-- UUID
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## SERIAL и IDENTITY

\`\`\`sql
-- SERIAL (старый способ)
CREATE TABLE users_old (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

-- IDENTITY (современный способ)
CREATE TABLE users_new (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100)
);
\`\`\`

## Полнотекстовый поиск

\`\`\`sql
-- Создать индекс для поиска
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title TEXT,
  content TEXT,
  search_vector TSVECTOR
);

-- Обновить поисковый вектор
UPDATE articles
SET search_vector = to_tsvector('russian', title || ' ' || content);

-- Создать индекс
CREATE INDEX idx_search ON articles USING GIN(search_vector);

-- Поиск
SELECT title
FROM articles
WHERE search_vector @@ to_tsquery('russian', 'PostgreSQL');
\`\`\`

## Window Functions (Оконные функции)

\`\`\`sql
-- ROW_NUMBER - нумерация строк
SELECT
  name,
  salary,
  department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees;

-- RANK и DENSE_RANK
SELECT
  name,
  score,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM students;

-- LAG и LEAD (предыдущее/следующее значение)
SELECT
  date,
  revenue,
  LAG(revenue) OVER (ORDER BY date) as prev_revenue,
  LEAD(revenue) OVER (ORDER BY date) as next_revenue
FROM daily_sales;
\`\`\`

## CTE (Common Table Expressions)

\`\`\`sql
-- WITH для временных результатов
WITH high_earners AS (
  SELECT name, salary, department
  FROM employees
  WHERE salary > 100000
),
dept_stats AS (
  SELECT department, COUNT(*) as count
  FROM high_earners
  GROUP BY department
)
SELECT * FROM dept_stats ORDER BY count DESC;

-- Рекурсивный CTE
WITH RECURSIVE subordinates AS (
  -- Начальное условие
  SELECT id, name, manager_id, 1 as level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Рекурсивная часть
  SELECT e.id, e.name, e.manager_id, s.level + 1
  FROM employees e
  INNER JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates;
\`\`\`

## UPSERT (INSERT ... ON CONFLICT)

\`\`\`sql
-- Вставить или обновить
INSERT INTO users (id, name, email)
VALUES (1, 'Ivan', 'ivan@mail.ru')
ON CONFLICT (id)
DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email;

-- Вставить или ничего не делать
INSERT INTO products (sku, name, price)
VALUES ('ABC123', 'Product', 99.99)
ON CONFLICT (sku) DO NOTHING;
\`\`\`

## Расширения (Extensions)

\`\`\`sql
-- Включить UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PostGIS для геоданных
CREATE EXTENSION IF NOT EXISTS postgis;

-- pg_trgm для похожего поиска
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Похожий поиск
SELECT name FROM products
WHERE name % 'Laptpo'; -- найдет "Laptop"
\`\`\`
`,
  keyPoints: [
    'PostgreSQL поддерживает JSON, массивы, UUID',
    'Оконные функции для сложной аналитики',
    'CTE делают запросы более читаемыми',
    'UPSERT для вставки или обновления'
  ]
};

export const sql_m3_l3_content = {
  id: 'sql-m3-l3',
  moduleId: 'sql-m3',
  title: 'Практический проект: База данных интернет-магазина',
  theory: `
# Практический проект: База данных интернет-магазина

## Структура базы данных

Создадим полноценную базу данных для интернет-магазина.

### 1. Таблица пользователей

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по email
CREATE INDEX idx_users_email ON users(email);
\`\`\`

### 2. Таблица категорий

\`\`\`sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  parent_id INTEGER REFERENCES categories(id),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### 3. Таблица товаров

\`\`\`sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  sku VARCHAR(100) UNIQUE,
  images JSONB,
  attributes JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
\`\`\`

### 4. Таблица заказов

\`\`\`sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);
\`\`\`

### 5. Таблица позиций заказа

\`\`\`sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
\`\`\`

### 6. Таблица корзины

\`\`\`sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, product_id)
);
\`\`\`

## Наполнение данными

\`\`\`sql
-- Добавить категории
INSERT INTO categories (name, slug, parent_id) VALUES
('Электроника', 'electronics', NULL),
('Ноутбуки', 'laptops', 1),
('Смартфоны', 'smartphones', 1),
('Одежда', 'clothing', NULL),
('Мужская', 'mens-clothing', 4);

-- Добавить товары
INSERT INTO products (category_id, name, slug, price, stock, sku, description) VALUES
(2, 'MacBook Pro 16"', 'macbook-pro-16', 249990.00, 10, 'MBP-16-2023', 'Мощный ноутбук для профессионалов'),
(2, 'Dell XPS 15', 'dell-xps-15', 189990.00, 15, 'DELL-XPS-15', 'Отличный ноутбук для работы'),
(3, 'iPhone 15 Pro', 'iphone-15-pro', 129990.00, 25, 'IP15-PRO', 'Новейший iPhone от Apple');

-- Добавить пользователей
INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('ivan@mail.ru', 'hash123', 'Иван', 'Петров', '+79001234567'),
('maria@mail.ru', 'hash456', 'Мария', 'Иванова', '+79007654321');
\`\`\`

## Полезные запросы

### Товары по категориям

\`\`\`sql
SELECT
  c.name as category,
  p.name as product,
  p.price,
  p.stock
FROM products p
JOIN categories c ON p.category_id = c.id
WHERE p.is_active = true
ORDER BY c.name, p.name;
\`\`\`

### Популярные товары

\`\`\`sql
SELECT
  p.name,
  COUNT(oi.id) as times_ordered,
  SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_sold DESC
LIMIT 10;
\`\`\`

### История заказов пользователя

\`\`\`sql
SELECT
  o.id as order_id,
  o.created_at,
  o.status,
  o.total,
  json_agg(
    json_build_object(
      'product', p.name,
      'quantity', oi.quantity,
      'price', oi.price
    )
  ) as items
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.user_id = 1
GROUP BY o.id
ORDER BY o.created_at DESC;
\`\`\`

### Выручка по дням

\`\`\`sql
SELECT
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total) as revenue
FROM orders
WHERE status = 'completed'
GROUP BY DATE(created_at)
ORDER BY date DESC;
\`\`\`
`,
  keyPoints: [
    'Используйте REFERENCES для связей между таблицами',
    'Добавляйте CHECK для валидации данных',
    'Создавайте индексы на часто используемых столбцах',
    'JSONB удобен для гибких атрибутов товаров'
  ]
};

// ============================================
// КВИЗЫ
// ============================================

export const sql_m1_l1_quiz = {
  id: 'quiz-sql-m1-l1',
  lessonId: 'sql-m1-l1',
  title: 'Тест: Введение в SQL',
  description: 'Проверьте понимание основ баз данных',
  questions: [
    {
      id: 'q1',
      type: 'single-choice' as const,
      question: 'Что означает аббревиатура SQL?',
      options: [
        { id: 'a', text: 'Structured Query Language' },
        { id: 'b', text: 'Simple Question Language' },
        { id: 'c', text: 'Standard Query Library' },
        { id: 'd', text: 'System Queue Language' }
      ],
      correctAnswer: 'a',
      explanation: 'SQL расшифровывается как Structured Query Language - язык структурированных запросов.',
      points: 25
    },
    {
      id: 'q2',
      type: 'single-choice' as const,
      question: 'Какая команда относится к DML?',
      options: [
        { id: 'a', text: 'CREATE' },
        { id: 'b', text: 'SELECT' },
        { id: 'c', text: 'DROP' },
        { id: 'd', text: 'ALTER' }
      ],
      correctAnswer: 'b',
      explanation: 'SELECT - команда манипуляции данными (DML). CREATE, DROP, ALTER - команды определения данных (DDL).',
      points: 25
    },
    {
      id: 'q3',
      type: 'single-choice' as const,
      question: 'Что хранится в реляционной базе данных?',
      options: [
        { id: 'a', text: 'Файлы' },
        { id: 'b', text: 'Таблицы' },
        { id: 'c', text: 'Документы' },
        { id: 'd', text: 'Графы' }
      ],
      correctAnswer: 'b',
      explanation: 'Реляционные базы данных хранят данные в виде таблиц со строками и столбцами.',
      points: 25
    },
    {
      id: 'q4',
      type: 'single-choice' as const,
      question: 'Какой тип БД использует SQL?',
      options: [
        { id: 'a', text: 'NoSQL' },
        { id: 'b', text: 'Реляционные' },
        { id: 'c', text: 'Графовые' },
        { id: 'd', text: 'Документные' }
      ],
      correctAnswer: 'b',
      explanation: 'SQL используется для работы с реляционными базами данных.',
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
// ЭКСПОРТ МАППИНГА
// ============================================

export const sqlLessonContentMap: Record<string, any> = {
  // Модуль 1: Основы SQL
  'sql-m1-l1': sql_m1_l1_content,
  'sql-m1-l2': sql_m1_l2_content,
  'sql-m1-l3': sql_m1_l3_content,
  'sql-m1-l4': sql_m1_l4_content,
  'sql-m1-l5': sql_m1_l5_content,
  // Модуль 2: Продвинутый SQL
  'sql-m2-l1': sql_m2_l1_content,
  'sql-m2-l2': sql_m2_l2_content,
  'sql-m2-l3': sql_m2_l3_content,
  'sql-m2-l4': sql_m2_l4_content,
  // Модуль 3: Работа с PostgreSQL
  'sql-m3-l1': sql_m3_l1_content,
  'sql-m3-l2': sql_m3_l2_content,
  'sql-m3-l3': sql_m3_l3_content,
};

export const sqlLessonQuizMap: Record<string, any> = {
  'sql-m1-l1': sql_m1_l1_quiz,
};

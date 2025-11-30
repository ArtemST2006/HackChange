-- Вставка студентов
INSERT INTO student (user_name, email, hash_password) VALUES
  ('ivan_ivanov', 'ivan@example.com', 'hash123'),
  ('maria_petrova', 'maria@example.com', 'hash456'),
  ('alex_smirnov', 'alex@example.com', 'hash789'),
  ('elena_kozlova', 'elena@example.com', 'hash101'),
  ('dmitry_volkov', 'dmitry@example.com', 'hash202');

-- Вставка преподавателей
INSERT INTO professor (email, username) VALUES
  ('prof.math@example.com', 'dr_algebra'),
  ('prof.cs@example.com', 'code_master'),
  ('prof.phys@example.com', 'quantum_guru');

-- Вставка курсов
INSERT INTO courses (course_name, professor_id, type, description) VALUES
  ('Linear Algebra', 1, 'Math', 'Fundamentals of vector spaces and matrices.'),
  ('Web Development', 2, 'CS', 'Build modern web apps with Go and React.'),
  ('Quantum Mechanics', 3, 'Physics', 'Intro to quantum theory and applications.');

-- Вставка уроков
INSERT INTO lessons (course_id, lesson_name, description, video_url, text, homework) VALUES
  -- Linear Algebra
  (1, 'Vectors and Spaces', 'Introduction to vectors', 'minio://linear-algebra/v1.mp4', 'Text notes for vectors...', true),
  (1, 'Matrix Operations', 'Addition, multiplication, inverses', 'minio://linear-algebra/m1.mp4', 'Matrix notes...', false),
  -- Web Development
  (2, 'REST API in Go', 'Build your first backend', 'minio://webdev/go1.mp4', 'Go handler examples...', true),
  (2, 'Frontend with React', 'State and components', 'minio://webdev/react1.mp4', 'React hooks guide...', true),
  -- Quantum Mechanics
  (3, 'Wave Functions', 'Schrödinger equation basics', 'minio://quantum/wave1.mp4', 'Wave function notes...', true);

-- Связь студентов и курсов
INSERT INTO user_course (user_id, course_id) VALUES
  (1, 1), (1, 2),
  (2, 1),
  (3, 2), (3, 3),
  (4, 3),
  (5, 2);

-- Комментарии к курсам
INSERT INTO comments_courses (user_id, course_id, comment) VALUES
  (1, 1, 'Great course! Very clear explanations.'),
  (2, 1, 'Could use more practice problems.'),
  (3, 2, 'Loved the Go examples!'),
  (4, 3, 'Quantum is hard but fascinating.');

-- Комментарии к урокам
INSERT INTO comments_lessons (user_id, lesson_id, comment) VALUES
  (1, 1, 'Vectors finally make sense!'),
  (3, 3, 'The Go code helped a lot.'),
  (5, 4, 'React hooks section was too fast.');

-- Домашние задания
INSERT INTO homework (student_id, lesson_id, file_path) VALUES
  (1, 1, 'minio://homework/ivan_vectors.pdf'),
  (3, 3, 'minio://homework/alex_gorest.zip'),
  (5, 4, 'minio://homework/dmitry_react.zip');

-- Оценки
INSERT INTO marks (homework_id, professor_id, mark, description) VALUES
  (1, 1, 9, 'Excellent vector diagrams'),
  (2, 2, 8, 'Good API structure, add validation'),
  (3, 2, 7, 'React code works, but needs cleanup');

-- Обновление homework.mark_id (опционально)
UPDATE homework SET mark_id = 1 WHERE id = 1;
UPDATE homework SET mark_id = 2 WHERE id = 2;
UPDATE homework SET mark_id = 3 WHERE id = 3;

-- Данные студентов
INSERT INTO student_data (user_id, name, date_of_birth, course, gpa) VALUES
  (1, 'Ivan Ivanov', '2003-05-12', 'Computer Science', 3.85),
  (2, 'Maria Petrova', '2004-08-22', 'Mathematics', 4.00),
  (3, 'Alex Smirnov', '2002-11-30', 'Computer Science', 3.50),
  (4, 'Elena Kozlova', '2003-02-14', 'Physics', 3.90),
  (5, 'Dmitry Volkov', '2004-06-05', 'Computer Science', 3.20);

-- Данные преподавателей
INSERT INTO professor_data (professor_id, name, date_of_birth) VALUES
  (1, 'Dr. Anna Sokolova', '1980-03-10'),
  (2, 'Prof. Mikhail Orlov', '1975-07-25'),
  (3, 'Dr. Elena Nikolaeva', '1982-12-01');
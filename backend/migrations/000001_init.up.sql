
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    hash_password TEXT NOT NULL
);

CREATE TABLE professor (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) UNIQUE NOT NULL,
    professor_id INTEGER NOT NULL REFERENCES professor(id) ON DELETE CASCADE,
    type TEXT,
    description TEXT
);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_name TEXT,
    description TEXT,
    video_url TEXT,
    text TEXT,
    homework BOOLEAN DEFAULT false
);

CREATE TABLE user_course (
    user_id INTEGER REFERENCES student(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, course_id)
);

CREATE TABLE comments_courses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    comment TEXT NOT NULL
);

CREATE TABLE comments_lessons (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    comment TEXT NOT NULL
);

CREATE TABLE homework (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES student(id) ON DELETE CASCADE,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    file_path TEXT
);

CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    homework_id INTEGER NOT NULL REFERENCES homework(id) ON DELETE CASCADE,
    professor_id INTEGER NOT NULL REFERENCES professor(id) ON DELETE RESTRICT,
    mark INTEGER CHECK (mark >= 0 AND mark <= 10),
    description TEXT
);

ALTER TABLE homework
ADD COLUMN mark_id INTEGER REFERENCES marks(id) ON DELETE SET NULL;

CREATE TABLE student_data (
    user_id INTEGER PRIMARY KEY REFERENCES student(id) ON DELETE CASCADE,
    student_cards TEXT,
    name VARCHAR(255),
    date_of_birth DATE,
    course VARCHAR(255),  -- можно оставить, если нужно для кэширования
    gpa NUMERIC(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0)
);

CREATE TABLE professor_data (
    professor_id INTEGER PRIMARY KEY REFERENCES professor(id) ON DELETE CASCADE,
    name VARCHAR(255),
    date_of_birth DATE
);
# HackChange — Образовательная платформа (прототип)

Краткое описание
-----------------
HackChange — прототип образовательной платформы для студентов и преподавателей. Проект содержит backend на Go и frontend на React + Vite. В README указаны структура проекта, инструкции по запуску, необходимые переменные окружения, зависимости и роли участников команды.



Структура проекта
-----------------

Корневая структура (основные папки/файлы):

- `backend/` — Go сервисы, миграции, внутренние пакеты
  - `cmd/` — исполняемые команды
  - `internal/` — реализация сервера, обработчиков, репозиториев и сервисов
  - `migrations/` — SQL миграции
  - `dockerfile` — Dockerfile для backend

- `frontend/` — клиент на React + Vite
  - `src/` — исходники React приложения
  - `public/` — публичные ресурсы
  - `Dockerfile` — Dockerfile для frontend

- `docker-compose.yml` — локальная сборка сервисов (postgres, minio и пр.)
- `.env` — файл с переменными окружения (не храните секреты в публичном репозитории)
- `README.md` — этот файл

Ключевые файлы
---------------

- `frontend/src/services/api/*` — клиентские сервисы для обращения к бэкенду
- `frontend/src/types/*` — типы TypeScript
- `backend/internal/handlers` — HTTP обработчики
- `backend/migrations` — SQL-миграции для инициализации БД

Требования (локальная разработка)
---------------------------------

- Docker (рекомендуется) — версия >= 20.x
- docker-compose — версия >= 1.29
- Node.js — 20.x (используется в Dockerfile frontend)
- npm — 9.x (или совместимая с Node 20)
- Go — 1.20+ (либо версия, указанная в `go.mod`)

Переменные окружения
---------------------

Пример `.env` (указан в корне репозитория). Обратите внимание: для публичного репозитория не храните реальные секреты.

```properties
JWT_SECRET="<your_jwt_secret>"

DATABASE_URL=postgresql://user:password@postgres:5432/dbname?sslmode=disable
DB_HOST=postgres
DB_PORT=5432
DB_NAME=dbname
DB_USER=user
DB_PASSWORD=password
SSL_MODE=disable

MINIO_ENDPOINT=localhost:9000
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin
```

Инструкция по запуску (с Docker)
--------------------------------

1. Склонируйте репозиторий и перейдите в папку проекта:

```bash
git clone https://github.com/<your-org-or-user>/HackChange.git
cd HackChange
```

2. Создайте файл `.env` в корне проекта на основе примера выше и заполните значения.

3. Запустите все сервисы через docker-compose:

```bash
docker-compose up --build -d
```

4. Логи можно посмотреть так:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

5. После успешного запуска фронтенд будет доступен по адресу `http://localhost:5173` (или порту, указанном в `docker-compose.yml`), бэкенд — `http://localhost:8000`.

Инструкция по локальной разработке без Docker
--------------------------------------------

Backend (Go):

```bash
cd backend
go mod download

export DATABASE_URL='postgresql://user:pass@localhost:5432/dbname?sslmode=disable'
go run ./cmd/app
```

Frontend (React + Vite):

```bash
cd frontend
npm ci
npm run dev
```

Тестирование и миграции
------------------------

Миграции находятся в `backend/migrations`. Для применения миграций используйте выбранный инструмент миграций (например, `golang-migrate`) или выполните SQL напрямую в Postgres перед запуском сервера.

Зависимости и версии
---------------------

- Node: 20.x (используется в Dockerfile)
- npm: 9.x
- Go: версия указана в `go.mod` (рекомендуется >= 1.20)
- Postgres: 13+ рекомендуется

Структура проекта (подробно)
---------------------------

- `backend/`
  - `cmd/app` — точка входа для приложения (основной HTTP сервер)
  - `internal/config` — конфигурация приложения
  - `internal/handlers` — HTTP handlers для API
  - `internal/repository/postgres` — реализация доступа к БД
  - `internal/services` — бизнес-логика

- `frontend/`
  - `src/pages/` — страницы приложения (Dashboard, Courses, Login и т.д.)
  - `src/components/` — переиспользуемые компоненты (Slider, Card и др.)
  - `src/services/api` — клиентские сервисы для запросов к backend
  - `src/utils` — адаптеры и вспомогательные функции

Команда
-------

- Юдин Артем — тимлид
- Степанов Артем — backend
- Воробьёв Андрей — backend
- Соловьёв Ярослав — frontend
- Гарькавый Максим — product manager



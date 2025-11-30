# 🚀 Production Deployment Guide

## Статус: ✅ ГОТОВ К РАЗВЕРТЫВАНИЮ

Проект полностью готов для развертывания на production сервере.

---

## 📋 Предварительные Требования

### Сервер:
- **OS:** Linux (Ubuntu 20.04+ / CentOS 8+)
- **RAM:** Минимум 4GB (рекомендуется 8GB+)
- **CPU:** 2+ cores
- **Disk:** 20GB+ свободного места
- **Network:** Открыты порты 80, 443, 8000, 5432, 9000

### Установленное ПО:
```bash
# Docker & Docker Compose
docker --version  # 20.10+
docker-compose --version  # 1.29+

# Git
git --version
```

---

## 🔧 Шаг 1: Клонирование Репозитория

```bash
# Клонируйте проект
cd /opt
git clone <your-repository-url> psb-academy
cd psb-academy
```

---

## 🔐 Шаг 2: Настройка Environment Variables

### Backend (.env):

```bash
# Создайте .env файл
cp .env.example .env

# Отредактируйте .env
nano .env
```

**Важные параметры для production:**

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=psb_academy
DB_USER=postgres
DB_PASSWORD=CHANGE_THIS_SECURE_PASSWORD  # ← ИЗМЕНИТЕ!
DATABASE_URL=postgresql://postgres:CHANGE_THIS_SECURE_PASSWORD@postgres:5432/psb_academy?sslmode=disable
SSL_MODE=disable

# JWT Secret (ОБЯЗАТЕЛЬНО ИЗМЕНИТЕ!)
JWT_SECRET=your_production_jwt_secret_min_32_characters_long  # ← ИЗМЕНИТЕ!

# MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=CHANGE_THIS_MINIO_PASSWORD  # ← ИЗМЕНИТЕ!
MINIO_ENDPOINT=minio:9000
MINIO_BUCKET=homework-files

# App
ENVIRONMENT=production
PORT=8000
```

### Frontend (.env.production):

```bash
cd frontend
nano .env.production
```

**Измените URL на ваш production домен:**

```env
# Если backend на том же сервере
VITE_API_BASE_URL=http://your-domain.com:8000

# Или если используете nginx reverse proxy
VITE_API_BASE_URL=http://your-domain.com/api

# Остальное можно оставить как есть
VITE_USE_MOCK_DATA=false
VITE_MAX_FILE_SIZE=104857600
VITE_MAX_FILES_COUNT=10
```

---

## 🏗️ Шаг 3: Build и Запуск

### Вариант A: Полный Docker Compose (Рекомендуется)

```bash
# Вернитесь в корень проекта
cd /opt/psb-academy

# Соберите и запустите все сервисы
docker-compose up -d --build

# Проверьте статус
docker-compose ps

# Должны быть запущены:
# - postgres (порт 5432)
# - backend (порт 8000)
# - minio (порт 9000)
# - frontend (порт 80)
```

### Вариант B: Раздельный запуск

#### Backend + Инфраструктура:
```bash
# Только backend сервисы
docker-compose up -d postgres minio backend
```

#### Frontend отдельно:
```bash
cd frontend

# Build production версии
npm run build

# Запуск через nginx (docker-compose)
cd ..
docker-compose up -d frontend
```

---

## 🔍 Шаг 4: Проверка Работоспособности

### Проверка Backend:
```bash
# Health check
curl http://localhost:8000/health

# Проверка CORS
curl -I -X OPTIONS http://localhost:8000/auth/login
```

### Проверка Frontend:
```bash
# Открыть в браузере
http://your-server-ip

# Или через curl
curl http://localhost:80
```

### Проверка Database:
```bash
# Войти в контейнер postgres
docker exec -it psb-academy-postgres-1 psql -U postgres -d psb_academy

# Проверить таблицы
\dt

# Выйти
\q
```

### Проверка MinIO:
```bash
# Открыть в браузере
http://your-server-ip:9000

# Логин: minioadmin (или ваш из .env)
# Пароль: из MINIO_ROOT_PASSWORD
```

---

## 🌐 Шаг 5: Настройка Nginx Reverse Proxy (Опционально)

Если хотите использовать один домен для frontend и backend:

```bash
# Установите nginx на хосте
sudo apt install nginx

# Создайте конфигурацию
sudo nano /etc/nginx/sites-available/psb-academy
```

**Конфигурация nginx:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # ВАЖНО для cookies
        proxy_set_header Cookie $http_cookie;
        proxy_pass_header Set-Cookie;
    }

    # MinIO (опционально)
    location /minio/ {
        proxy_pass http://localhost:9000/;
        proxy_set_header Host $host;
    }
}
```

```bash
# Активируйте конфигурацию
sudo ln -s /etc/nginx/sites-available/psb-academy /etc/nginx/sites-enabled/

# Проверьте конфигурацию
sudo nginx -t

# Перезапустите nginx
sudo systemctl restart nginx
```

**Обновите frontend .env.production:**
```env
VITE_API_BASE_URL=http://your-domain.com/api
```

**Пересоберите frontend:**
```bash
docker-compose up -d --build frontend
```

---

## 🔒 Шаг 6: SSL/HTTPS (Рекомендуется)

### Установка Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
```

### Получение сертификата:
```bash
sudo certbot --nginx -d your-domain.com
```

**Обновите .env.production:**
```env
VITE_API_BASE_URL=https://your-domain.com/api
```

---

## 📊 Шаг 7: Мониторинг и Логи

### Просмотр логов:
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Статус контейнеров:
```bash
docker-compose ps
```

### Использование ресурсов:
```bash
docker stats
```

---

## 🔄 Обновление Приложения

### Pull новых изменений:
```bash
cd /opt/psb-academy
git pull origin main
```

### Перезапуск сервисов:
```bash
# Backend
docker-compose up -d --build backend

# Frontend
docker-compose up -d --build frontend

# Все сразу
docker-compose up -d --build
```

---

## 🛠️ Troubleshooting

### Backend не стартует:
```bash
# Проверьте логи
docker-compose logs backend

# Проверьте переменные окружения
docker-compose exec backend env

# Проверьте подключение к БД
docker-compose exec backend nc -zv postgres 5432
```

### Frontend показывает ошибки API:
```bash
# Проверьте VITE_API_BASE_URL в .env.production
cat frontend/.env.production

# Проверьте CORS в backend
docker-compose logs backend | grep CORS

# Проверьте доступность backend
curl http://localhost:8000/health
```

### Database connection refused:
```bash
# Проверьте что postgres запущен
docker-compose ps postgres

# Проверьте логи postgres
docker-compose logs postgres

# Перезапустите postgres
docker-compose restart postgres
```

### MinIO не работает:
```bash
# Проверьте логи
docker-compose logs minio

# Проверьте volumes
docker volume ls

# Пересоздайте minio
docker-compose up -d --force-recreate minio
```

---

## 🔐 Security Checklist

- [ ] Изменены все пароли в `.env`
- [ ] JWT_SECRET минимум 32 символа
- [ ] Используется HTTPS (SSL сертификат)
- [ ] Firewall настроен (только нужные порты)
- [ ] Database не доступна извне (только через docker network)
- [ ] MinIO credentials изменены
- [ ] CORS настроен правильно
- [ ] Rate limiting включен
- [ ] Логи настроены и ротируются

---

## 📈 Performance Optimization

### Database:
```bash
# Создайте индексы (если нужно)
docker exec -it psb-academy-postgres-1 psql -U postgres -d psb_academy

CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_courses_name ON courses(course_name);
CREATE INDEX idx_user_courses ON user_course(user_id, course_id);
```

### Backend:
- Используйте production build
- Настройте connection pooling для БД
- Включите gzip compression

### Frontend:
- Build создает минифицированные файлы
- Nginx кеширует статические файлы
- Gzip compression включен в nginx.conf

---

## 🔄 Backup Strategy

### Автоматический backup БД:
```bash
# Создайте скрипт backup.sh
cat > /opt/backup-db.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/opt/backups
mkdir -p $BACKUP_DIR

docker exec psb-academy-postgres-1 pg_dump -U postgres psb_academy > $BACKUP_DIR/db_backup_$DATE.sql

# Удалить бэкапы старше 7 дней
find $BACKUP_DIR -name "db_backup_*.sql" -mtime +7 -delete
EOF

chmod +x /opt/backup-db.sh

# Добавьте в crontab (каждый день в 2:00)
crontab -e
0 2 * * * /opt/backup-db.sh
```

### Backup MinIO:
```bash
# Backup MinIO data
docker exec psb-academy-minio-1 mc mirror /data /backup/minio
```

---

## ✅ Production Checklist

### Pre-deployment:
- [ ] `.env` файл создан и заполнен
- [ ] JWT_SECRET изменен
- [ ] Все пароли изменены
- [ ] `VITE_API_BASE_URL` указывает на production backend
- [ ] `VITE_USE_MOCK_DATA=false`

### Deployment:
- [ ] Docker и Docker Compose установлены
- [ ] Проект склонирован
- [ ] `docker-compose up -d --build` выполнен успешно
- [ ] Все 4 контейнера запущены

### Post-deployment:
- [ ] Frontend доступен на порту 80
- [ ] Backend отвечает на `/health`
- [ ] Database migrations применены
- [ ] MinIO доступен и bucket создан
- [ ] Регистрация работает
- [ ] Логин работает
- [ ] Загрузка файлов работает

### Optional:
- [ ] Nginx reverse proxy настроен
- [ ] SSL сертификат установлен
- [ ] Monitoring настроен
- [ ] Backup скрипты настроены
- [ ] Логи ротируются

---

## 🎯 Quick Start Commands

```bash
# Полная установка с нуля
git clone <repo> /opt/psb-academy
cd /opt/psb-academy
cp .env.example .env
nano .env  # Измените пароли и секреты
docker-compose up -d --build

# Проверка
docker-compose ps
curl http://localhost:8000/health
curl http://localhost:80

# Логи
docker-compose logs -f

# Остановка
docker-compose down

# Полная очистка (ОСТОРОЖНО!)
docker-compose down -v
```

---

## 📞 Support

При проблемах проверьте:
1. Логи: `docker-compose logs`
2. Переменные окружения в `.env`
3. Статус контейнеров: `docker-compose ps`
4. Network connectivity: `docker network ls`

---

## 🎉 Готово!

Проект развернут и готов к использованию!

- **Frontend:** http://your-domain.com
- **Backend API:** http://your-domain.com:8000
- **MinIO Console:** http://your-domain.com:9000

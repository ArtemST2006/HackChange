FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости (включая dev-зависимости для сборки)
RUN npm ci

# Копируем исходный код
COPY . .

# Устанавливаем переменные окружения для production build
# VITE_API_BASE_URL должна быть установлена при запуске docker build или в docker-compose.yml
ARG VITE_API_BASE_URL=http://146.185.210.135:8000
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Собираем приложение
RUN npm run build

# Финальный образ
FROM nginx:alpine

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из builder образа
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]

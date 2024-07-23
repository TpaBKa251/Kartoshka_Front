# Используйте официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build

# Устанавливаем сервер для сервировки собранного приложения
RUN npm install -g serve

# Экспонируем порт
EXPOSE 3000

# Запускаем сервер
CMD ["serve", "-s", "build"]

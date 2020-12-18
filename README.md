Дипломная работа - Backend для проекта news explorer
=============================
## Домены
- http(s)://api.news-explorer.students.nomoreparties.xyz
- http(s)://www.api.news-explorer.students.nomoreparties.xyz

## Публичный IP
130.193.49.59

## Запросы
- POST/signup - создается пользователь, для отправки обязательные поля: name, about, avatar, email, password 
- POST/signin - авторизация пользователя, для авторизации необходимо ввести email, password
- GET /users/me - выводится JSON объект конкретного юзера, если юзер не найден выводится ошибка 
- GET /articles - выводится JSON список всех статей 
- POST /articles - создается статья, для отправки обязательные поля: keyword, title, text, date, source, link, image
- DELETE/articles/:id - удаление собственных статей, пользователь не может удалить чужую статью
- Ошибки обрабатываются централизовано
- Производится сбор Логов (запросы и ошибки)
- Происходит валидация приходящих данных на сервер
 
## Инструкция как развернуть проект
- Клонировать репозиторий
- Установить node.js
- Установить необходимые пакеты командой: npm install
- Запустить сервер командой: npm run dev (hot reload) или npm run start

# Author: Konstantin Okhlynin
# [**English Readme**](https://github.com/KonstantinOkhlynin/news-explorer--backend/blob/master/README.EN.md)
# NewsExplorer-Backend
### Бэкенд для веб-сайта [NewsExplorer](https://github.com/KonstantinOkhlynin/news-explorer--frontend), который позволяет регистрировать и выполнять авторизацию пользователя на веб-сайте, а также сохранять и удалять статьи новостей в личном профиле пользователя. 
## Языки
### ‣ JavaScript(ES6);
## Среда выполнения кода
### ‣ Node.js;
## Используемые npm-пакеты
#### ‣ [bcryptjs](https://www.npmjs.com/package/bcryptjs);
#### ‣ [body-parser](https://www.npmjs.com/package/body-parser);
#### ‣ [celebrate](https://www.npmjs.com/package/celebrate);
#### ‣ [cookie-parser](https://www.npmjs.com/package/cookie-parser);
#### ‣ [cors](https://www.npmjs.com/package/cors);
#### ‣ [dotenv](https://www.npmjs.com/package/dotenv);
#### ‣ [express](https://www.npmjs.com/package/express);
#### ‣ [express-rate-limit](https://www.npmjs.com/package/express);
#### ‣ [express-winston](https://www.npmjs.com/package/express-winston);
#### ‣ [helmet](https://www.npmjs.com/package/helmet);
#### ‣ [jsonwebtoken](https://www.npmjs.com/package/file-loader);
#### ‣ [mongoose](https://www.npmjs.com/package/mongoose);
#### ‣ [validator](https://www.npmjs.com/package/validator);
#### ‣ [winston](https://www.npmjs.com/package/winston);
#### ‣ [eslint](https://www.npmjs.com/package/eslint);
#### ‣ [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base);
#### ‣ [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import);
#### ‣ [nodemon](https://www.npmjs.com/package/nodemon);
## Инструкция для проверки работоспособности бэкенда
### 1. У вас должны быть установлены следующие программы:
#### ‣ Postman(или аналоги);
#### ‣ MongoDB;
#### ‣ Node.js;
### 2. Далее выполняем слудующие шаги:
#### ‣ Устанавливаем npm-зависимости с помощью команды
```bash
# npm install
``` 
#### ‣ Запускаем бэкенд с помощью команды
```bash
# npm run dev
``` 
#### ‣ Запускаем Mongodb с помощью команды
```bash
# mongod
``` 
### 3. После чего открываем программу для тестирования Api (Postman и др.) и проверяем следующие запросы:
#### ‣ POST/`http://localhost:3000/signup` - создаётся новый пользователь. В теле необходимо указать следующие поля в формате JSON: 
##### ‣ name (Имя пользователя); 
##### ‣ email (Почта пользователя);
##### ‣ password (Пароль пользователя);
### Пример:
```json
{
    "name": "Kostya",
    "email": "Kostya.Okhlynin@gmail.com",
    "password": "frfsdk123lsd" 
}
```
#### ‣ POST/`http://localhost:3000/signin` - авторизация пользователя. В теле необходимо указать следующие поля в формате JSON:
##### ‣ email (Почта пользователя);
##### ‣ password (Пароль пользователя);
### Пример:
```json
{
    "email": "Kostya.Okhlynin@gmail.com",
    "password": "frfsdk123lsd" 
}
```
#### ‣ GET/`http://localhost:3000/users/me` - выводится JSON объект конкретного пользователя, если пользователь не найден выводится ошибка. Вместо `me` нужно подставить id пользователя, которого вы хотите найти. Обычно id возвращается при создании пользователя. 
#### ‣ GET/`http://localhost:3000/articles` - выводится JSON список всех статей.
#### ‣ POST/`http://localhost:3000/articles` - создается статья. В теле необходимо указать следующие поля в формате JSON: 
##### ‣ keyword (Ключевое слово, по которому статью нашли); 
##### ‣ title (Заголовок статьи);
##### ‣ text (Текст статьи);
##### ‣ date (Дата статьи);
##### ‣ source (Источник статьи);
##### ‣ link (Ссылка на статью);
##### ‣ image (Ссылка на иллюстрацию к статье);
##### ‣ owner (id пользователя, сохранившего статью);
### Пример:
```json
{
    "keyword": "Наука",
    "title": "Про плоскую землю",
    "text": "Земля круглая.",
    "date": "01.01.2021",
    "source": "science.com",
    "link": "https://science.com",
    "image": "https://science.com/image",
    "owner": "6035276828cc3d3a28658322"
}
```
#### ‣ DELETE/`http://localhost:3000/articles/:id` - удаление собственных статей. Пользователь не может удалить чужую статью. Вместо `me` нужно подставить id статьи, которую вы хотите удалить. Обычно id возвращается при создании статьи.
## Внимание! Все запросы кроме регистрации (signup) и авторизации (signin), защищены аутентификацией. Чтобы вы смогли создавать, удалять и получать карточки, нужно в программе для тестирования Api сохранить токен. Токен возвращается когда вы авторизируетесь, его нужно поместить в раздел `Authorization` и выбрать тип `Bearer token`.

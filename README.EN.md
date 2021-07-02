# Author: Konstantin Okhlynin
# NewsExplorer-Backend
### Diploma project of the web development course on the online learning portal Practicum by Yandex. Backend for the website [NewsExplorer](https://github.com/KonstantinOkhlynin/news-explorer--frontend), which allows you to register and authorize the user on the website, as well as save and delete news articles in the user's personal profile.
## Languages
### ‣ JavaScript(ES6);
## Code execution environment
### ‣ Node.js;
## Used npm packages
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
## Instructions for checking the health of the backend
### 1. You must have the following programs installed:
#### ‣ Postman(or similar);
#### ‣ MongoDB;
#### ‣ Node.js;
### 2. Next, execute the following steps:
#### ‣ Installing npm dependencies using the command
```bash
# npm install
```
#### ‣ Launch the backend using the command
```bash
# npm run dev
```
#### ‣ Run Mongodb using the command
```bash
# mongod
```
### 3. Then open the program for testing the Api (Postman, etc.) and check the following requests:
#### ‣ POST/`http://localhost:3000/signup` - a new user is created. In the body, you must specify the following fields in JSON format:
##### ‣ name (User name);
##### ‣ email (User's email address);
##### ‣ password (User password);
### Example:
``` json
{
"name": "Kostya",
"email": "Kostya.Okhlynin@gmail.com",
"password": "frfsdk123lsd"
}
```
#### ‣ POST/`http://localhost:3000/signin` - user authorization. In the body, you must specify the following fields in JSON format:
##### email email (User's email);
##### ‣ password (User password);
### Example:
``` json
{
"email": "Kostya.Okhlynin@gmail.com",
"password": "frfsdk123lsd"
}
```
#### ‣ GET/`http://localhost:3000/users/me` - a JSON object of a specific user is output, if the user is not found, an error is output. Instead of `me`, you need to substitute the ID of the user you want to find. Usually the id is returned when the user is created.
#### ‣ GET/`http://localhost:3000/articles` - displays a JSON list of all articles.
#### ‣ POST/`http://localhost:3000/articles` - an article is being created. In the body, you must specify the following fields in JSON format:
##### ‣ keyword (The keyword for which the article was found);
##### ‣ title (Article title);
##### ‣ text (The text of the article);
##### ‣ date (Date of the article);
##### ‣ source (Article source);
##### ‣ link (Link to the article);
##### ‣ image (Link to the illustration to the article);
##### ‣ owner (id of the user who saved the article);
### Example:
``` json
{
"keyword": "Science",
"title": "About a flat earth",
"text": "The earth is round.",
"date": "01.01.2021",
"source": "science.com",
"link": "https://science.com",
"image": "https://science.com/image",
"owner": "6035276828cc3d3a28658322"
}
```
#### ‣ DELETE/`http://localhost:3000/articles/:id` - delete your own articles. The user cannot delete someone else's article. Instead of `me`, you need to substitute the id of the article you want to delete. Usually the id is returned when the article is created.
## Attention! All requests except signup and signin are protected by authentication. In order for you to create, delete, and receive cards, you need to save the token in the Api testing program. The token is returned when you log in, you need to put it in the `Authorization` section and select the `Bearer token` type.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path'); // Для работы с путями

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Схема пользователя
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

// Маршруты
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Проверка существования пользователя
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Пользователь с таким именем или email уже существует.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Перенаправление на страницу пользователя
    res.redirect(`/${username}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при регистрации.');
  }
});

// Маршрут для страницы пользователя
app.get('/:username', async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (user) {
    // Отправка файла index2.html, передавая имя пользователя в качестве переменной
    res.sendFile(path.join(__dirname, 'index2.html'), {
      headers: {
        'Content-Type': 'text/html'
      }
    });
  } else {
    res.status(404).send('Пользователь не найден.');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

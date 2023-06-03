const axios = require('axios');

// Функция для отправки GET запроса
async function getMailList(action = '', filter = '') {
  try {
    const response = await axios.get('http://localhost:8081/getMailList', {
      params: {
        action: action,
        filter: filter
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Функция для отправки PUT запроса
async function addMail(mail) {
  try {
    const response = await axios.put('http://localhost:8081/addMail?action=add', mail);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Пример использования
getMailList(); // Выполнить GET запрос без параметров

getMailList('filter', '{"subject": "example"}'); // Выполнить GET запрос с параметром фильтрации

addMail({
  datatime: 'd.m.Y H:i:s',
  subject: 'Test Subject',
  from: 'test@example.com',
  message: 'Test Message'
}); // Выполнить PUT запрос для добавления нового письма

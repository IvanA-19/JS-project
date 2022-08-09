const telegram_api = require("node-telegram-bot-api")

const token = "TOKEN";

const bot = new telegram_api(token, {polling: true})

const keyboard = {
    reply_markup: {
        keyboard: [
            [{text: 'Меню игр'}],
            ['Команды бота', 'Информация о боте'],
            [{text: 'Поддержка'}]
        ],
        one_time_keyboard: true,
        resize_keyboard: true
    }
}

const games = {
    reply_markup: {
        inline_keyboard: [
            [{text: "Snake", callback_data: "SnakeGame"}]
        ]
    }
}

const bot_buttons = () => {

    bot.on("message", async msg => {
        const chat_id = msg.chat.id

        switch(msg.text) {
            case "/start":
                await bot.sendMessage(chat_id, `Рад приветствовать, ${msg.from.first_name} ${msg.from.last_name}!`)
                await bot.sendMessage(chat_id, "Открываю меню", keyboard)
                break
            case "Меню игр":
                await bot.sendMessage(chat_id, "Доступны следующие игры:", games)
                break
        }
    })
}

bot_buttons()
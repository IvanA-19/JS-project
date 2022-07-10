const telegram_api = require("node-telegram-bot-api")

const token = "5360851862:AAFgW2G3gyCwna0C2-VamTvBMlN8rvbY2vU"

const bot = new telegram_api(token, {polling: true})

const chats = {}

const game_options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "1", callback_data: "1"}, {text: "2", callback_data: "2"}, {text: "3", callback_data: "3"}],
            [{text: "4", callback_data: "4"}, {text: "5", callback_data: "5"}, {text: "6", callback_data: "6"}],
            [{text: "7", callback_data: "7"}, {text: "8", callback_data: "8"}, {text: "9", callback_data: "9"}],
            [{text: "0", callback_data: "0"}]
        ]
    })
}

const again_option = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Попробовать еще раз", callback_data: "/again"}]
        ]
    })
}

bot.setMyCommands([
    {command: "/start", description: "Приветствие"},
    {command: "/game", description: "Небольшая игра"}
    ]
)

const start_game = async (chat_id) => {
    await bot.sendMessage(chat_id, `Сейчас я загадаю цифру от 0 до 9, а ты попробуй угадать ее!`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chat_id] = randomNumber;
    await bot.sendMessage(chat_id, "Загадал! А теперь отгадывай!", game_options)
}

const start = () => {
    bot.on("message", async msg => {
        const text = msg.text;
        const chat_id = msg.chat.id;
        if (msg.text === "/start") {
            return bot.sendMessage(chat_id, `Рад приветствовать, ${msg.from.first_name} ${msg.from.last_name}!`)
        }
        if (msg.text === "/game") {
            return start_game(chat_id);
        }
        return bot.sendMessage(chat_id, "Прости, но я не понимаю тебя")
    })

    bot.on("callback_query", async msg => {
        const data = msg.data;
        const chat_id = msg.message.chat.id;

        if(data === "/again"){
            return start_game(chat_id);
        }

        if(data === chats[chat_id]){
            return bot.sendMessage(chat_id, `Поздравляю! Ты угадал! Это была цифра ${chats[chat_id]}`, again_option)
        }
        else{
            return bot.sendMessage(chat_id, `К сожалению ты не угадал! Я загадывал цифру ${chats[chat_id]}`, again_option)
        }

    })
}

start()
const telegram_api = require("node-telegram-bot-api")

const token = "5360851862:AAFgW2G3gyCwna0C2-VamTvBMlN8rvbY2vU"

const bot = new telegram_api(token, {polling: true})

const chats = {}

bot.on("message", async msg => {
    const chat_id = msg.chat.id

    if(msg.text === 'Закрыть'){
        await bot.sendMessage(chat_id, 'Закрываю клавиатуру', {
            reply_markup: {
                remove_keyboard: true
            }
        })
    }else if(msg.text === 'Ответить') {
        await bot.sendMessage(chat_id, 'Отвечаю', {
            reply_markup: {
                force_reply: true
            }
        })
    }
    else{
        await bot.sendMessage(chat_id, "Клавиатура", {
            reply_markup: {
                keyboard: [
                    [{
                        text: 'Отправить местоположение',
                        request_location: true
                    }],
                    ['Ответить', 'Закрыть'],
                    [{
                        text: 'Отправить контакт',
                        request_contact: true
                    }]
                ]
            }
        })
    }
})
bot.setMyCommands([
    {command: "/start", description: "Приветствие"},
    ]
)

const start = () => {
    bot.on("message", async msg => {
        const text = msg.text;
        const chat_id = msg.chat.id;
        if (msg.text === "/start") {
            return bot.sendMessage(chat_id, `Рад приветствовать, ${msg.from.first_name} ${msg.from.last_name}!`)
        }
        //return bot.sendMessage(chat_id, "Прости, но я не понимаю тебя")
    })
}

start()
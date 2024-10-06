from flask import Flask, render_template, request
import google.generativeai as genai

app = Flask(__name__)

# Настраиваем Google Generative AI
genai.configure(api_key="AIzaSyAdjmx5Fg68ORlWfETDOe4yKVMC3yzZJTc")

# Создаём модель
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 81920,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config
)

@app.route("/", methods=["GET", "POST"])
def index():
    response = None
    if request.method == "POST":
        user_input = request.form["query"].strip()  # Убираем пробелы вокруг текста
        if user_input:  # Проверка на пустой ввод
            chat_session = model.start_chat(
                history=[
                    {
                        "role": "user",
                        "parts": [
                            "Твоя задача — давать ответы на вопросы, связанные с космосом, так, чтобы их могли понимать дети начальных классов. Давай максимально упрощенные ответы понятными словами. in english and using emojis",
                        ],
                    },
                    {
                        "role": "model",
                        "parts": [
                            "Я готов! Задавай любые вопросы о космосе, я постараюсь объяснить все простыми словами, чтобы было понятно даже маленьким астрономам! 🪐🚀\n",
                        ],
                    },
                ]
            )

            # Отправляем запрос модели
            response = chat_session.send_message(user_input).text
        else:
            response = "Ask me any question about space! 🌌"

    return render_template("index.html", response=response)


@app.route("/exploration", methods=["GET", "POST"])
def exploration():
    response = None
    if request.method == "POST":
        user_input = request.form["query"].strip()  # Убираем пробелы вокруг текста
        if user_input:  # Проверка на пустой ввод
            chat_session = model.start_chat(
                history=[
                    {
                        "role": "user",
                        "parts": [
                            "Твоя задача — давать ответы на вопросы, связанные с космосом, так, чтобы их могли понимать дети начальных классов. Давай максимально упрощенные ответы понятными словами.",
                        ],
                    },
                    {
                        "role": "model",
                        "parts": [
                            "Я готов! Задавай любые вопросы о космосе, я постараюсь объяснить все простыми словами, чтобы было понятно даже маленьким астрономам! 🪐🚀\n",
                        ],
                    },
                ]
            )

            # Отправляем запрос модели
            response = chat_session.send_message(user_input).text
        else:
            response = "Ask me any question about space! 🌌"

    return render_template("exploration.html", response=response)


@app.route("/drawing")
def drawing():
    return render_template("drawing.html")


@app.route("/interactives")
def interactives():
    return render_template("interactives.html")


if __name__ == "__main__":
    app.run(debug=True)

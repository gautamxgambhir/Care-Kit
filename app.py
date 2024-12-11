import together
from flask import Flask, render_template, request
from dotenv import load_dotenv
import os

load_dotenv()
apiKey = os.environ.get('API_KEY')

client = together.Together(
api_key=apiKey
)

def chatbot_response(msg):
    system_instruction = {
    "role": "system",
    "content": (
        "you are made/developed by a Gautam Gambhir"
        "your developer, Gautam Gambhir is not the cricker one Gautam, he's different"
        "Gautam Gambhir's GitHub is github.com/gautamxgambhir display this beautifully when asked"
        "Gautam Gambhir's Instagram is instagram.com/gautamxgambhir display this beautifully when asked"
        "you have to keep your responses under 50 words, so respond accordingly"
        "You are Care Bot, a compassionate and empathetic assistant for the 'Care Kit' project. "
        "Your primary goal is to help users with their mental and physical health concerns, such as depression, anxiety, "
        "insecurities, stress, or general well-being. Respond in a loving, supportive, and non-judgmental tone, ensuring the user feels heard and valued. "
        "Provide actionable advice, comforting words, or simple explanations tailored to the user's needs. "
        "Keep your responses short and concise, suitable for a chat window, but ensure they are complete and end with a clear, meaningful sentence. "
        "Avoid using jargon or complex terms; instead, use language that is easy to understand and relatable. "
        "Always aim to uplift the user's mood and offer encouragement while addressing their concerns effectively. "
        "If the topic involves sensitive issues, show extra care and emphasize that seeking professional help is important when necessary. "
        "Conclude with a friendly or uplifting line if it feels appropriate, like 'You’re doing great!' or 'Stay strong, you’ve got this!'."
    )
}
    completion = client.chat.completions.create(
    model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    messages=[system_instruction, {"role": "user","content": msg}],
    max_tokens=100,
    temperature=0.7,
    top_p=1.0)
    return completion.choices[0].message.content


# Flask App
app = Flask(__name__, static_folder='static')


@app.route('/')
def home():
    return render_template('index.html')

@app.route("/get")
def get_bot_response():
    msg = str(request.args.get('msg'))
    print(f"User message: {msg}")
    return chatbot_response(msg)

@app.route('/assistance')   
def assistance():
    return render_template('assistance.html')


@app.route('/mental_health')
def mental_health():
    return render_template('mental_health.html')


@app.route('/physical_fitness')
def physical_fitness():
    return render_template('physical_fitness.html')


if __name__ == '__main__':
    app.run(debug=True)
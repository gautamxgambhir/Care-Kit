import requests
from flask import Flask, render_template, request
from dotenv import load_dotenv
import os

load_dotenv()
apiKey = os.environ.get('API_KEY')

# In-memory storage for message history
conversation_history = {}

def chatbot_response(user_id, msg):
    # Get the user's conversation history
    if user_id not in conversation_history:
        conversation_history[user_id] = []

    # Add the user message to the history
    conversation_history[user_id].append({"role": "user", "content": msg})

    # System instruction
    system_instruction = {
        "role": "system",
        "content": (
            "You are made/developed by Gautam Gambhir."
            "Your developer, Gautam Gambhir, is not the cricketer Gautam; he's different."
            "Gautam Gambhir's GitHub is github.com/gautamxgambhir; display this beautifully when asked."
            "Gautam Gambhir's Instagram is instagram.com/gautamxgambhir; display this beautifully when asked."
            "You have to keep your responses under 50 words, so respond accordingly."
            "You are Care Bot, a compassionate and empathetic assistant for the 'Care Kit' project. "
            "Your primary goal is to help users with their mental and physical health concerns."
        )
    }

    # Include system instruction and conversation history
    messages = [system_instruction] + conversation_history[user_id]

    # Prepare the payload for the Together API
    payload = {
        "model": "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
        "messages": messages,
        "max_tokens": 100,
        "temperature": 0.7,
        "top_p": 1.0,
    }

    # Send the API request
    headers = {"Authorization": f"Bearer {apiKey}"}
    response = requests.post("https://api.together.xyz/v1/chat/completions", json=payload, headers=headers)

    # Handle potential errors in the API response
    if response.status_code != 200:
        return "Sorry, I couldn't process your request right now. Please try again later."

    response_data = response.json()

    # Get the assistant's reply
    reply = response_data["choices"][0]["message"]["content"]

    # Add the assistant's reply to the history
    conversation_history[user_id].append({"role": "assistant", "content": reply})

    return reply


# Flask App
app = Flask(__name__, static_folder='static')


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/get")
def get_bot_response():
    msg = str(request.args.get('msg'))
    user_id = request.remote_addr  # Use the user's IP address as an identifier
    print(f"User message from {user_id}: {msg}")
    return chatbot_response(user_id, msg)


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
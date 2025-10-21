# Placeholder variables - set these before running
OPENAI_API_KEY = ""
MODEL_NAME = "gpt-3.5-turbo"
N_IDEAS = 5

import openai


def generate_meal_ideas(n: int = N_IDEAS) -> str:
    """Generate random cooking meal ideas using OpenAI's API."""
    openai.api_key = OPENAI_API_KEY
    prompt = (
        f"Generate {n} random meal ideas for home cooking. "
        "Include a short description for each idea."
    )
    response = openai.ChatCompletion.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": "You are a creative chef."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.8,
    )
    return response["choices"][0]["message"]["content"].strip()


if __name__ == "__main__":
    ideas = generate_meal_ideas()
    print(ideas)

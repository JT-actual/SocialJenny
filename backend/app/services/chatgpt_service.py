# backend/app/services/chatgpt_service.py
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_posts(article):
    prompt = f"""
    You are ChatGPT. Please create two social media posts in my voice.
    
    1) A LinkedIn post:
       - More detailed, with short paragraphs and line breaks
       - Professional but conversational tone
    2) A Twitter (X) post:
       - Concise, within 280 characters
       - May use relevant hashtags
    
    Article Info:
    Headline: {article.headline}
    Body: {article.body}
    Source: {article.source}
    Link: {article.link}

    Separate the LinkedIn text and Twitter text with the delimiter: <<<X>>>
    """

    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=300,
        temperature=0.7
    )

    if not response.choices:
        return ("", "")
    
    text = response.choices[0].text.strip()
    if "<<<X>>>" in text:
        linkedin_text, twitter_text = text.split("<<<X>>>")
    else:
        linkedin_text = text
        twitter_text = "[No Twitter text generated]"
    
    return linkedin_text.strip(), twitter_text.strip()

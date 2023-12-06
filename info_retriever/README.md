-----------------------------UNDERSTAND THE PROBLEM-----------------------------
In this project, we're going to build a chatbot that is capable of retrieving information from specific provided websites. E.g. We ask for the stock price of Apple today and provide the bot all the credible websites we trust, then the bot will aggregate and retrieve the information from all of those websites.

- Question: We already have ChatGPT, why do we even need other bots?
- Answer:
Even though ChatGPT is currently the best tool to ask all kinds of questions and search for any answers, it still has some limitations:

1. Its latest knowledge is only up to January 2022 => unable to provide real-time data
2. It's also incapable of retrieving information from specific websites/databases/live information feeds, even if you provide the links or the request is related to historical information => ChatGPT's responses are generated based on a mixture of licensed data, data created by human trainers, and publicly available data
3. If you ask things such as house price, weather, etc. in many years ago (ex: 2015), it still cannot provide you the answer

In conclusion, our main goal is to build a chatbot that can retrieve real-time information for us using the technology of ChatGPT
-----------------------------TECHNICAL ARCHITECTURE-----------------------------
1. Load all the contents from provided website urls and transform them into Documents
2. Split the contents into Chunks
3. Store all the Chunks in a Vector Database
4. When a quesion is asked, the web server calls the Vector Database. Vector Database will return Chunks that have relevant answers to that question.
5. Put the question and all the Chunks into a Prompt. It will understand that the question must be answered based on those Chunks
6. LLM take the Prompt as an input, it generates answer in a nice looking format then send the response back to the UI
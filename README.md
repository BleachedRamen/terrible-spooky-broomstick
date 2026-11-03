# AI Test Preset for Promptfoo
 
A ready-made set of 235 questions to check how well an AI model performs. You run these tests using [Promptfoo](https://github.com/promptfoo/promptfoo), a free testing tool.
 
You can test an AI that runs directly on your computer or one that runs online through a web service.
 
## How it works
 
1. Promptfoo sends each question to the AI you want to test.
2. A second, smarter AI acts as a **judge**: it reads each answer and marks it right or wrong.
3. You open a page in your web browser to see the final report card.
---
 
## What you need before you start
 
- **Node.js installed on your computer:** A free platform that gives you the `npm` command, which you use to install tools.
- **Git:** A free tool used to download files from GitHub.
- **Two AIs:**
  - The AI you want to test.
  - A smarter AI to act as the judge.
Both AIs can run directly on your computer using apps like Ollama, LM Studio, or llama.cpp, or they can be paid online services like OpenAI or Anthropic.
 
---
 
## Quick start
 
### Step 1: Install Promptfoo
 
Open your terminal (command line) and run:
 
```
npm install -g promptfoo
```
 
Need another way to install it? Check the [Promptfoo install guide](https://www.promptfoo.dev/docs/getting-started/).
 
### Step 2: Download these test files
 
```
git clone https://github.com/BleachedRamen/terrible-spooky-broomstick
cd terrible-spooky-broomstick/Test-Suite
```
 
### Step 3: Tell it which AIs to use
 
Open the file named `promptfooconfig.yaml` in any text editor (like Notepad or TextEdit). You need to tell it two things:
 
- **The AI being tested:** listed under `providers`.
- **The judge AI:** listed under `defaultTest`. It must be smart and able to produce consistently formatted replies, such as strict JSON.
Here is an example setup for an AI running on your own machine:
 
```yaml
# The AI you are testing
providers:
  - id: http://localhost:9931/v1/chat/completions
    label: Qwen3.5-2B
    config:
      method: POST
      headers:
        Content-Type: application/json
      body:
        model: Qwen3.5-2B
        messages:
          - role: user
            content: '{{prompt}}'
      transformResponse: json.choices[0].message.content
 
# The judge AI (must be smart and able to output consistently formatted replies, such as strict JSON)
defaultTest:
  options:
    provider:
      id: openai:chat:Gemma-4-26B-A4B
      config:
        apiBaseUrl: http://localhost:9932/v1
        apiKeyRequired: false
        useDefaultApiKey: false
        showThinking: false
        max_tokens: 16384
```
 
What to change to match your setup:
 
| Setting | What it means |
| :--- | :--- |
| `id` (under `providers`) | The web address where your test AI is running (`localhost:9931` in this example). |
| `label` | Any nickname you want to show on the results page. |
| `model` | The exact name of your model. |
| `apiBaseUrl` (under `defaultTest`) | The web address where your judge AI is running. |
| `max_tokens` | The longest reply the judge is allowed to write (tokens are roughly word fragments). 16,384 gives it plenty of room. |
 
For more setup options, read the [Promptfoo connection guide](https://www.promptfoo.dev/docs/providers/#quick-start).
 
### Step 4: Run the tests
 
```
promptfoo eval
```
 
### Step 5: View the results
 
```
promptfoo view
```
 
This opens an easy-to-read results page in your web browser.
 
---
 
## Running only part of the tests
 
If you don't want to run all 235 questions at once, add extra instructions (called "flags") to the end of the `promptfoo eval` command:
 
| Flag | What it does |
| :--- | :--- |
| `--no-cache` | Asks every question completely fresh instead of remembering past answers. |
| `--repeat <number>` | Asks each question multiple times to see if the AI gives consistent answers. |
| `--filter-metadata category=<name>` | Runs only one topic (for example: `classification`). |
| `--filter-metadata difficulty=<level>` | Runs only one difficulty: `baseline-easy`, `medium`, `hard`, or `adversarial` (trick questions). |
| `--filter-metadata boundary=<type>` | Runs questions by answer type: `determinate` (clear answer), `underdetermined` (missing facts), or `contradictory` (clashing facts). |
 
### Examples
 
```
# Run everything with fresh answers:
promptfoo eval --no-cache
 
# Run every question 3 times to check for consistency:
promptfoo eval --no-cache --repeat 3
 
# Run only hard questions:
promptfoo eval --filter-metadata difficulty=hard
 
# Run only trick questions about sorting items:
promptfoo eval --filter-metadata category=classification --filter-metadata difficulty=adversarial
 
# Run only questions where there isn't enough information to answer:
promptfoo eval --filter-metadata boundary=underdetermined
```
 
---
 
## What the tests cover
 
All tests live in the `Test-Suite` folder.
 
| Category | Total | Easy | Medium | Hard | Hostile / Traps |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Basic Knowledge | 25 | 6 | 8 | 6 | 5 |
| Classification (sorting items) | 25 | 6 | 8 | 6 | 5 |
| Context Retention (remembering earlier facts later in a chat) | 25 | 6 | 8 | 6 | 5 |
| Instruction Following | 25 | 5 | 8 | 7 | 5 |
| Structured Data (JSON formatting) | 25 | 5 | 8 | 7 | 5 |
| Mathematics | 25 | 5 | 8 | 7 | 5 |
| Reasoning (logic) | 35 | 7 | 11 | 10 | 7 |
| Summarization | 25 | 6 | 8 | 6 | 5 |
| Writing & Grammar | 25 | 6 | 8 | 6 | 5 |
| **Total** | **235** | **52** | **75** | **61** | **47** |
 
### Difficulty levels
 
| Level | What it checks |
| :--- | :--- |
| Easy (baseline) | Core skills. Makes sure the AI hasn't lost its grip on simple, everyday basics. |
| Medium | Careful reading, telling similar ideas apart, and juggling multiple rules at the same time. |
| Hard | Solving problems step-by-step, sorting through confusing wording, and tracking details that change. |
| Hostile / Traps (adversarial) | Trick questions meant to fool the AI: false setups, sneaky hidden instructions, misleading words, and fake rules. |
 
### Answer types
 
Every question belongs to one of three types, depending on what the right response looks like:
 
| Type | What the question provides | What the AI should do |
| :--- | :--- | :--- |
| Clear (determinate) | The clues lead to exactly one correct answer. | Give that answer directly. |
| Missing Facts (underdetermined) | The clues leave several answers possible. | Say clearly that there is not enough information to answer. |
| Clashing Facts (contradictory) | The prompt gives facts that cannot both be true. | Point out the clash instead of guessing. |
###### <mark>STILL A WORK IN PROGRESS LOL</mark>, Testing Mistral, Claude, and Gemini to help build this

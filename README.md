# Local Presets for LLM Testing & Benchmarking with Promptfoo

A collection of local presets and test suites for evaluating and benchmarking Large Language Models (LLMs) using [Promptfoo](https://github.com/promptfoo/promptfoo).

---

## Test Suite Breakdown

Current tests located under `Test-Suite`:

| Test Category | Test Count |
| :--- | :---: |
| Basic Knowledge | 25 |
| Classification | 25 |
| Instruction Following | 25 |
| Mathematics | 25 |
| Reasoning | 35 |
| JSON Output | 25 |
| Writing & Grammar | 25 |
| Summarization | 25 |
| Context Retention | 25 |
| **Total** | **235** |

---

## Prerequisites

Install Promptfoo globally or via `npx`:

```
npm install -g promptfoo
```
For alternative installation methods and details, see the [official Promptfoo documentation](https://www.promptfoo.dev/docs/getting-started/).

Setup & Configuration
Clone the repository:

```
git clone https://github.com/BleachedRamen/terrible-spooky-broomstick
cd terrible-spooky-broomstick/Test-Suite 
```
### Configure Providers:
Open promptfooconfig.yaml and configure your target models under providers. \
You can point to local inference engines (like Ollama, LM Studio, or vLLM via an OpenAI-compatible endpoint) or remote APIs.\
\
Example promptfooconfig.yaml snippet pointing to a local openai endpoint(llama.cpp):
```
# The model you are testing/intending to test.
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

# This model MUST be smart and capable of outputting consistient JSON.
defaultTest:
  options:
    provider:
      id: openai:chat:Gemma-4-Basic
      config:
        apiBaseUrl: http://localhost:9932/v1
        apiKeyRequired: false
        useDefaultApiKey: false
        showThinking: false
        max_tokens: 16384
# 16k max tokens is generous for grading, adjust for how verbose your grader is
```
### Refer to the [Promptfoo Provider Documentation](https://www.promptfoo.dev/docs/providers/) for full configuration options.
Running Benchmarks
---
Run the evaluation suite:
```
promptfoo eval
```
View the interactive results in your browser:
```
promptfoo view
```
Useful Flags
```
--no-cache: Disables caching to ensure every prompt is evaluated fresh.
--repeat <number>: Runs each test prompt multiple times to test consistency/variance.
--filter-metadata category=<category>: filters for only questions from a specific category of test.
```
Example:
```
promptfoo eval --no-cache --repeat 3
```

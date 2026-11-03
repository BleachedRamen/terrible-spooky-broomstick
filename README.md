# Local Presets for LLM Testing & Benchmarking with Promptfoo

A collection of local presets and test suites for evaluating and benchmarking Large Language Models (LLMs) using [Promptfoo](https://github.com/promptfoo/promptfoo).

---

## Test Suite Breakdown

Current tests located under `Test-Suite`:

| Test Category | Test Count | Baseline | Medium | Hard | Adversarial |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Basic Knowledge | 25 | 6 | 8 | 6 | 5 |
| Classification | 25 | 6 | 8 | 6 | 5 |
| Context Retention | 25 | 6 | 8 | 6 | 5 |
| Instruction Following | 25 | 5 | 8 | 7 | 5 |
| JSON Output | 25 | 5 | 8 | 7 | 5 |
| Mathematics | 25 | 5 | 8 | 7 | 5 |
| Reasoning | 35 | 7 | 11 | 10 | 7 |
| Summarization | 25 | 6 | 8 | 6 | 5 |
| Writing & Grammar | 25 | 6 | 8 | 6 | 5 |
| **Total** | **235** | **51** | **75** | **61** | **48** |

### Difficulty Levels

- **Baseline (Easy)**: Fundamental capability tests to track floor regressions
- **Medium**: Tests requiring conceptual precision, adjacent concept distinction, and multi-constraint handling
- **Hard**: Multi-hop reasoning, semantic collision resolution, and complex state tracking
- **Adversarial**: Tests with false premises, prompt injection, keyword traps, and decoy constraints

### Boundary Types

Tests evaluate three logical boundaries:
- **Determinate**: Premises permit exactly one ground-truth conclusion
- **Underdetermined**: Facts leave multiple candidate conclusions open; model must state information is insufficient
- **Contradictory**: Input contains mutually exclusive premises; model must identify the contradiction

---

## Prerequisites

Install Promptfoo globally or via `npx`:

```
npm install -g promptfoo
```
For alternative installation methods and details, see the [official Promptfoo documentation](https://www.promptfoo.dev/docs/getting-started/).

## Setup & Configuration

Clone the repository:

```
git clone https://github.com/BleachedRamen/terrible-spooky-broomstick
cd terrible-spooky-broomstick/Test-Suite
```

### Configure Providers

Open `promptfooconfig.yaml` and configure your target models under `providers`.

You can point to local inference engines (like Ollama, LM Studio, or vLLM via an OpenAI-compatible endpoint) or remote APIs.

Example `promptfooconfig.yaml` snippet pointing to a local openai endpoint (llama.cpp):

```yaml
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

# This model MUST be smart and capable of outputting consistent JSON.
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

Refer to the [Promptfoo Provider Documentation](https://www.promptfoo.dev/docs/providers/) for full configuration options.

---

## Running Benchmarks

Run the evaluation suite:

```
promptfoo eval
```

View the interactive results in your browser:

```
promptfoo view
```

## Useful Flags

```
--no-cache: Disables caching to ensure every prompt is evaluated fresh.
--repeat <number>: Runs each test prompt multiple times to test consistency/variance.
--filter-metadata category=<category>: Filters for only questions from a specific category of test.
--filter-metadata difficulty=<level>: Filters for tests of a specific difficulty level (baseline-easy, medium, hard, adversarial).
--filter-metadata boundary=<type>: Filters for tests of a specific boundary type (determinate, underdetermined, contradictory).
```

### Examples

Run all tests with fresh evaluations:
```
promptfoo eval --no-cache
```

Run tests 3 times to check consistency:
```
promptfoo eval --no-cache --repeat 3
```

Run only hard difficulty tests:
```
promptfoo eval --filter-metadata difficulty=hard
```

Run only adversarial tests for the classification category:
```
promptfoo eval --filter-metadata category=classification --filter-metadata difficulty=adversarial
```

Run only tests that evaluate underdetermined scenarios:
```
promptfoo eval --filter-metadata boundary=underdetermined
```

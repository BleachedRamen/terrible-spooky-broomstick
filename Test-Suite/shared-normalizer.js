// shared-normalizer.js
// Universal normalization pipeline for all Promptfoo test assertions

function normalizeOutput(output) {
  if (typeof output !== 'string') {
    output = JSON.stringify(output);
  }
  return output
    .replace(/<think>[\s\S]*?<\/think>/gi, '') // Strip internal CoT/thought blocks
    .replace(/```[a-z]*\n?|```/gi, '')         // Strip Markdown code fencing
    .normalize('NFKC')                         // Unicode canonical compatibility decomposition
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-') // Normalize hyphen, en-dash, em-dash, minus to ASCII 0x2D
    .trim();
}

// Word counting utility (words are contiguous sequences of non-whitespace characters)
function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Sentence counting utility
function countSentences(text) {
  return text
    .replace(/\b(?:Dr|Mr|Mrs|Ms|Prof)\./gi, '')
    .replace(/\b([ap])\.m\.(?=\s+[a-z])/gi, '$1m')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean).length;
}

module.exports = { normalizeOutput, countWords, countSentences };

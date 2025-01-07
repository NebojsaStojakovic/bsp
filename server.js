const express = require("express");
const path = require("path");
const fs = require("fs");
const { buildTree, findWord } = require("./bst");
const {
  buildHuffmanTree,
  generateHuffmanCodes,
  calculateFrequencies,
} = require("./huffman");

function readFileLines(filename) {
  return fs
    .readFileSync(filename)
    .toString("UTF8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

const app = express();

const words = readFileLines("dictionary.txt");
const root = buildTree(words.sort());

const wordFrequencies = calculateFrequencies(words);
const huffmanTree = buildHuffmanTree(wordFrequencies);
const huffmanCodes = generateHuffmanCodes(huffmanTree);

app.use(express.static(path.join(__dirname, "public")));

function checkWithBST(word) {
  const found = findWord(root, word);
  return found ? { found: true } : { found: false };
}

function checkWithHuffman(word) {
  if (huffmanCodes[word]) {
    return { found: true, code: huffmanCodes[word] };
  } else {
    return { found: false };
  }
}

app.get("/check", (req, res) => {
  const word = (req.query.word || "").trim();
  const algorithm = req.query.algorithm;

  if (!word) {
    return res.json({ error: "Unos reči je obavezan." });
  }

  if (algorithm === "bst") {
    const result = checkWithBST(word);
    res.json(result);
  } else if (algorithm === "huffman") {
    const result = checkWithHuffman(word);
    res.json(result);
  } else {
    res.json({ error: "Nepoznat algoritam za proveru." });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

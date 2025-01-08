const express = require("express");
const path = require("path");
const fs = require("fs");
const { buildTree, findWord } = require("../bst");

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

app.use(express.static(path.join(__dirname, "public")));

app.get("/check", (req, res) => {
  const word = (req.query.word || "").trim();

  if (!word) {
    return res.json({ error: "Unos reči je obavezan." });
  }

  const result = findWord(root, word);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

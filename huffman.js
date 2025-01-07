class HuffmanNode {
  constructor(value, frequency) {
    this.value = value;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

function buildHuffmanTree(frequencies) {
  const heap = Object.entries(frequencies).map(
    ([value, freq]) => new HuffmanNode(value, freq)
  );
  heap.sort((a, b) => a.frequency - b.frequency);

  while (heap.length > 1) {
    const left = heap.shift();
    const right = heap.shift();

    const newNode = new HuffmanNode(null, left.frequency + right.frequency);
    newNode.left = left;
    newNode.right = right;

    heap.push(newNode);
    heap.sort((a, b) => a.frequency - b.frequency);
  }

  return heap[0];
}

function generateHuffmanCodes(root, prefix = "", codes = {}) {
  if (root === null) return codes;

  if (root.value !== null) {
    codes[root.value] = prefix;
  }

  generateHuffmanCodes(root.left, prefix + "0", codes);
  generateHuffmanCodes(root.right, prefix + "1", codes);

  return codes;
}

function calculateFrequencies(words) {
  const frequencies = {};
  words.forEach((word) => {
    frequencies[word] = (frequencies[word] || 0) + 1;
  });
  return frequencies;
}

module.exports = {
  buildHuffmanTree,
  generateHuffmanCodes,
  calculateFrequencies,
};

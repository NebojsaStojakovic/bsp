// Klasni čvor za Huffman stablo
class HuffmanNode {
  constructor(value, frequency) {
    this.value = value;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

// Kreiranje Huffmanovog stabla
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

const huffmanTree = buildHuffmanTree(wordFrequencies);
console.log("Huffman Stablo:", huffmanTree);

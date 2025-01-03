class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }
  const mid = Math.floor((start + end) / 2);
  const root = new Node(arr[mid]);

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

function findWord(root, word) {
  let current = root;
  let parent = null;
  while (current) {
    if (word === current.value) return { found: true };
    parent = current;
    if (word < current.value) current = current.left;
    else current = current.right;
  }
  return { found: false, suggestion: parent.value };
}

module.exports = { buildTree, findWord };

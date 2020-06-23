class TrieNode {
  constructor() {
    this.words = [];
    this.children = {};
  }
}

class Trie {
  constructor(words, buildCode, Node=TrieNode) {
    this.Node = Node;
    this.buildCode = buildCode;
    this._root = new this.Node();
    this._count = 0;
    words.forEach(word => this.addWord(word));
  }

  addWord(word) {
    const code = this.buildCode(word).split('');
    let node = this._root;
    code.forEach((char) => {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    });
    if (node.words.indexOf(word) === -1) {
      node.words.push(word);
      this._count += 1;
    }
  }

  lookupCode(code) {
    let node = this._root;
    const splitCode = code.split('');
    for (let char of splitCode) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return node.words;
  }

  traverseSubtries(node, results) {
    node.words.forEach((word) => {
      results.push(word);
    });
    if (!Object.keys(node.children).length) {
      return;
    }
    Object.keys(node.children).forEach((key) => {
      this.traverseSubtries(node.children[key], results);
    });
  }

  lookupPrefix(codePrefix) {
    let node = this._root;

    let results = [];
    const splitCode = codePrefix.split('');
    for (let char of splitCode) {
      if (!node.children[char]) {
        return results;
      }
      node = node.children[char];
    }
    if (Object.keys(node.children).length) {
      this.traverseSubtries(node, results);
    } else {
      results = node.words;
    }
    return results;
  }

  count() {
    return this._count;
  }
}

export default Trie;
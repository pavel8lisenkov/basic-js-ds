const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


class BinaryTreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootOfTree = null;
  }

  add(data) {
    let newNode = new BinaryTreeNode(data);

    if (this.rootOfTree === null) {
      this.rootOfTree = newNode;
      return;
    }

    this._add(this.rootOfTree, newNode);
  }

  _add(currentNode, newNode) {
    if (newNode.data < currentNode.data) {
      if (currentNode.left === null) {
        currentNode.left = newNode;
      } else {
        this._add(currentNode.left, newNode);
      }
    }

    if (newNode.data > currentNode.data) {
      if (currentNode.right === null) {
        currentNode.right = newNode;
      } else {
        this._add(currentNode.right, newNode);
      }
    }
  }

  root() {
    return this.rootOfTree;
  }

  has(data) {
    return this._has(this.rootOfTree, data);
  }

  _has(currentNode, data) {
    if (currentNode === null) {
      return false;
    } 
    
    if (currentNode.data === data) {
      return true;
    }
    
    if (data < currentNode.data) {
      return this._has(currentNode.left, data);
    }

    if (data > currentNode.data) {
      return this._has(currentNode.right, data);
    }
  }

  find(data) {
    return this._find(this.rootOfTree, data);
  }

  _find(currentNode, data) {
    if (currentNode === null) {
      return null;
    }

    if (currentNode.data === data) {
      return currentNode;
    }

    if (data < currentNode.data) {
      return this._find(currentNode.left, data);
    }

    if (data > currentNode.data) {
      return this._find(currentNode.right, data);
    }
  }

  remove(data) {
    if (this.rootOfTree === null) {
      return null;
    }

    this.rootOfTree = this._remove(this.rootOfTree, data);
  }

  _remove(currentNode, data) {
    if (currentNode.data === data) {
      if (currentNode.left === null && currentNode.right === null) {
        return null;
      }

      if (currentNode.left === null) {
        return currentNode.right;
      }

      if (currentNode.right === null) {
        return currentNode.left;
      }

      const minNodeInRightSubtree = this._findMinElement(currentNode.right);
      currentNode.data = minNodeInRightSubtree.data;
      currentNode.right = this._remove(currentNode.right, minNodeInRightSubtree.data);
      return currentNode;
    }

    if (data < currentNode.data) {
      if (currentNode.left === null) {
        console.warn(elementNotFoundMessage);
        return currentNode;
      }

      currentNode.left = this._remove(currentNode.left, data);
      return currentNode;
    }

    if (data > currentNode.data) {
      if (currentNode.right === null) {
        console.warn(elementNotFoundMessage);
        return currentNode;
      }

      currentNode.right = this._remove(currentNode.right, data);
      return currentNode;
    }
  }

  _findMinElement(node) {
    if (node.left === null) return node;

    return this._findMinElement(node.left);
  }

  min() {
    if (this.rootOfTree === null) {
      return null;
    }

    return this._min(this.rootOfTree);
  }

  _min(currentNode) {
    if (currentNode.left === null) {
      return currentNode.data;
    }

    return this._min(currentNode.left);
  }

  max() {
    if (this.rootOfTree === null) {
      return null;
    }

    return this._max(this.rootOfTree);
  }

  _max(currentNode) {
    if (currentNode.right === null) {
      return currentNode.data;
    }

    return this._max(currentNode.right);
  }
}

module.exports = {
  BinarySearchTree,
  BinaryTreeNode
};
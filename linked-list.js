/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** Get node at given index */

  _getNode(idx) {
    if (idx < 0 || idx > this.length) throw "Index not found."
    let currNode = this.head;
    let currNodeIdx = 0;
    while (currNode) {
      if (currNodeIdx === idx) return currNode;
      else {
        currNode = currNode.next;
        currNodeIdx ++;
      }
    }
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.length ++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    this.length ++;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.tail) throw ("Can't remove from empty list.")
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) throw ("Can't remove from empty list.")
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this._getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let currNode = this._getNode(idx);
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    // inserting into empty list
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length ++;
      return;
    }

    let foundNode = this._getNode(idx);
    let prevNode = this._getNode(idx - 1);

    // inserting at beginning of list
    if (idx === 0) {
      this.head = newNode;
      newNode.next = foundNode;
      this.length ++;
      return;
    }

    // inserting at end of list
    if (idx == this.length) {
      this.tail.next = newNode;
      this.tail = newNode;
      this.length++
      return;
    }

    // inserting in middle/end of list
    prevNode.next = newNode;
    newNode.next = foundNode;
    this.length++;
    return;
  }

  /** removeAt(idx): return & remove item at idx */

  removeAt(idx) {
    let foundNode = this._getNode(idx);

    // removing from single-item list
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    }

    // removing first item
    if (foundNode === this.head) {
      let afterNode = foundNode.next;
      foundNode.next = null;
      this.head = afterNode;
    }

    // removing last item
    if(foundNode === this.tail) {
      let prevNode = this._getNode(idx - 1);
      this.tail = prevNode;
      prevNode.next = null;
    }

    this.length --;
    return foundNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head) return 0;
    let currNode = this.head;
    let currIdx = 0;
    let total = 0;
    while (currNode) {
      total += this.getAt(currIdx);
      currNode = currNode.next;
      currIdx ++;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;

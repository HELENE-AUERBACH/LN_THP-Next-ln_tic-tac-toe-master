class Node {
  constructor(value, level = 1, parentLevel = 0, hisParent = null, children = null) {
    this._value = value;//this.validateValue(value);
    this._hisParent = hisParent;
    this._children = children;
    this._level = level;
    this._parentLevel = parentLevel;
    this._numberOfAvailableCells = this.getNumberOfAvailableCells(this);
  }
  
  get value() {
    if (this._value === undefined || this._value === null || !Array.isArray(this._value)
      || this._value.length !== 3 || !Array.isArray(this._value[0]) || !Array.isArray(this._value[1]) || !Array.isArray(this._value[2])
      || this._value[0].length !== 3 || this._value[1].length !== 3 || this._value[2].length !== 3
    ) {
      console.error("Aucune matrice de 3x3 cellules n'a été donnée comme valeur à ce noeud!");
      return null;
    } else {
      return this._value;
    }
  }
  
  set value(newValue) {
    this._value = this.validateValue(newValue);
    this._numberOfAvailableCells = this.getNumberOfAvailableCells(this);
  }
  
  getNumberOfAvailableCells(node) {
    if (node !== undefined && node !== null && (node instanceof Node) && node._value !== null) {
      return node._value.flat().filter(function(cell) { return cell === null; }).length;
    } else {
      return -1;
    }
  }
  
  validateValue(newValue) {
    if (newValue !== undefined && newValue !== null && (typeof newValue === 'object') && Array.isArray(newValue)
      && newValue.length === 3 && Array.isArray(newValue[0]) && Array.isArray(newValue[1]) && Array.isArray(newValue[2])
      && newValue[0].length === 3 && newValue[1].length === 3 && newValue[2].length === 3
    ) {
      if (newValue.flat().filter(function(cell) { return cell !== null && !['J1', 'J2'].includes(cell); }).length > 0) {
        console.error(`Les valeurs des cellules de la matrice ne doivent être que null ou 'J1' ou 'J2'!`);
	return null;
      } else {
        return newValue;
      }
    } else {
      console.error(`Cette valeur "${newValue}" n'est pas une matrice de 3x3 cellules!`);
      return null;
    }
  }
  
  insert(newSetOfPossibilities) {
    console.log("newSetOfPossibilities : ", newSetOfPossibilities);
    console.log("newSetOfPossibilities.length : ", newSetOfPossibilities.length);
    console.log("newSetOfPossibilities[0] : ", newSetOfPossibilities[0]);
    console.log("newSetOfPossibilities[1] : ", newSetOfPossibilities[1]);
    if (newSetOfPossibilities !== undefined && newSetOfPossibilities !== null && (typeof newSetOfPossibilities === 'object')
      && Array.isArray(newSetOfPossibilities) && newSetOfPossibilities.length === 2 && Array.isArray(newSetOfPossibilities[0])
      && (newSetOfPossibilities[1] === null || (Array.isArray(newSetOfPossibilities[1])
      && (newSetOfPossibilities[1].length === 0 || (newSetOfPossibilities[1].length > 0 && Array.isArray(newSetOfPossibilities[1][0])))))
    ) {
      const newNode = new Node(newSetOfPossibilities[0]);
      if (newNode._value !== null) {
        let found = null;
        //console.log(`newNode : ${newNode._numberOfAvailableCells} ${newNode instanceof Node}`);
        //console.log(`this : ${this._numberOfAvailableCells} ${this instanceof Node} ${this._value} ${Node.areArraysEqual(this._value, newNode._value)}`);
        if (newNode._numberOfAvailableCells === 9 && (this instanceof Node) && (this._value === null || Node.areArraysEqual(this._value, newNode._value))) {
          if (this._value === null) {
            this._value = newNode._value;
          }
          found = this;
        } else if ((this instanceof Node) && found === null) {
          if (newNode._numberOfAvailableCells === (this._numberOfAvailableCells - 1) && this._children === null) {
            this._children = new Set();
          }
          if (this._children === null) {
            console.error(`Ce nouvel ensemble des possibilités est mal ordonné!`);
          } else {
            found = this._children.find(newNode);
          }
          if (this._children !== null && found === null) {
            newNode._hisParent = this._value;
            newNode._parentLevel = this._level;
            newNode._level = this._level + 1;
	    this._children.add(newNode);
            found = newNode;
	  }
        }
        if (found !== null && newSetOfPossibilities[1] !== undefined && newSetOfPossibilities[1] !== null && newSetOfPossibilities[1].length > 0) {
          console.log("found : ", found);
          if (found._children === null) {
            found._children = new Set();
          }
          console.log("newSetOfPossibilities[1] : ", newSetOfPossibilities[1]);
          //found._children.insert(newSetOfPossibilities[1]);
          newSetOfPossibilities[1].forEach((element) => {
            console.log("element : ", element);
            console.log("element[0] : ", element[0]);
            console.log("element[1] : ", element[1]);
            //const child = new Node(newSetOfPossibilities[1][0], found._level + 1, found._parentLevel + 1, found);
            const child = new Node(element[0], found._level + 1, found._parentLevel + 1, found);
            found._children.add(child);
            //child.insert(newSetOfPossibilities[1][1]);
            if (element[1] !== undefined && element[1] !== null) {
              child.insert(element[1]);
            }
          });
        }
        console.log("this : ", this);
      }
    }
  }
  
  find(node) {
    if (!(this instanceof Node || this instanceof Set) || ((this instanceof Node) && (this._value === undefined || this._value === null
      || this._value.length !== 3 || !Array.isArray(this._value[0]) || !Array.isArray(this._value[1]) || !Array.isArray(this._value[2])
      || this._value[0].length !== 3 || this._value[1].length !== 3 || this._value[2].length !== 3 || !Array.isArray(this._value)))
      || !(node instanceof Node) || node._value === undefined || node._value === null || !Array.isArray(node._value)
      || node._value.length !== 3 || !Array.isArray(node._value[0]) || !Array.isArray(node._value[1]) || !Array.isArray(node._value[2])
      || node._value[0].length !== 3 || node._value[1].length !== 3 || node._value[2].length !== 3
    ) {
      return null;
    }
    if ((this instanceof Node) && node._numberOfAvailableCells === this._numberOfAvailableCells && Node.areArraysEqual(this._value, node._value)) {
      return this;
    } else if ((this instanceof Node) && node._numberOfAvailableCells < this._numberOfAvailableCells
        && this._children !== undefined && this._children !== null
    ) {
      if (this._children.has(node)) {
        return node;
      } else {
        return this._children.find(node);
      }
    } else if (this instanceof Set) {
      for (let child of this) {
        let result = child.find(node);
	if (result !== null) {
          return result;
        }
      }
      return null;
    }
    return null;
  }
  
  static areArraysEqual(arr1, arr2) {
    let result = false;
    if (arr1 !== undefined && arr1 !== null && Array.isArray(arr1) && arr2 !== undefined && arr2 !== null && Array.isArray(arr2)
      && arr1.length === arr2.length
    ) {
      const flattenArr1 = arr1.flat();
      const flattenArr2 = arr2.flat();
      if (flattenArr1.length === flattenArr2.length) {
        //console.log(`flattenArr1 : ${flattenArr1}`);
        //console.log(`flattenArr2 : ${flattenArr2}`);
        if (arr1.flat().join("*") === arr1.flat().join("*")) {
          result = true;
	} else {
          result = (flattenArr1.length === 0) || flattenArr1.every((v, i) => { 
            console.log(`v : ${v}`);
            console.log(`i : ${i}`);
            console.log(`flattenArr2[i] : ${flattenArr2[i]} ${v === flattenArr2[i]}`);
            (!v && !flattenArr2[i]) || v === flattenArr2[i];
          });
        }
      }
    }
    return result;
  }
}

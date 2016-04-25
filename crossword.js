function Crossword(selector, wordsList) {
    'use strict';

    let grid = []; // 2 dimensional array
    let emptyCell = 0; // Empty cells will be marked with the value of zero

    /*
     * Returns the intersection character between 2 arrays
     */
    function findMatchingCharsBetween(firstCharArr, secondCharArr) {
        return firstCharArr.filter(function (char) {
            return secondCharArr.indexOf(char) !== -1;
        });
    }

    function createEmptyColumn(length) {
        if (Array.prototype.fill) {
            return Array(length).fill(emptyCell);
        } else {
            let column = [];

            for (let i = 0; i < length; i++) {
                column.push(emptyCell);
            }

            return column;
        }
    }

    function cellIsEmpty(cell) {
        return cell === emptyCell;
    }

    function cellValIsChar(cell, char) {
        return cell === char;
    }

    /*
    * Returns the 2 halves of a split word
    */
    function splitAtChar(charArr, char) {
        let word = Array.isArray(charArr) ? charArr.join('') : charArr;
        let split = {};

        split.firstHalf = (word.substring(0, word.indexOf(char))).split('');
        split.secondHalf = (word.substring(word.indexOf(char) + 1)).split('');

        return split;
    }

    function addNewWordColumn(length, rowNum, value) {
        let newColumn = createEmptyColumn(length);
        newColumn[rowNum] = value;
        newColumn.changed = [];

        return newColumn;
    }

    function removeColumn(column) {
        grid.splice(grid.indexOf(column), 1);
    }

    /*
    * Reverts the column by deleting the changes added to the grid
    * Look for the 'changed' property on an array and if is an array - a new column has been added
    * Otherwise it was empty or an existing character
    */
    function revertColumnToPreviousState(rowNum) {
        grid.filter(function (column) {
            return column.changed;
        }).forEach(function(column) {
            if (Array.isArray(column.changed)) {
                removeColumn(column);
            } else {
                column[rowNum] = column.changed !== "0" ? column.changed : 0;
                delete column.changed;
            }
        });
    }
    
    function placeInGrid(word) {
        let success = false;

        grid.forEach(function (gridWord) {
            let intersectChar = findMatchingCharsBetween(word, gridWord)[0];

            // Try next word column
            if (!intersectChar) {
                return;
            }

            let rowNum = gridWord.indexOf(intersectChar);
            let splitted = splitAtChar(word, intersectChar);
            let leftHalf = splitted.firstHalf;
            let rightHalf = splitted.secondHalf;

            for (let i = 0; i < leftHalf.length; i++) {
                let newLeftCol = gridWord; // Use current gridWord as a starting point
                let nextColPos = grid.indexOf(gridWord) - (i + 1);
                let index = (leftHalf.length - 1) - i;
                let newChar = leftHalf[index];

                if (!grid[nextColPos]) {
                    // Column doesn't exist
                    newLeftCol = addNewWordColumn(gridWord.length, rowNum, newChar);
                    grid.unshift(newLeftCol);
                } else {
                    // Column exists
                    let nextCell = grid[nextColPos][rowNum];

                    if (cellIsEmpty(nextCell)) {
                        grid[nextColPos].changed = nextCell || "0"; // Record previous value or "0" if empty
                        grid[nextColPos][rowNum] = newChar;
                    } else if (!cellIsEmpty(nextCell) && !cellValIsChar(nextCell, newChar)) {
                        // Failure, Revert back
                        revertColumnToPreviousState(rowNum);
                        return;
                    }
                }
            }

            for (let i = 0; i < rightHalf.length; i++) {
                let newRightCol = gridWord;
                let nextColPos = grid.indexOf(gridWord) + i + 1;
                let newChar = rightHalf[i];

                if (!grid[nextColPos]) {
                    newRightCol = addNewWordColumn(gridWord.length, rowNum, newChar);
                    grid.push(newRightCol);
                } else {
                    let nextCell = grid[nextColPos][rowNum];

                    if (cellIsEmpty(nextCell)) {
                        grid[nextColPos].changed = nextCell || "0"; // "0" coerces to true better for filtering
                        grid[nextColPos][rowNum] = newChar;
                    } else if (!cellIsEmpty(nextCell) && !cellValIsChar(nextCell, newChar)) {
                        revertColumnToPreviousState(rowNum);
                        return;
                    }
                }
            }

            grid.forEach(function(column) {
                if (column.changed) {
                    delete column.changed;
                }
            });

            success = true;
        });

        if (!success) {
            grid.push(word);
        } else {
            return false;
        }
    }

    function placeWord(word) {
        var newWord = word.split('');
        var i = 0;

        if (!grid.length) {
            grid.push(createEmptyColumn(newWord.length), newWord);
            return;
        }

        placeInGrid(newWord);
    }
    
    function render() {
        let gridEl = document.querySelector(selector);
        
        grid.forEach(function (column) {
            let columnEl = document.createElement('ul');
            columnEl.classList.add('column');

            column.forEach(function (cell) {
               let cellEl = document.createElement('li');

                if (cellIsEmpty(cell)) {
                    cellEl.classList.add('cell');
                    cellEl.innerHTML = '';
                } else {
                    cellEl.classList.add('cell--visible');
                    cellEl.innerHTML = cell;
                }

                columnEl.appendChild(cellEl);
            });

            gridEl.appendChild(columnEl);
        });
    }

    function init(words) {
        words.forEach(function (word) {
            placeWord(word.toUpperCase());
        });

        render();
    }
    
    init(wordsList);
}
/**
 * Creates two-dimensional array with specified size
 * @param {*} size - size of array "length" and "height" 
 * @param {*} initial - init all array value with that value
 */
export function createSquareMatrix(size, initial=null) {
    let rows = Array(size);
    for (let i = 0; i < rows.length; i++) {
        rows[i] = Array(size).fill(initial);
    }
    return rows;
}

/**
 * Creates copy of the specified matrix
 * @param {*} matrix - two-dimensional array 
 * @returns copy of the matrix
 */
 export function copyMatrix(matrix) {
    let rows = Array(matrix.length);
    for (let i = 0; i < rows.length; i++) {
        rows[i] = [...matrix[i]];
    }

    return rows;
}

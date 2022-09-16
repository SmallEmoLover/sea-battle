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

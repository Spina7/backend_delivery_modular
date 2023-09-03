/**
 * Asynchronous Array Iterator.
 * 
 * This module provides functionality to iterate over an array asynchronously,
 * executing a callback function on each element. The callback function will be awaited
 * before proceeding to the next iteration, making it suitable for asynchronous operations
 * on each array element.
 * 
 * @module asyncArrayIterator
 * @date 2023
 */

/**
 * Iterates over an array asynchronously, executing a callback on each element.
 *
 * @param {Array} array - The array to iterate over.
 * @param {Function} callback - The asynchronous function to execute on each element. 
 *                              It receives the current element, its index, and the original array.
 * @returns {Promise<void>} - A promise that resolves when the iteration is completed.
 */
module.exports = async function(array, callback) {
    for (let index = 0; index < array.length; index++) {
        // Await the execution of the callback for the current element.
        await callback(array[index], index, array);
    }
}

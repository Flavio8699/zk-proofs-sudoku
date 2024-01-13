const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("Sudoku 25x25 circuit", function () {
  let sudokuCircuit;

  before(async function () {
    sudokuCircuit = await wasm_tester("./circuits/25x25_sudoku.circom");
  });

  it("Should generate the witness successfully", async function () {
    let input = {
      unsolved: [
        [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        [11, 12, 13, 14, 15, 0, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5],
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 0],
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 0],
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 0, 8, 10, 22, 11, 19],
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 0, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23],
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 0, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2],
        [2, 5, 1, 15, 0, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22],
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 0, 9],
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 0, 10, 16],
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 0, 3, 12, 8, 11, 17, 18],
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 0, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3],
        [19, 6, 4, 1, 2, 25, 21, 11, 0, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13],
        [5, 13, 9, 0, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14],
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 0, 12, 24, 22, 21, 25, 8, 11],
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 0, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24],
        [10, 21, 24, 8, 25, 20, 9, 0, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4],
        [18, 3, 0, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21],
        [25, 0, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17],
        [20, 11, 15, 12, 19, 23, 0, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8],
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 0, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12],
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 0, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
      solved: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 
        [11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10], 
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15], 
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 6], 
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 7], 
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 23, 8, 10, 22, 11, 19], 
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 6, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23], 
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 12, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2], 
        [2, 5, 1, 15, 3, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22], 
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 15, 9], 
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 24, 10, 16], 
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 5, 3, 12, 8, 11, 17, 18], 
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 21, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3], 
        [19, 6, 4, 1, 2, 25, 21, 11, 12, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13], 
        [5, 13, 9, 3, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14], 
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 9, 12, 24, 22, 21, 25, 8, 11], 
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 7, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24], 
        [10, 21, 24, 8, 25, 20, 9, 14, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4], 
        [18, 3, 2, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21], 
        [25, 4, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17], 
        [20, 11, 15, 12, 19, 23, 14, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8], 
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 11, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12], 
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 19, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
    };
    const witness = await sudokuCircuit.calculateWitness(input);
    await sudokuCircuit.assertOut(witness, {});
  });
  it("Should fail because there is a number out of bounds", async function () {
    let input = {
      unsolved: [
        [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        [11, 12, 13, 14, 15, 0, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5],
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 0],
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 0],
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 0, 8, 10, 22, 11, 19],
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 0, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23],
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 0, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2],
        [2, 5, 1, 15, 0, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22],
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 0, 9],
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 0, 10, 16],
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 0, 3, 12, 8, 11, 17, 18],
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 0, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3],
        [19, 6, 4, 1, 2, 25, 21, 11, 0, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13],
        [5, 13, 9, 0, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14],
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 0, 12, 24, 22, 21, 25, 8, 11],
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 0, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24],
        [10, 21, 24, 8, 25, 20, 9, 0, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4],
        [18, 3, 0, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21],
        [25, 0, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17],
        [20, 11, 15, 12, 19, 23, 0, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8],
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 0, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12],
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 0, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
      solved: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26], 
        [11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10], 
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15], 
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 6], 
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 7], 
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 23, 8, 10, 22, 11, 19], 
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 6, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23], 
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 12, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2], 
        [2, 5, 1, 15, 3, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22], 
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 15, 9], 
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 24, 10, 16], 
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 5, 3, 12, 8, 11, 17, 18], 
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 21, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3], 
        [19, 6, 4, 1, 2, 25, 21, 11, 12, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13], 
        [5, 13, 9, 3, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14], 
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 9, 12, 24, 22, 21, 25, 8, 11], 
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 7, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24], 
        [10, 21, 24, 8, 25, 20, 9, 14, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4], 
        [18, 3, 2, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21], 
        [25, 4, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17], 
        [20, 11, 15, 12, 19, 23, 14, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8], 
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 11, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12], 
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 19, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail because unsolved is not the initial state of solved", async function () {
    // unsolved is not the initial state of solved
    let input = {
      unsolved: [
        [0, 15, 21, 0, 20, 8, 18, 0, 19, 0, 0, 0, 3, 0, 0, 0, 24, 13, 0, 25, 5, 10, 16, 6, 0],
        [0, 14, 0, 22, 0, 7, 10, 0, 9, 12, 21, 15, 0, 24, 8, 18, 0, 0, 20, 23, 0, 11, 17, 0, 13],
        [13, 0, 0, 0, 8, 20, 0, 0, 14, 0, 0, 17, 0, 0, 2, 0, 0, 6, 3, 10, 0, 12, 0, 7, 15],
        [0, 16, 0, 12, 10, 24, 0, 0, 0, 4, 5, 23, 0, 6, 13, 0, 0, 0, 0, 21, 0, 14, 20, 8, 0],
        [0, 6, 0, 17, 19, 1, 11, 0, 22, 0, 0, 10, 20, 0, 0, 9, 0, 12, 0, 0, 0, 3, 24, 0, 21],
        [11, 22, 23, 0, 25, 0, 1, 0, 0, 3, 0, 8, 0, 0, 16, 5, 0, 14, 0, 6, 20, 4, 0, 0, 0],
        [0, 0, 0, 20, 0, 22, 0, 0, 24, 25, 0, 4, 0, 0, 6, 1, 7, 0, 0, 2, 0, 13, 14, 15, 0],
        [0, 12, 10, 13, 0, 0, 0, 0, 0, 0, 15, 0, 24, 25, 17, 0, 0, 0, 19, 0, 1, 0, 0, 0, 0],
        [0, 9, 15, 0, 0, 0, 17, 19, 0, 11, 2, 7, 0, 1, 0, 0, 21, 18, 22, 0, 6, 0, 0, 0, 5],
        [2, 5, 0, 7, 1, 12, 0, 0, 16, 18, 19, 20, 13, 21, 22, 3, 0, 0, 0, 0, 0, 0, 0, 11, 0],
        [5, 2, 0, 0, 0, 0, 8, 12, 18, 0, 10, 22, 16, 0, 0, 0, 0, 15, 0, 0, 9, 0, 0, 0, 3],
        [0, 24, 22, 0, 0, 0, 0, 25, 0, 0, 0, 0, 5, 9, 18, 16, 0, 23, 6, 3, 0, 1, 0, 0, 12],
        [0, 17, 16, 18, 6, 0, 7, 11, 5, 0, 0, 0, 0, 0, 24, 0, 4, 22, 21, 0, 10, 8, 0, 0, 0],
        [0, 0, 0, 21, 4, 14, 0, 16, 10, 0, 8, 12, 6, 0, 20, 7, 0, 0, 0, 0, 17, 15, 18, 0, 2],
        [12, 7, 9, 25, 15, 0, 6, 0, 21, 0, 0, 0, 0, 2, 0, 0, 18, 8, 17, 0, 24, 16, 19, 5, 22],
        [10, 0, 0, 15, 23, 18, 4, 1, 11, 0, 20, 14, 0, 0, 0, 21, 9, 0, 24, 16, 3, 22, 0, 0, 7],
        [0, 0, 13, 6, 0, 5, 24, 0, 0, 0, 0, 21, 8, 15, 25, 0, 22, 10, 0, 19, 0, 18, 0, 0, 4],
        [21, 1, 11, 16, 22, 23, 19, 14, 12, 0, 4, 0, 0, 10, 0, 0, 0, 0, 18, 0, 13, 0, 0, 0, 25],
        [7, 0, 0, 3, 24, 0, 0, 0, 0, 15, 23, 0, 17, 16, 1, 20, 25, 0, 0, 0, 0, 0, 5, 0, 0],
        [14, 0, 17, 0, 2, 21, 20, 0, 0, 16, 0, 0, 0, 0, 19, 0, 3, 1, 4, 7, 0, 23, 0, 0, 0],
        [15, 13, 12, 0, 9, 16, 21, 20, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 8, 18, 11, 0, 0, 4, 1],
        [16, 0, 0, 11, 0, 25, 13, 0, 0, 0, 0, 5, 0, 0, 0, 19, 20, 0, 0, 0, 21, 0, 0, 0, 6],
        [6, 0, 0, 1, 0, 11, 12, 0, 0, 0, 25, 3, 0, 4, 15, 0, 5, 0, 0, 14, 0, 19, 2, 0, 0],
        [24, 25, 0, 0, 0, 0, 0, 0, 23, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 1, 18, 0, 22, 0, 0],
        [22, 21, 0, 0, 18, 19, 0, 0, 0, 0, 0, 16, 0, 0, 11, 15, 10, 0, 13, 0, 0, 25, 0, 14, 0],
      ],
      solved: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 
        [11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10], 
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15], 
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 6], 
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 7], 
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 23, 8, 10, 22, 11, 19], 
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 6, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23], 
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 12, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2], 
        [2, 5, 1, 15, 3, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22], 
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 15, 9], 
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 24, 10, 16], 
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 5, 3, 12, 8, 11, 17, 18], 
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 21, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3], 
        [19, 6, 4, 1, 2, 25, 21, 11, 12, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13], 
        [5, 13, 9, 3, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14], 
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 9, 12, 24, 22, 21, 25, 8, 11], 
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 7, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24], 
        [10, 21, 24, 8, 25, 20, 9, 14, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4], 
        [18, 3, 2, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21], 
        [25, 4, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17], 
        [20, 11, 15, 12, 19, 23, 14, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8], 
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 11, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12], 
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 19, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail due to repeated numbers in a row", async function () {
    // The number 1 in the first row of solved is twice
    let input = {
      unsolved: [
        [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        [11, 12, 13, 14, 15, 0, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5],
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 0],
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 0],
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 0, 8, 10, 22, 11, 19],
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 0, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23],
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 0, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2],
        [2, 5, 1, 15, 0, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22],
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 0, 9],
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 0, 10, 16],
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 0, 3, 12, 8, 11, 17, 18],
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 0, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3],
        [19, 6, 4, 1, 2, 25, 21, 11, 0, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13],
        [5, 13, 9, 0, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14],
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 0, 12, 24, 22, 21, 25, 8, 11],
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 0, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24],
        [10, 21, 24, 8, 25, 20, 9, 0, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4],
        [18, 3, 0, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21],
        [25, 0, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17],
        [20, 11, 15, 12, 19, 23, 0, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8],
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 0, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12],
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 0, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
      solved: [
        [1, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 
        [11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10], 
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15], 
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 6], 
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 7], 
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 23, 8, 10, 22, 11, 19], 
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 6, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23], 
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 12, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2], 
        [2, 5, 1, 15, 3, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22], 
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 15, 9], 
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 24, 10, 16], 
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 5, 3, 12, 8, 11, 17, 18], 
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 21, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3], 
        [19, 6, 4, 1, 2, 25, 21, 11, 12, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13], 
        [5, 13, 9, 3, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14], 
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 9, 12, 24, 22, 21, 25, 8, 11], 
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 7, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24], 
        [10, 21, 24, 8, 25, 20, 9, 14, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4], 
        [18, 3, 2, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21], 
        [25, 4, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17], 
        [20, 11, 15, 12, 19, 23, 14, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8], 
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 11, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12], 
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 19, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail due to repeated numbers in a column", async function () {
    // The number 4 in the first column of solved is twice and the number 7 in the last column of solved is twice too
    let input = {
      unsolved: [
        [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        [11, 12, 13, 14, 15, 0, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5],
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 0],
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 0],
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 0, 8, 10, 22, 11, 19],
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 0, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23],
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 0, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2],
        [2, 5, 1, 15, 0, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22],
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 0, 9],
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 0, 10, 16],
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 0, 3, 12, 8, 11, 17, 18],
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 0, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3],
        [19, 6, 4, 1, 2, 25, 21, 11, 0, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13],
        [5, 13, 9, 0, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14],
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 0, 12, 24, 22, 21, 25, 8, 11],
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 0, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24],
        [10, 21, 24, 8, 25, 20, 9, 0, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4],
        [18, 3, 0, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21],
        [25, 0, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17],
        [20, 11, 15, 12, 19, 23, 0, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8],
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 0, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12],
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 0, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
      solved: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 
        [1, 12, 13, 14, 15, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10], 
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15], 
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 6], 
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 7], 
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 23, 8, 10, 22, 11, 19], 
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 6, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23], 
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 12, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2], 
        [2, 5, 1, 15, 3, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22], 
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 15, 9], 
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 24, 10, 16], 
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 5, 3, 12, 8, 11, 17, 18], 
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 21, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3], 
        [19, 6, 4, 1, 2, 25, 21, 11, 12, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13], 
        [5, 13, 9, 3, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14], 
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 9, 12, 24, 22, 21, 25, 8, 11], 
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 7, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24], 
        [10, 21, 24, 8, 25, 20, 9, 14, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4], 
        [18, 3, 2, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21], 
        [25, 4, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17], 
        [20, 11, 15, 12, 19, 23, 14, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8], 
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 11, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12], 
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 19, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
  it("Should fail due to repeated numbers in a square", async function () {
    // The number 1 in the first square (top-left) of solved is twice
    let input = {
      unsolved: [
        [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        [11, 12, 13, 14, 15, 0, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 0, 2, 3, 4, 5],
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 0],
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 0],
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 0, 8, 10, 22, 11, 19],
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 0, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23],
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 0, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2],
        [2, 5, 1, 15, 0, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22],
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 0, 9],
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 0, 10, 16],
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 0, 3, 12, 8, 11, 17, 18],
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 0, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3],
        [19, 6, 4, 1, 2, 25, 21, 11, 0, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13],
        [5, 13, 9, 0, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14],
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 0, 12, 24, 22, 21, 25, 8, 11],
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 0, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24],
        [10, 21, 24, 8, 25, 20, 9, 0, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4],
        [18, 3, 0, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21],
        [25, 0, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17],
        [20, 11, 15, 12, 19, 23, 0, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8],
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 0, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12],
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 0, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
      solved: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 
        [11, 1, 13, 14, 15, 1, 2, 3, 4, 5, 16, 17, 18, 19, 20, 22, 23, 21, 24, 25, 6, 7, 8, 9, 10], 
        [6, 7, 8, 9, 10, 24, 25, 22, 21, 23, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], 
        [23, 22, 21, 25, 24, 16, 17, 18, 19, 20, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 11, 12, 13, 14, 15], 
        [16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 24, 21, 23, 22, 25, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5], 
        [3, 1, 5, 2, 14, 19, 16, 20, 7, 11, 18, 15, 21, 24, 23, 8, 10, 25, 22, 12, 4, 9, 17, 13, 6], 
        [4, 8, 10, 6, 18, 3, 1, 23, 24, 2, 13, 22, 25, 12, 14, 9, 16, 19, 11, 17, 5, 15, 20, 21, 7], 
        [24, 15, 25, 7, 12, 4, 5, 9, 13, 6, 3, 1, 16, 17, 2, 18, 20, 14, 21, 23, 8, 10, 22, 11, 19], 
        [9, 19, 11, 20, 21, 8, 22, 25, 17, 14, 4, 5, 10, 7, 6, 3, 1, 15, 13, 2, 18, 24, 16, 12, 23], 
        [13, 23, 17, 22, 16, 10, 15, 21, 18, 12, 8, 9, 20, 11, 19, 4, 5, 24, 7, 6, 3, 1, 14, 25, 2], 
        [2, 5, 1, 15, 3, 14, 13, 17, 25, 8, 23, 16, 19, 10, 18, 12, 24, 11, 20, 9, 7, 4, 21, 6, 22], 
        [7, 16, 6, 11, 4, 2, 18, 1, 5, 3, 12, 24, 17, 8, 22, 14, 21, 23, 10, 13, 20, 25, 19, 15, 9], 
        [12, 25, 23, 21, 8, 7, 4, 6, 11, 9, 2, 20, 1, 5, 3, 17, 15, 22, 18, 19, 14, 13, 24, 10, 16], 
        [14, 20, 19, 24, 9, 22, 23, 10, 16, 21, 7, 4, 6, 15, 13, 2, 25, 1, 5, 3, 12, 8, 11, 17, 18], 
        [17, 10, 22, 18, 13, 12, 24, 15, 20, 19, 14, 25, 11, 21, 9, 7, 4, 6, 8, 16, 2, 23, 1, 5, 3], 
        [19, 6, 4, 1, 2, 25, 21, 11, 12, 24, 20, 18, 9, 23, 8, 15, 14, 16, 17, 22, 10, 5, 7, 3, 13], 
        [5, 13, 9, 3, 7, 17, 8, 2, 1, 4, 22, 19, 24, 25, 11, 10, 18, 20, 23, 21, 15, 6, 12, 16, 14], 
        [15, 18, 20, 23, 17, 5, 6, 7, 3, 16, 10, 14, 2, 1, 4, 19, 13, 9, 12, 24, 22, 21, 25, 8, 11], 
        [22, 14, 12, 16, 11, 18, 10, 19, 15, 13, 5, 6, 7, 3, 21, 25, 8, 2, 1, 4, 17, 20, 9, 23, 24], 
        [10, 21, 24, 8, 25, 20, 9, 14, 23, 22, 15, 13, 12, 16, 17, 5, 6, 7, 3, 11, 19, 18, 2, 1, 4], 
        [18, 3, 2, 5, 1, 15, 20, 4, 8, 25, 17, 10, 22, 13, 24, 23, 11, 12, 16, 14, 9, 19, 6, 7, 21], 
        [25, 4, 7, 13, 6, 9, 3, 16, 2, 1, 19, 23, 14, 20, 12, 21, 22, 10, 15, 8, 24, 11, 5, 18, 17], 
        [20, 11, 15, 12, 19, 23, 14, 5, 6, 7, 21, 3, 4, 2, 1, 24, 9, 17, 25, 18, 13, 16, 10, 22, 8], 
        [8, 9, 16, 17, 22, 21, 19, 24, 10, 18, 25, 11, 5, 6, 7, 13, 3, 4, 2, 1, 23, 14, 15, 20, 12], 
        [21, 24, 14, 10, 23, 13, 11, 12, 22, 17, 9, 8, 15, 18, 16, 20, 19, 5, 6, 7, 25, 3, 4, 2, 1],
      ],
    };
    try {
      await sudokuCircuit.calculateWitness(input);
    } catch (err) {
      // console.log(err);
      assert(err.message.includes("Assert Failed"));
    }
  });
});
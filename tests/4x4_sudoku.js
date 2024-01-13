const { assert } = require("chai");
const wasm_tester = require("circom_tester").wasm;

describe("Sudoku 4x4 circuit", function () {
  let sudokuCircuit;

  before(async function () {
    sudokuCircuit = await wasm_tester("./circuits/4x4_sudoku.circom");
  });

  it("Should generate the witness successfully", async function () {
    let input = {
      unsolved: [
        [2, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [1, 0, 0, 2]
      ],
      solved: [
        [2, 4, 1, 3],
        [3, 1, 2, 4],
        [4, 2, 3, 1],
        [1, 3, 4, 2]
      ],
    };
    const witness = await sudokuCircuit.calculateWitness(input);
    await sudokuCircuit.assertOut(witness, {});
  });
  it("Should fail because there is a number out of bounds", async function () {
    let input = {
      unsolved: [
        [2, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [1, 0, 0, 2]
      ],
      solved: [
        [2, 4, 1, 5],
        [3, 1, 2, 4],
        [4, 2, 3, 1],
        [1, 3, 4, 2]
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
        [2, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [1, 0, 0, 2]
      ],
      solved: [
        [2, 1, 3, 4],
        [4, 3, 2, 1],
        [1, 2, 4, 3],
        [3, 4, 1, 2]
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
        [2, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [1, 0, 0, 2]
      ],
      solved: [
        [2, 4, 1, 4],
        [3, 1, 2, 4],
        [4, 2, 3, 1],
        [1, 3, 4, 2]
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
        [2, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [1, 0, 0, 2]
      ],
      solved: [
        [2, 4, 1, 3],
        [3, 1, 2, 4],
        [4, 2, 3, 3],
        [1, 3, 4, 2]
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
        [2, 0, 0, 3],
        [0, 0, 0, 4],
        [0, 0, 0, 0],
        [1, 0, 0, 2]
      ],
      solved: [
        [2, 4, 1, 3],
        [3, 2, 2, 4],
        [4, 2, 3, 1],
        [1, 3, 4, 2]
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

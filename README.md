# Zero-Knowledge Proof implementation for Sudoku
This repository contains a ZK-proof implementation for Sudoku based on [this](https://github.com/vplasencia/zkSudoku) repository.
It contains example for 4 Sudoku grid sizes:
- 4x4
- 9x9
- 16x16
- 25x25

## 1. Setup
1. Go to the folder of your choice and clone the repository:
   ```shell
   git clone https://github.com/Flavio8699/zk-proofs-sudoku.git
   ```

3. Get into the working directory (root directory of repository):
   ```shell
   cd zk-proofs-sudoku
   ```

4. Install dependencies
   ```shell
   npm i
   ```

5. Test the circuits
   ```shell
   npm run test
   ```

6. Get the required PTAU files from [here](https://github.com/iden3/snarkjs/blob/master/README.md#7-prepare-phase-2) and place them in the folder _ptau/_

7. Choose between *groth16*, *plonk* and *fflonk* and execute the proof
   ```shell
   sh execute.sh
   ```
   

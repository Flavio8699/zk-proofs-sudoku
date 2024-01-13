pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template Sudoku() {
    signal input unsolved[25][25];
    signal input solved[25][25];


    // Check if the numbers of the solved sudoku are >=1 and <=25
    // Each number in the solved sudoku is checked to see if it is >=1 and <=25

    component getone[25][25];
    component letnine[25][25];


    for (var i = 0; i < 25; i++) {
       for (var j = 0; j < 25; j++) {
           letnine[i][j] = LessEqThan(32);
           letnine[i][j].in[0] <== solved[i][j];
           letnine[i][j].in[1] <== 25;

           getone[i][j] = GreaterEqThan(32);
           getone[i][j].in[0] <== solved[i][j];
           getone[i][j].in[1] <== 1;

           letnine[i][j].out ===  getone[i][j].out;
        }
    }


    // Check if unsolved is the initial state of solved
    // If unsolved[i][j] is not zero, it means that solved[i][j] is equal to unsolved[i][j]
    // If unsolved[i][j] is zero, it means that solved [i][j] is different from unsolved[i][j]

    component ieBoard[25][25];
    component izBoard[25][25];

    for (var i = 0; i < 25; i++) {
       for (var j = 0; j < 25; j++) {
            ieBoard[i][j] = IsEqual();
            ieBoard[i][j].in[0] <== solved[i][j];
            ieBoard[i][j].in[1] <== unsolved[i][j];

            izBoard[i][j] = IsZero();
            izBoard[i][j].in <== unsolved[i][j];

            ieBoard[i][j].out === 1 - izBoard[i][j].out;
        }
    }


    // Check if each row in solved has all the numbers from 1 to 25, both included
    // For each element in solved, check that this element is not equal
    // to previous elements in the same row

    component ieRow[15050];

    var indexRow = 0;


    for (var i = 0; i < 25; i++) {
       for (var j = 0; j < 25; j++) {
            for (var k = 0; k < j; k++) {
                ieRow[indexRow] = IsEqual();
                ieRow[indexRow].in[0] <== solved[i][k];
                ieRow[indexRow].in[1] <== solved[i][j];
                ieRow[indexRow].out === 0;
                indexRow ++;
            }
        }
    }


    // Check if each column in solved has all the numbers from 1 to 25, both included
    // For each element in solved, check that this element is not equal
    // to previous elements in the same column

    component ieCol[15050];

    var indexCol = 0;


    for (var i = 0; i < 25; i++) {
       for (var j = 0; j < 25; j++) {
            for (var k = 0; k < i; k++) {
                ieCol[indexCol] = IsEqual();
                ieCol[indexCol].in[0] <== solved[k][j];
                ieCol[indexCol].in[1] <== solved[i][j];
                ieCol[indexCol].out === 0;
                indexCol ++;
            }
        }
    }


    // Check if each square in solved has all the numbers from 1 to 25, both included
    // For each square and for each element in each square, check that the
    // element is not equal to previous elements in the same square

    component ieSquare[15050];

    var indexSquare = 0;

    for (var i = 0; i < 25; i+=5) {
       for (var j = 0; j < 25; j+=5) {
            for (var k = i; k < i+5; k++) {
                for (var l = j; l < j+5; l++) {
                    for (var m = i; m <= k; m++) {
                        for (var n = j; n < l; n++){
                            ieSquare[indexSquare] = IsEqual();
                            ieSquare[indexSquare].in[0] <== solved[m][n];
                            ieSquare[indexSquare].in[1] <== solved[k][l];
                            ieSquare[indexSquare].out === 0;
                            indexSquare ++;
                        }
                    }
                }
            }
        }
    }

}

// unsolved is a public input signal. It is the unsolved sudoku
component main {public [unsolved]} = Sudoku();

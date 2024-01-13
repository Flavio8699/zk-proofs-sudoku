# Size of the Sudoku
SIZE=25

# Circuit to prove
CIRCUIT=${SIZE}x${SIZE}_sudoku

# Power of Tau to use
PTAU=21

# Compile the circuit
circom ../circuits/${CIRCUIT}.circom --r1cs --wasm --sym

# Generate the witness
node ${CIRCUIT}_js/generate_witness.js ${CIRCUIT}_js/${CIRCUIT}.wasm ../inputs/${SIZE}x${SIZE}_input.json ${CIRCUIT}_js/witness.wtns

# Powers of Tau
#snarkjs powersoftau new bn128 ${PTAU} pot${PTAU}_0000.ptau -v
#snarkjs powersoftau contribute pot${PTAU}_0000.ptau pot${PTAU}_0001.ptau --name="First contribution" -v -e="random input"

# Prepare phase 2
#snarkjs powersoftau prepare phase2 pot${PTAU}_0001.ptau pot${PTAU}_final.ptau -v

# Generate .zkey file
snarkjs fflonk setup ${CIRCUIT}.r1cs ../ptau/powersOfTau28_hez_final_${PTAU}.ptau ${CIRCUIT}_0000.zkey

# Export the verification key
snarkjs zkey export verificationkey ${CIRCUIT}_0000.zkey verification_key.json

# Generating ZK-proof
start_time=$(date +%s.%N)
snarkjs fflonk prove ${CIRCUIT}_0000.zkey ${CIRCUIT}_js/witness.wtns proof.json public.json
end_time=$(date +%s.%N)
elapsed_time=$(echo "$end_time - $start_time" | bc)
echo "Generate time: $elapsed_time"

# Verifying ZK-proof
start_time=$(date +%s.%N)
snarkjs fflonk verify verification_key.json public.json proof.json
end_time=$(date +%s.%N)
elapsed_time=$(echo "$end_time - $start_time" | bc)
echo "Verify time: $elapsed_time"

# Verify from smart contract
# snarkjs zkey export solidityverifier test_0001.zkey verifier.sol

# Clean up after yourself
shopt -s extglob
rm -rv !(*.sh|*.sbatch|prover|*.log)
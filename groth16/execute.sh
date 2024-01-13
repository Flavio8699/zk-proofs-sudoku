# Size of the Sudoku
SIZE=25

# Circuit to prove
CIRCUIT=${SIZE}x${SIZE}_sudoku

# Power of Tau to use
PTAU=17

# Compile the circuit
circom ../circuits/${CIRCUIT}.circom --r1cs --wasm --sym

# Generate the witness
node ${CIRCUIT}_js/generate_witness.js ${CIRCUIT}_js/${CIRCUIT}.wasm ../inputs/${SIZE}x${SIZE}_input.json ${CIRCUIT}_js/witness.wtns

# Powers of Tau
#snarkjs powersoftau new bn128 ${PTAU} pot${PTAU}_0000.ptau -v
#snarkjs powersoftau contribute pot${PTAU}_0000.ptau pot${PTAU}_0001.ptau --name="First contribution" -v -e="random input"

# Prepare phase 2
#snarkjs powersoftau prepare phase2 pot${PTAU}_0001.ptau pot${PTAU}_final.ptau -v

# Generate .zkey file (from pre-computed PTAU files)
snarkjs groth16 setup ${CIRCUIT}.r1cs ../ptau/powersOfTau28_hez_final_${PTAU}.ptau ${CIRCUIT}_0000.zkey

# Contribute to phase 2 of the ceremony
snarkjs zkey contribute ${CIRCUIT}_0000.zkey ${CIRCUIT}_0001.zkey --name="1st Contributor Name" -v -e="random input"

# Export the verification key
snarkjs zkey export verificationkey ${CIRCUIT}_0001.zkey verification_key.json

# Generating ZK-proof
start_time=$(date +%s.%N)
snarkjs groth16 prove ${CIRCUIT}_0001.zkey ${CIRCUIT}_js/witness.wtns proof.json public.json
end_time=$(date +%s.%N)
elapsed_time=$(echo "$end_time - $start_time" | bc)
echo "Generate time: $elapsed_time"

# Verifying ZK-proof
start_time=$(date +%s.%N)
snarkjs groth16 verify verification_key.json public.json proof.json
end_time=$(date +%s.%N)
elapsed_time=$(echo "$end_time - $start_time" | bc)
echo "Verify time: $elapsed_time"

# Verify from smart contract 
# snarkjs zkey export solidityverifier test_0001.zkey verifier.sol

# Clean up after yourself
shopt -s extglob
rm -rv !(*.sh|*.sbatch|prover|*.log)
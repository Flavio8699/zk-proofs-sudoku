#!/bin/bash -l
#SBATCH -J snarkjs
#SBATCH --nodes=4
#SBATCH --ntasks-per-node=4
#SBATCH --mem=100GB
#SBATCH --cpus-per-task=4
#SBATCH --time=01:00:00
#SBATCH -p batch
####SBATCH --qos qos-batch
#SBATCH --mail-user=flavio8699@gmail.com
#SBATCH --mail-type=all

sh execute.sh > output.log 2>&1

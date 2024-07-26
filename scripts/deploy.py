

import json
from web3 import Web3

#connect to ganache 

w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))

# Ensure connection is successful
if not w3.is_connected():
    raise Exception("Failed to connect to the Ethereum node")

# Get the first account (deployer)
deployer = w3.eth.accounts[0]
print("Deployed by : ",deployer)

# Read the contract ABI and bytecode
with open('artifacts\contracts\projectwallet.sol\wallet.json', 'r') as file:
    contract_json = json.load(file)
    abi = contract_json['abi']
    bytecode = contract_json['bytecode']

# Create the contract instance
wallet_deploy = w3.eth.contract(abi=abi, bytecode=bytecode)

# Build the transaction
construct_txn = wallet_deploy.constructor().build_transaction({
    'from': deployer,
    'nonce': w3.eth.get_transaction_count(deployer),
    'gas': 2000000,
    'gasPrice': w3.to_wei('50', 'gwei')
})

# Sign the transaction
signed_txn = w3.eth.account.sign_transaction(construct_txn, private_key='0xc258ebdaeb585cac1fe0ded07fc61a1d6a00ae21bdbe8317e10f6ffd0cc986eb')

# Send the transaction
tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)


# Wait for the transaction receipt
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f'Contract deployed at address: {tx_receipt.contractAddress}')


#contract address 
contract_address = tx_receipt.contractAddress




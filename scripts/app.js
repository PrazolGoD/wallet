import {
    abi_key,
    contract_address
} from './dotenv.js';


document.getElementById("Connect").addEventListener('click', async () => {

    if (typeof window.ethereum != undefined) {
        console.log('MetaMask is installed!');
        window.web3 = new Web3(window.ethereum);

        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('MetaMask connected successfully');

            // Get accounts
            const accounts = await web3.eth.getAccounts();
            console.log('Accounts:', accounts);


            if (accounts.length === 0) {
                console.error('No accounts found. Please ensure MetaMask is unlocked.');
                return;
            }

            const defaultAccount = accounts[0];
            console.log('Default Account:', defaultAccount);

            console.log(contract_address, "contract address");

            const contractABI = abi_key;

            const contractAddress = contract_address;


            // Create contract instance

            const walletContractInstance = new web3.eth.Contract(contractABI, contractAddress);


            document.getElementById("depositbtn").addEventListener("click", async () => {
                console.log("Depositing.... ");
                const amount = document.getElementById("depositAmount").value;
                const ret = await walletContractInstance.methods.deposit().send({ from: defaultAccount, value: amount });
                console.log(amount, "is deposited ");

                document.getElementById("DepositedShow").innerText = `Deposited : ${amount}`;

            })

            document.getElementById("showMyBalance").addEventListener("click", async () => {
                console.log("showing your balance");
                const call = await walletContractInstance.methods.myBalance().call({ from: defaultAccount });
                console.log(call.toString());

                const balanceInEther = web3.utils.fromWei(call, 'ether');
                console.log("Balance (in ether):", balanceInEther);

                document.getElementById("BalanceShow").innerText =
                    `Your balance is : ${call} wei `;


            })

            document.getElementById("transfer").addEventListener("click", async () => {


                const amount = document.getElementById("transferAmount").value;
                const receiver = document.getElementById("recipient").value;

                console.log("Transfering...");

                await walletContractInstance.methods.transferTo(amount,receiver).send({from:defaultAccount});

                console.log("Transfered");



            })

            document.getElementById("withdraw").addEventListener("click", async () => {


                const amount = document.getElementById("withdrawAmount").value;
                console.log("Withdrawing!!!");
                const value = await walletContractInstance.methods.withdraw(amount).send({ from: defaultAccount });
                console.log(amount);
            })








        } catch (error) {
            console.log(error);
        }



    }
    else {
        console.log("install metamask  ");
    }

});
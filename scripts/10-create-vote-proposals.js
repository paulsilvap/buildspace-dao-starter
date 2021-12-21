import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js"

const voteModule = sdk.getVoteModule(
    "0x6b26a6FB0a0dFCF9863366556beC5254A253C234",
);

const tokenModule = sdk.getTokenModule(
    "0x924CF6FfEab50FB7c68d47d66103C985AC941e8d",
);

(async () => {
    try {
        const amount = 420_000;
        await voteModule.propose(
            "Should the DAO mint an additional " + amount + " tokens into the treasury?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "mint",
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]
        );

        console.log("Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try {
        const amount = 6_900;
        await voteModule.propose(
            "Should the DAO tranfer " +
            amount + " tokens from the treasury to " + 
            process.env.WALLET_ADDRESS + " for being awesome?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]
        );

        console.log("Successfully created a proposal to reward ourselves from the treasury");
    } catch (error) {
        console.error("failed to create second proposal", error);
    }
})();
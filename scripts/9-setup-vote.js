import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    "0x6b26a6FB0a0dFCF9863366556beC5254A253C234",
);

const tokenModule = sdk.getTokenModule(
    "0x924CF6FfEab50FB7c68d47d66103C985AC941e8d",
);

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log("Successfully gave module permissions to act on token module");
    } catch (error) {
        console.error("Failed to grant vote module permissions on token module", error);
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address,
            percent90
        );

        console.log("Successfully transfered tokens to vote module");
    } catch (error) {
        console.error("Failed to transfer tokens to vote module", error);
    }
})();
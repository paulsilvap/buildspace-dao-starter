import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0x924CF6FfEab50FB7c68d47d66103C985AC941e8d",
);

(async () => {
    try {
        const amount = 1_000_000;
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "There now is",
            ethers.utils.formatUnits(totalSupply, 18),
            "$DRGN in circulation",
        );
    } catch (error) {
        console.error("Failed to print money", error);
    }
})();
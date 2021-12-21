import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x99Fd9A065BFC085643245b8beb4e45E601bD6994");

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "My DAO Membership",
            description: "A DAO for people close to me",
            image: readFileSync("scripts/assets/0.png"),
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "Successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );
        console.log(
            "bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundleDrop module", error);
    }
})()
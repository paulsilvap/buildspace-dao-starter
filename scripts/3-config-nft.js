import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0x6dC65b4Dd7402aD2E895db1FB040FeF0D486c148"
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "Berk Crest",
                description: "This NFT will give you access to My DAO!",
                image: readFileSync("scripts/assets/berk.jpg"),
            },
        ]);
        console.log("Successfully created an new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
})()
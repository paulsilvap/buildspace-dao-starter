import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x99Fd9A065BFC085643245b8beb4e45E601bD6994");

(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "MyDAO Governance Token",
            symbol: "DRGN",
        });
        console.log("Successfully deployed token module, address:", tokenModule.address,);
    } catch (error) {
        console.error("failed to deploy token module", error);
    }
})();
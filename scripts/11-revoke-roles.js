import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0x924CF6FfEab50FB7c68d47d66103C985AC941e8d",
);

(async () => {
    try {
        console.log(
            "Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
        );

        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log(
            "Roles after revoking ourselves",
            await tokenModule.getAllRoleMembers()
        );
        console.log("Successfully revoked our superpowers from the ERC-20 contract");
    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasur", error);
    }
})();
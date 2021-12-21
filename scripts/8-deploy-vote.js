import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
    "0x99Fd9A065BFC085643245b8beb4e45E601bD6994",
);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "MyDAO's Proposals",

            votingTokenAddress: "0x924CF6FfEab50FB7c68d47d66103C985AC941e8d",

            proposalStartWaitTimeInSeconds: 0,

            proposalVotingTimeInSeconds: 24 * 60 * 60,

            votingQuorumFraction: 0,

            minimumNumberOfTokensNeededToPropose: "0",
        });

        console.log(
            "Successfully deployed vote module, address:",
            voteModule.address,
        );
    } catch (error) {
        console.log("Failed to deploy vote module", error);
    }
})();

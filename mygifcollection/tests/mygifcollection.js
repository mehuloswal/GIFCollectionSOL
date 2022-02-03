const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = require("@solana/web3.js");

describe("mygifcollection", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mygifcollection;
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    await program.rpc.initialize({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: anchor.Provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    assert.equal("0", account.totalGifs.toString(), "They are not equal");
  });
});

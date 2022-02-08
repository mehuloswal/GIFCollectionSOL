const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = require("@solana/web3.js");

describe("mygifcollection", () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Mygifcollection;
  const baseAccount = anchor.web3.Keypair.generate();

  console.log(anchor.Provider.wallet);

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

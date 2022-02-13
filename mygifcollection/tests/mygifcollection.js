const anchor = require("@project-serum/anchor");

// Need the system program, will talk about this soon.
const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");

  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Mygifcollection;

  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  // Call start_stuff_off, pass it the params it needs!
  let tx = await program.rpc.initialize({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });

  console.log("📝 Your transaction signature", tx);

  // Fetch data from the account.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());

  await program.rpc.addGif("Insert_A_Gif_Link_Here", {
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
    },
  });
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 GIF Count", account.totalGifs.toString());
  console.log("👀 GIF List", account.gifList);

  console.log("➡️Sending Some SOL to other account");
  const account1 = anchor.web3.Keypair.generate();
  const account2 = anchor.web3.Keypair.generate();

  await provider.connection.confirmTransaction(
    await provider.connection.requestAirdrop(account1.publicKey, 10000000000),
    "confirmed"
  );

  await program.rpc.giftSol(anchor.BN(20000000), {
    accounts: {
      from: account1.publicKey,
      to: account2.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [account1],
  });
  const balance = program.provider.connection.getBalance(account2.publicKey);
  console.log("💰 is ", balance);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

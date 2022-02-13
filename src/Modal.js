import React, { useState } from "react";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3, BN } from "@project-serum/anchor";
import idl from "./idl.json";
import "./App.css";

const { SystemProgram } = web3;
const programID = new PublicKey(idl.metadata.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};

const Modal = (props) => {
  const [inputValue, setInputValue] = useState(null);
  const onInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  if (!props.show) {
    return null;
  }
  let index = props.modalIndex;
  let gifList = props.gifList;
  let gifItem = gifList[index];
  let toAddress = gifItem.userAddress;
  //   console.log(gifItem);

  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new Provider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };
  const sendSol = async () => {
    if (inputValue.length === 0) {
      console.log("Please enter amount");
      return;
    }
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      await program.rpc.giftSol(new BN(inputValue * web3.LAMPORTS_PER_SOL), {
        accounts: {
          from: provider.wallet.publicKey,
          to: toAddress,
          systemProgram: SystemProgram.programId,
        },
        signers: [props.walletAddress],
      });
      console.log("Please check wallet balance");
    } catch (error) {
      console.log("Error sending SOL", error);
    }
  };
  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Gift some SOL</span>
        </div>
        <div className="modal-body">
          <div className="modal-body-title">
            Accepting all sorts of GIFts ;)
          </div>
          <div className="payment">
            <div className="modal-gif-item">
              <img src={gifItem.gifLink} alt={gifItem.gifLink} />
              <span
                style={{
                  color: "white",
                  paddingTop: "10px",
                  fontWeight: "bold",
                }}
              >
                Uploaded By : {gifItem.userAddress.toString()}
              </span>
            </div>
            <div className="amount">
              <span className="solana-amount">
                {inputValue ? inputValue : 0} SOL
              </span>
              <input
                type="number"
                value={inputValue}
                onChange={onInputChange}
                placeholder="Enter SOL..."
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cta-button submit-gif-button"
            onClick={() => sendSol()}
          >
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

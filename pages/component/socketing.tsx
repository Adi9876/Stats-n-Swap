import * as dotenv from 'dotenv'
dotenv.config()
import { Bridge } from "@socket.tech/plugin";
import dynamic from "next/dynamic";
import { use, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const DynamicBridge = dynamic(

  () => import("@socket.tech/plugin").then((mod) => mod.Bridge),
  {
    ssr: false,
  }
);

export default function SocketBridge() {

  // const { chain } = useNetwork();
  // const signer = useEthersSigner({ chainId: chain?.id });
  // const provider = signer?.provider;

  // const web3Modal = new Web3Modal()
  // const connection = await web3Modal.connect()
  // const provider = new ethers.BrowserProvider(connection)

  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const router = useRouter();

  async function connect() {
    try {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider: any = new ethers.BrowserProvider(connection)
      const signer = await provider.getSigner();
      console.log(signer.getAddress());

      setProvider(provider);
      if (!connected) {
        setConnected(true);
      }
      else {
        await web3Modal.clearCachedProvider();
        setProvider(null);
        setConnected((false))
        router.push("/swap");
      }
    } catch (error) {
      alert("An error occured try refreshing...")
      console.log(error);
    }
  }

  return <div className="flex w-full h-full">
    <div className="absolute top-10 right-10 p-2">
      <button
        onClick={connect}
        className="p-1.5 rounded-xl transition ease-in-out delay-150 bg-gradient-to-r from-blue-500 to-purple-500 hover:-translate-y-1 hover:scale-105 text-white shadow-lg"
      >
        {!connected ? 'Connect Wallet' : 'Disconnect'}
      </button>
    </div>
    <div className="flex h-full w-full mt-20 items-center justify-center">
      <div>
        {/* this api is open for all i guess  */}
        <DynamicBridge provider={provider} API_KEY="" />
      </div>
    </div>
  </div>

}

// export default SocketBridge;

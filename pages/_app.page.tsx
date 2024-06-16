import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {


  return (<div>
  <div >
    <nav className="border-b p-6 bg-opacity-75 bg-gray-900">
      <div className="flex justify-left">
        <p className="text-4xl font-bold text-5xl glowing-text">
          Stats n Swap
        </p>
      </div>

      <div className="flex mt-4 justify-between text-lg ">
        <div className="flex m-4">
          <Link legacyBehavior href="/">
            <a className="mr-4 text-purple-400 hover:text-purple-100 ">
              Crypto Stats
            </a>
          </Link>
          <Link legacyBehavior href="/swap">
            <a className="mr-4 text-purple-400  hover:text-purple-100  ">
              Token Swap
            </a>
          </Link>
        </div>
      </div>

    </nav>
  </div>

  <Component {...pageProps} />
</div>);
}

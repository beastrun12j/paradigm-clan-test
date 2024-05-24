import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { dark } from "@clerk/themes";
import { EdgeStoreProvider } from "../lib/edgestore";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paradigm Clan",
  description: "A student community for learning and sharing knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          <EdgeStoreProvider>
            <div className="navbar bg-base-100">
              <div className="navbar-start">
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost lg:hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Classes</a>
                      <ul className="p-2">
                        <li>
                          <div className="dropdown dropdown-right">
                            <div tabIndex={0} role="button" className="m-1">
                              Class XI
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a href="english_11">English</a>
                              </li>
                              <li>
                                <a href="physics_11">Physics</a>
                              </li>
                              <li>
                                <a href="chemistry_11">Chemistry</a>
                              </li>
                              <li>
                                <a href="maths_11">Maths</a>
                              </li>
                              <li>
                                <a href="IT_11">IT</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="dropdown dropdown-right">
                            <div tabIndex={0} role="button" className="m-1">
                              Class XII
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a href="english_12">English</a>
                              </li>
                              <li>
                                <a href="physics_12">Physics</a>
                              </li>
                              <li>
                                <a href="chemistry_12">Chemistry</a>
                              </li>
                              <li>
                                <a href="maths_12">Maths</a>
                              </li>
                              <li>
                                <a href="IT2_12">IT 2.0</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <a className="btn btn-ghost text-xl" href="/">
                  Paradigm Clan
                </a>
              </div>
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <details>
                      <summary>Classes &nbsp;&nbsp;&nbsp;</summary>
                      <ul className="">
                        <li>
                          <div className="dropdown dropdown-right">
                            <div tabIndex={0} role="button" className="m-1">
                              Class XI
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-75"
                            >
                              <li>
                                <a href="english_11">English</a>
                              </li>
                              <li>
                                <a href="physics_11">Physics</a>
                              </li>
                              <li>
                                <a href="chemistry_11">Chemistry</a>
                              </li>
                              <li>
                                <a href="maths_11">Maths</a>
                              </li>
                              <li>
                                <a href="IT_11">IT</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <div className="dropdown dropdown-right">
                            <div tabIndex={0} role="button" className="m-1">
                              Class XII
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-75"
                            >
                              <li>
                                <a href="english_12">English</a>
                              </li>
                              <li>
                                <a href="physics_12">Physics</a>
                              </li>
                              <li>
                                <a href="chemistry_12">Chemistry</a>
                              </li>
                              <li>
                                <a href="maths_12">Maths</a>
                              </li>
                              <li>
                                <a href="IT2_12">IT 2.0</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
              <div className="navbar-end">
                {/* <a className="btn">Button</a> */}
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
            <div className="bg-neutral">{children}</div>
          </EdgeStoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

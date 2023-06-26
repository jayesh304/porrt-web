"use client";
import { useAuth } from "@/context/AuthContext";
import Button from "./Button";

const Nav = () => {
  const { user, signOut } = useAuth();
  return (
    <nav className="grid grid-cols-3 place-content-center w-full p-4 max-w-[96rem] mx-auto text-white">
      <div className="w-full flex items-center justify-start gap-4">
        <a href="/about">About</a>
        {user && <a href="/testing">Profile</a>}
      </div>
      <a
        href="/"
        className="flex items-center justify-center text-lg font-bold drop-shadow"
      >
        Porrt.in
      </a>
      <div className="flex items-center justify-end">
        {user ? (
          <button
            className="text-sm rounded-lg text-center p-2 hover:opacity-100 opacity-75 transition-all duration-200 delay-75 bg-white text-black flex  items-center justify-center gap-1 group h-8"
            type="submit"
            onClick={() => signOut()}
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
            <p className="hidden group-hover:block text-sm p-0 m-0">Sign out</p>
          </button>
        ) : (
          <Button IsPrimary={true} Link="/auth" CSS="px-4 p-2">
            Get Started
          </Button>
        )}
      </div>
    </nav>
  );
};
export default Nav;

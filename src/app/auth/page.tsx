"use client";
import { useAuth } from "@/context/AuthContext";
import supabase from "@/supabase";
import { Auth as AuthUI } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Auth = () => {
  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (user) router.push("/account");
  }, [user]);

  return (
    <div className="h-full grid place-content-center">
      <div className="h-full mx-auto bg-white/20 p-4 rounded-md">
        {supabase && (
          <AuthUI
            supabaseClient={supabase}
            view="magic_link"
            appearance={{
              theme: ThemeSupa,
              style: {
                input: { background: "white" },
                label: { color: "black" },
                button: { background: "white", color: "black" },
                //..
              },
            }}
            showLinks={false}
            providers={["github"]}
            redirectTo={`${location.hostname}/auth`}
          />
        )}
      </div>
    </div>
  );
};
export default Auth;

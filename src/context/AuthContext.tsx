"use client";

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import supabase from "@/supabase";
import { Loading } from "@/components/Loading";

type IAuth = {
  user: User | null | undefined;
  session: Session | null | undefined;
  signOut: () => void;
};
const AuthContext = createContext<IAuth | null>({
  session: null,
  user: null,
  signOut: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      if (session) {
        console.log(session);
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    };

    const { data: listner } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    );
    setData();

    return () => {
      listner?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    signOut: () => supabase.auth.signOut(),
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

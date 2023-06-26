"use client";
import { useCallback, useEffect, useState } from "react";
import Avatar from "./avatar";
import supabase from "@/supabase";
import { useAuth } from "@/context/AuthContext";

const AccountForm = () => {
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");
  const { user } = useAuth();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (user == null) return;
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, about, avatar_url`)
        .eq("id", user?.id)
        .single();

      console.log(data, status, error);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setFullname(data.full_name);
        setUsername(data.username);
        setAbout(data.about);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        about,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-y-6 bg-white/20 p-4 w-full rounded-md outline outline-white/50 outline-1 max-w-md">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold leading-7 ">Profile</h2>
          <p className="text-xs leading-6 text-black/80">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 "
            >
              Username
            </label>
            <div className="w-full flex rounded-md bg-gray-100/80  ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                porrt.in/
              </span>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus-visible:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="username"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 "
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                value={about || ""}
                onChange={(e) => setAbout(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-3 ring-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring focus:outline-indigo-600 sm:text-sm sm:leading-6 bg-gray-100/80"
              ></textarea>
            </div>
            <p className="mt-1 text-xs leading-6 text-black/80">
              Write a few sentences about yourself.
            </p>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 "
            >
              Photo
            </label>
            <Avatar
              uid={user?.id}
              url={avatar_url}
              size={84}
              onUpload={(url) => {
                setAvatarUrl(url);
                updateProfile({ username, avatar_url: url });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-base font-semibold leading-7 ">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium leading-6 "
              >
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  placeholder="Full name"
                  value={fullname || ""}
                  onChange={(e) => setFullname(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-3 ring-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring focus:outline-indigo-600 sm:text-sm sm:leading-6 bg-gray-100/80"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  autoComplete="email"
                  value={user?.email}
                  disabled={true}
                  className="block w-full rounded-md border-0 py-1.5 px-3   ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-100/80"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            onClick={() => updateProfile({ username, avatar_url })}
            className="rounded-md bg-white/70 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default AccountForm;

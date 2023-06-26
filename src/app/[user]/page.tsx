"use client";
import { useCallback, useEffect, useState } from "react";
import LinkUI from "@/components/LinkUI";
import AddLinkUI from "@/components/AddLinkUI";
import Image from "next/image";
import { ILinkItem, IUser } from "@/lib/profile.types";
import supabase from "@/supabase";
import { useAuth } from "@/context/AuthContext";

const UserPage = ({ params }: { params: any }) => {
  const userName = params?.user;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<null | IUser>(null);
  const [links, setLinks] = useState<Array<ILinkItem> | null | any>(null);
  const [link, setLink] = useState<ILinkItem | null | any>(null);

  const fetchLinks = async () => {
    try {
      if (userData) {
        let { data, error, status } = await supabase
          .from("links")
          .select(
            `id, user_id, web_url, image_url, title, sort_order, description`
          )
          .eq("user_id", userData?.id);
        if (error && status !== 406) {
          throw error;
        }
        console.log(data);
        if (data) setLinks(data);
      } else return;
    } catch (error) {
      console.error(error);
    }
  };
  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }
  const getUserByUserName = useCallback(async () => {
    try {
      setLoading(true);
      let {
        data: userData,
        error,
        status,
      } = await supabase
        .from("profiles")
        .select(`id, full_name, username, about, avatar_url, web_url`)
        .eq("username", userName)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (userData) {
        setUserData(userData);
        downloadImage(userData?.avatar_url);
        let { data, error, status } = await supabase
          .from("links")
          .select(
            `id, user_id, web_url, image_url, title, sort_order, description`
          )
          .eq("user_id", userData?.id)
          .order("sort_order");
        console.log(data);

        if (error && status !== 406) {
          throw error;
        }
        setLinks(data);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [userName, supabase]);

  const getUserByID = useCallback(async () => {
    try {
      setLoading(true);
      let {
        data: userData,
        error,
        status,
      } = await supabase
        .from("profiles")
        .select(`id,full_name, username, about, avatar_url, web_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (userData) {
        setUserData(userData);
        downloadImage(userData?.avatar_url);
        let { data, error, status } = await supabase
          .from("links")
          .select(
            `id, user_id, web_url, image_url, title, sort_order, description`
          )
          .eq("user_id", userData?.id)
          .order("sort_order");

        if (error && status !== 406) {
          throw error;
        }
        setLinks(data);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    console.log(user);
    if (user != null) getUserByID();
    else if (userName != null) getUserByUserName();
  }, [user, userName, getUserByUserName, getUserByID]);

  return (
    <div className="flex w-full items-center justify-center h-full gap-4">
      {userData && (
        <div className="flex flex-col gap-6 items-center">
          <div className="grid place-items-center gap-2">
            {avatarUrl ? (
              <Image
                width={96}
                height={96}
                src={avatarUrl}
                alt="Avatar"
                className="rounded-md h-24 w-24 bg-cover object-cover"
              />
            ) : (
              <div>
                <svg
                  className=" text-gray-300"
                  style={{ width: 96, height: 96 }}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
            <div className="flex flex-col items-center">
              <p>{userData?.full_name}</p>
              <p className="text-sm">{userData?.about}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
            {links &&
              links.map((ele: ILinkItem) => {
                return (
                  <LinkUI
                    link={ele}
                    user_id={user?.id!}
                    key={ele?.id}
                    onChange={() => fetchLinks()}
                    onUpdate={(link) => setLink(link)}
                  />
                );
              })}
          </div>
          {user && user?.id === userData?.id && (
            <AddLinkUI
              user_id={user?.id}
              link={link}
              onChange={() => fetchLinks()}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default UserPage;

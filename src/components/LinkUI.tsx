import { useEffect, useState } from "react";
import Image from "next/image";
import { ILinkItem } from "@/lib/profile.types";
import supabase from "@/supabase";

const LinkUI = ({
  link,
  user_id,
  onChange,
  onUpdate,
}: {
  link: ILinkItem;
  user_id: string;
  onChange: (...args: any) => void;
  onUpdate: (...args: any) => void;
}) => {
  const [avatarUrl, setAvatarUrl] = useState<any | null>(null);

  async function deleteLink() {
    try {
      let { error } = await supabase.from("links").delete().eq("id", link?.id);
      if (error) throw error;
    } catch (error) {
      alert("Error!");
    }
    onChange();
  }
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("linkImages")
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

    if (link?.image_url) downloadImage(link?.image_url);
  }, [link?.image_url, supabase]);

  return (
    <div className="flex gap-3 justify-between items-center w-full h-full min-w-[16rem] max-w-[24rem] p-1.5 bg-blur-3xl transition-all bg-gray-50/60 hover:bg-gray-100 text-black rounded">
      <a href={link?.web_url} target="_blank" className="flex gap-3 w-full">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            className="rounded h-16 w-16"
            width={64}
            height={64}
            alt="Link Image"
          />
        ) : (
          <div className="rounded bg-gray-200">
            <svg
              className=" text-gray-300 h-16 w-16"
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
        <div className="flex flex-col justify-between h-full">
          <p className="text-sm line-clamp-2">{link?.title}</p>
          <p className="text-xs text-gray-400">{link?.description}</p>
        </div>
      </a>
      {link?.user_id === user_id ? (
        <div className="flex flex-col h-full justify-between items-center gap-2 z-10 -mr-10">
          <button
            className=" hover:bg-emerald-200/40 p-1 rounded"
            onClick={() => onUpdate(link)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 stroke-emerald-900"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
          <button
            className="p-1 rounded hover:bg-red-200/30"
            type="submit"
            onClick={() => deleteLink()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 stroke-red-500 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default LinkUI;

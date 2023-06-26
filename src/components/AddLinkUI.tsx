import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ILinkItem } from "@/lib/profile.types";

const AddLinkUI = ({
  user_id,
  link,
  onChange,
}: {
  user_id: string;
  link: ILinkItem;
  onChange: (...args: any) => void;
}) => {
  let supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const [showAddUI, setShowAddUI] = useState(false);
  const [linkData, setLinkData] = useState<ILinkItem | null>(link);

  async function saveLink() {
    try {
      setLoading(true);
      if (!linkData) return;
      let error;
      if (link)
        error = (
          await supabase
            .from("links")
            .update({
              web_url: linkData.web_url,
              image_url: linkData.image_url,
              title: linkData.title,
              description: linkData.description,
              updated_at: new Date().toISOString(),
            })
            .eq("id", link?.id)
        ).error;
      else
        error = (
          await supabase.from("links").insert({
            user_id: user_id,
            web_url: linkData.web_url,
            image_url: linkData.image_url,
            title: linkData.title,
            description: linkData.description,
            updated_at: new Date().toISOString(),
          })
        ).error;
      if (error) throw error;
    } catch (error) {
      alert("Error updating the data!");
      setLoading(false);
    } finally {
      setLoading(false);
      setShowAddUI(false);
      onChange();
    }
  }

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user_id}-${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("linkImages")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      setLinkData({ ...linkData, image_url: filePath });
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
    }
  };

  useEffect(() => {
    if (link) {
      setShowAddUI(true);
      setLinkData(link);
    }
  }, [link]);

  return (
    <div>
      {showAddUI ? (
        <div className="flex flex-col gap-2 place-items-center">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <input
              type="text"
              className="p-1.5 px-2 text-black bg-gray-100 rounded "
              name="title"
              id="title"
              value={linkData?.title || ""}
              onChange={(e) =>
                setLinkData({ ...linkData, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <input
              type="text"
              className="p-1.5 px-2 text-black bg-gray-100 rounded "
              name="description"
              id="description"
              value={linkData?.description || ""}
              onChange={(e) =>
                setLinkData({ ...linkData, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="url" className="text-sm">
              Link
            </label>
            <input
              type="text"
              className="p-1.5 px-2 text-black bg-gray-100 rounded "
              name="url"
              id="url"
              value={linkData?.web_url || ""}
              onChange={(e) =>
                setLinkData({ ...linkData, web_url: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="url" className="text-sm">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              aria-describedby="file_input_help"
              className="block w-full text-sm text-gray-900 p-1 rounded cursor-pointer bg-gray-50  focus:outline-none"
              onChange={uploadAvatar}
            />
          </div>
          <div className="col-span-2 mt-4 flex gap-2 items-center justify-center">
            <button
              className="flex items-center justify-center gap-1 rounded-md px-4 py-1.5 text-sm font-semibold text-black/80 ring-inset hover:ring-2 hover:ring-white/50 transition-all"
              onClick={() => setShowAddUI(false)}
            >
              Cancel
            </button>
            <button
              className="  rounded-md bg-white/70 px-6 py-1.5 text-sm font-semibold  shadow-sm hover:bg-white transition-all"
              type="submit"
              onClick={() => saveLink()}
              disabled={loading}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <button
          className="flex items-center justify-center gap-1 rounded-md bg-white/70 px-4 pl-2.5 py-1.5 text-sm font-semibold  shadow-sm hover:bg-white transition-all"
          onClick={() => setShowAddUI(true)}
        >
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Add new</p>
        </button>
      )}
    </div>
  );
};
export default AddLinkUI;

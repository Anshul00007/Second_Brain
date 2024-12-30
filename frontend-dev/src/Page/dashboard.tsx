import { useState, useEffect } from "react";
import Button1 from "../components/buttonmain";
import Card from "../components/card";
import SideBar from "../components/sidebarmain";
import { SvgsBrain, SvgsDelete, SvgsEdit } from "../components/svgs";
import axios from "axios";
import { BACKEND_URL } from "../config";
import TypeIt from "typeit-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
}

export default function Dashboard() {
  const [isCardVisible, setCardVisible] = useState(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSharedContent, setIsSharedContent] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const [editLink, setEditLink] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
    } else {
      const hash = window.location.pathname.split("/")[2];
      if (hash) {
        fetchSharedContent(hash);
      } else {
        fetchContents();
      }
    }
  }, [navigate]);

  async function fetchSharedContent(hash: string) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
      setUsername(response.data.username);
      setContents(response.data.content);
      setIsSharedContent(true);
    } catch (e) {
      setError("Couldn't fetch shared content.");
      console.error(e);
    }
  }

  async function fetchContents() {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(BACKEND_URL + "/api/v1/content", {
        headers: {
          token: token,
        },
      });
      setContents(response.data.contents);
    } catch (e) {
      console.error("Couldn't fetch the contents", e);
    }
  }

  async function deleteContent(contentId: string) {
    const token = localStorage.getItem("jwt");
    try {
      await axios.delete(BACKEND_URL + "/api/v1/content", {
        headers: {
          token: token,
        },
        data: {
          contentId: contentId,
        },
      });
      fetchContents();
    } catch (e) {
      console.error("Couldn't delete the content", e);
    }
  }

  async function saveEditedLink(contentId: string) {
    const token = localStorage.getItem("jwt");
    if (!editLink) return;

    try {
      await axios.put(
        BACKEND_URL + "/api/v1/content",
        {
          contentId,
          link: editLink,
        },
        {
          headers: {
            token: token,
          },
        }
      );
      setEditingContentId(null);
      setEditLink(null);
      fetchContents();
    } catch (e) {
      console.error("Couldn't save the edited link", e);
    }
  }

  function toggleEdit(contentId: string, link: string) {
    setEditingContentId(contentId);
    setEditLink(link);
  }

  function cancelEdit() {
    setEditingContentId(null);
    setEditLink(null);
  }

  function Addme() {
    setCardVisible(!isCardVisible);
  }

  function getYouTubeId(url: string): string | null {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*[?&]v=))|(?:https?:\/\/youtu\.be\/))([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  function getTwitterEmbedUrl(url: string): string | null {
    const regex = /https:\/\/(?:www\.)?x\.com\/(.+)\/status\/(\d+)/;
    const match = url.match(regex);
    return match
      ? `https://platform.twitter.com/embed/Tweet.html?id=${match[2]}`
      : null;
  }

  async function ShareIt() {
    const token = localStorage.getItem("jwt");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/v1/brain/shareapp",
        { share: true },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.hash) {
        setShareLink(`${window.location.origin}/share/${response.data.hash}`);
      }
    } catch (e) {
      setError("Couldn't generate the share link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyToClipboard() {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  }

  const filteredContents = filterType
    ? contents.filter((content) => content.type === filterType)
    : contents;

  function isImageUrl(url: string): boolean {
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp)$/i;
    return imageExtensions.test(url.split("?")[0]);
  }

  return (
    <div className="flex h-screen fixed inset-0 overflow-y-auto bg-gray-200">
      <SideBar
        title="Second Brain"
        svgs={<SvgsBrain />}
        onFilterSelect={setFilterType}
      />
      <div className="flex-1 p-4 mr-96 sm:mr-0 overflow-y-auto ml-8 z-20  sm:ml-64">
        <div className="flex items-center  justify-between mt-4">
          {shareLink && (
            <div className="flex items-center space-x-2">
              <p className="text-xl font-semibold">Your shareable link:</p>
              <input
                type="text"
                value={shareLink}
                readOnly
                className="p-2 w-96 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={copyToClipboard}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              >
                Copy Link
              </button>
            </div>
          )}

          <div className="flex absolute flex-col items-center sm:flex-row right-4 bottom-72 sm:bottom-0 sm:relative sm:left-0 sm:mt-0 mt-16 space-y-2  sm:space-x-4">
            {!isSharedContent && (
              <Button1
                title="Add Content"
                className=" text-purple-600  font-semibold "
                Size="lg"
                onClick={Addme}
              />
            )}
            {!isSharedContent && (
              <Button1  title="Share Brain" Size="sm" onClick={ShareIt} />
            )}
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {isSharedContent && (
          <div>
            <h2 className="text-4xl text-center mb-4">Shared by {username}</h2>
          </div>
        )}

        <div className="w-full flex justify-center items-center relative">
          {contents.length === 0 && !isSharedContent && (
            <TypeIt
              className="absolute mt-48 inset-0 flex justify-center items-center text-7xl text-gray-400 opacity-0 animate-fadeInRotate"
              options={{
                strings: ["Add Some Content Here!!"],
                speed: 25,
                waitUntilVisible: true,
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  absolute left-8 top-72 sm:top-0 sm:left-0 sm:relative md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredContents.map((content) => (
            <motion.div
              key={content._id}
              className="bg-white rounded-sm shadow-md p-3 flex flex-col space-y-4 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                backgroundColor: "gray",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                borderRadius: "15px",
              }}
            >
              <div className="flex items-center justify-center">
                <button
                  className="absolute top-2 left-2"
                  onClick={() => toggleEdit(content._id, content.link)}
                >
                  <SvgsEdit />
                </button>
                {!isSharedContent && (
                  <button
                    className="absolute top-2 right-2"
                    onClick={() => deleteContent(content._id)}
                  >
                    <SvgsDelete />
                  </button>
                )}
              </div>
              <h3 className="text-4xl font-bold text-gray-800 text-center">
                {content.title}
              </h3>

              {editingContentId === content._id && (
                <div className="mt-6">
                  <input
                    type="text"
                    value={editLink || ""}
                    onChange={(e) => setEditLink(e.target.value)}
                    className="border w-full mt-2 mb-4 border-gray-500 rounded-md p-2"
                  />
                  <div className="flex justify-between space-x-4">
                    <button
                      onClick={() => saveEditedLink(content._id)}
                      className="bg-purple-500 text-white py-2 px-6 rounded-md w-full sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-300 text-black py-2 px-4 rounded-md w-full sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-center items-center max-h-[300px] overflow-y-auto">
                {getYouTubeId(content.link) ? (
                  <iframe
                    width="250"
                    height="250"
                    src={`https://www.youtube.com/embed/${getYouTubeId(
                      content.link
                    )}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : getTwitterEmbedUrl(content.link) ? (
                  <iframe
                    width="250"
                    height="300"
                    src={getTwitterEmbedUrl(content.link) || ""}
                    title="Twitter Embed"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                ) : isImageUrl(content.link) ? (
                  <img
                    src={content.link}
                    alt="Embedded Image"
                    className="max-w-full max-h-[300px] object-contain"
                  />
                ) : (
                  <a
                    href={content.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-blue-500"
                  >
                    {content.link}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

       


        {isCardVisible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg z-10"></div>
        )}

        {isCardVisible && (
          <div className="absolute inset-0 z-20 flex justify-center items-center">
            <Card onClose={Addme} onContentAdded={fetchContents} />
          </div>
        )}
      </div>
    </div>
  );
}

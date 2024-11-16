import axios from "axios";
import { useState } from "react";
import SteamLogo from "./img/steam-logo.png";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [userProfileUrl, setUserProfileUrl] = useState(null);
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleId = (event) => {
    setId(event.target.value);
  };

  const goToSteamProfile = () => {
    window.open(userProfileUrl, "_blank");
  };

  const handleData = async () => {
    setLoading(true);
    setUserData(null);
    try {
      const response = await axios.get(
        `https://api.opendota.com/api/players/${id}`
      );
      setUserData(response.data.profile);
      setUserProfileUrl(response.data.profile.profileurl);
    } catch (error) {
      setError(true);
      console.error("Erro ao buscar dados:", error);
    }
    setId("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-500 justify-center items-center ">
      <h1 className="font-bold text-xl mb-5">Steam Profile Finder</h1>
      <div className="mb-5 flex flex-col">
        <input
          type="number"
          placeholder="Insert your SteamID3..."
          onChange={handleId}
          value={id}
          className="p-2 min-w-80  bg-slate-700 text-white rounded-xl border-1 border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
        />
        <button
          onClick={handleData}
          className={`mt-3 p-2 min-w-80 text-white rounded-xl transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          Search
        </button>
      </div>
      <main className="flex flex-col w-80 h-2/3 justify-center items-center gap-5 bg-slate-800 p-10 rounded-3xl  ">
        {loading ? (
          <div
            className="border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
                      aspect-square w-8 flex justify-center items-center text-yellow-700"
          ></div>
        ) : userData ? (
          <>
            <img
              src={userData.avatarfull}
              alt="avatar"
              className="rounded-full"
            />
            <div className="flex flex-col justify-start w-full">
              <p className="font-bold">
                Username:{" "}
                <span className="font-thin">{userData.personaname}</span>
              </p>
              <p className="font-bold">
                Last login:{" "}
                <span className="font-thin">
                  {format(userData.last_login, "dd/MM/yyyy HH:mm:ss", {
                    locale: ptBR,
                  })}
                </span>
              </p>
              <p className="font-bold">
                Account ID:{" "}
                <span className="font-thin">{userData.account_id}</span>
              </p>
              <p className="font-bold">
                SteamID: <span className="font-thin">{userData.steamid}</span>
              </p>
            </div>
            <button
              onClick={goToSteamProfile}
              className="flex items-center justify-center mt-3 p-2 w-72 bg-zinc-600 text-white rounded-xl hover:bg-zinc-700 transition-colors"
            >
              <img src={SteamLogo} alt="" className="w-8 mr-5" />
              Go to Steam Profile
            </button>
          </>
        ) : error ? (
          <>
          <p>Error fetching data. </p>
          <span className="text-xl">☹️</span>
        </>
        ) : (
          <>
            <p>Your data appeared here. </p>
            <span className="text-xl">😀</span>
          </>
        )}
      </main>
    </div>
  );
}

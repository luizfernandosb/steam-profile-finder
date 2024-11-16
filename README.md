{userData ? (
          <>
            <img
              src={userData.avatarfull}
              alt="avatar"
              className="rounded-full"
            />
            <div>
              <p className="font-bold">
                Username:{" "}
                <span className="font-thin">{userData.personaname}</span>
              </p>
              <p className="font-bold">
                Last login:{" "}
                <span className="font-thin">{userData.last_login}</span>
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
              className="flex items-center justify-center mt-3 p-2 w-72 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <img src={SteamLogo} alt="" className="w-8 mr-5" />
              Go to Steam Profile
            </button>
          </>
        ) : (
          <p className={error ? "text-red-700 font-bold" : ""}>
            {error ? "Erro ao buscar dados" : "Your data appeared here."}
          </p>
        )}
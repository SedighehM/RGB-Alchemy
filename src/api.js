import axios from "axios";

//ّFetchs game information from the server
const getGameInfo = (userId) => {
  //According to whether the user ID has been passed or not, the URL changes
  let url = userId
    ? `http://localhost:9876/init/user/${userId}`
    : "http://localhost:9876/init";

  return axios.get(url);
};

export default getGameInfo;

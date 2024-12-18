import { io } from "socket.io-client";
import Cookies from "js-cookie";
// "undefined" means the URL will be computed from the `window.location` object
const URL = `https://${process.env.BASE_URL}`;

export const socket = io(URL, {
  extraHeaders: {
    Authorization: "Bearer " + Cookies.get("access_token"),
  },
});

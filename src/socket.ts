import { io } from "socket.io-client";
import Cookies from "js-cookie";
// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : `http://ec2-35-173-139-149.compute-1.amazonaws.com/`;

export const socket = io(URL, {
  extraHeaders: {
    Authorization: "Bearer " + Cookies.get("access_token"),
  },
});

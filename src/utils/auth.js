// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";
import axios from "axios";

// create a new class to instantiate for a user
class AuthService {
  logout() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/";
  }
}

export default new AuthService();

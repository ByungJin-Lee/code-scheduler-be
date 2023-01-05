import setUpLocal from "./local";
import setUpJwt from "./jwt";

export default function applyPassportStrategy() {
  setUpLocal();
  setUpJwt();
}

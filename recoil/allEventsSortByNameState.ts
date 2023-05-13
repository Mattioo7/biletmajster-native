import { atom } from "recoil";

const allEventsSearchNameState = atom<string>({
  key: "allEventsSearchNameState",
  default: "",
});

export default allEventsSearchNameState;

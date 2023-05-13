import { atom } from "recoil";

const showCategoriesAccordionState = atom<boolean>({
  key: "showCategoriesAccordionState",
  default: false,
});

export default showCategoriesAccordionState;

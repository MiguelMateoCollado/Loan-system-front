import { atomWithStorage } from "jotai/utils";
const countAtom = atomWithStorage("count", 0);

export default countAtom;

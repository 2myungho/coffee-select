import { firestore } from "./firebase";

export const COLLECTION = process.env.REACT_APP_COLLECTION ?? "";
export const DOC = process.env.REACT_APP_DOC ?? "";
export const COFFEESELECT = firestore.collection(COLLECTION);

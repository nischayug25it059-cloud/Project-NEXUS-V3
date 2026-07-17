import { doc, getDoc, setDoc } from "firebase/firestore";

export async function loadDocument(db, collection, documentId) {

    const ref = doc(db, collection, documentId);

    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
        return snapshot.data();
    }

    return null;
}

export async function saveDocument(db, collection, documentId, data) {

    const ref = doc(db, collection, documentId);

    await setDoc(ref, data);

}
import { collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { searchError, searchLoading, searchSuccess } from "./SearchSlice";

export const searchPosts = (pointA, pointB) => async (dispatch, getState) => {
  try {
    dispatch(searchLoading());

    const postsRef = collection(db, "Posts");
    const query = postsRef
      .where("pointA", "==", pointA)
      .where("pointB", "==", pointB);
    const snapshot = await query.get();

    const searchResults = snapshot.docs.map((doc) => {
      const postData = doc.data();
      return {
        id: doc.id,
        ...postData,
      };
    });

    dispatch(searchSuccess(searchResults));
  } catch (error) {
    dispatch(searchError(error.message));
  }
};

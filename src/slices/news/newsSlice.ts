import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  query,
  getDocs,
  collection,
  orderBy,
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
  Query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from '../../scripts/firebase';

import { TNews, TNewsSliceState } from '../../scripts/types';
import { RootState } from '../../scripts/store';


const defaultNews: TNews = ({
  title: "loading...",
  author: "loading...",
  datetime: {
    date: "loading...",
    time: "loading..."
  },
  description: "Loading...",
  contents: [
    {
      heading: "Loading...",
      paragraphs: ["Loading..."]
    }
  ],
  id: "",
});



const initialState: TNewsSliceState = {
  isLoading: false,
  hasError: false,
  news: [],
}

const emptyNewsFunc = (state: TNewsSliceState) => {
  state.news = [];
}

/**
 * Posts a new news article to the database.
 * 
 * @returns the id of the new news article if successful, null otherwise
*/
export const postNews = createAsyncThunk(
  'news/postNews',
  async (): Promise<void> => {
    // Add a new document with a generated id.
    await addDoc(collection(db, 'news'), {
      title: "New News",
      author: "Admin",
      datetime: {
        date: "2021-05-01",
        time: "12:00:00"
      },
      description: "This is a new news article",
      contents: [
        {
          heading: "Heading 1",
          paragraphs: [
            "Nisi ex eiusmod est labore cillum ipsum ex. Nisi et qui labore veniam quis pariatur. Do cupidatat ad minim aliquip Lorem adipisicing exercitation proident laborum minim anim. Consequat non duis ipsum ipsum laboris excepteur proident sunt commodo anim. Amet fugiat do mollit adipisicing."
          ]
        },
        {
          heading: "Heading 2",
          paragraphs: [
            "Magna ullamco sit aliqua proident cillum culpa occaecat laboris proident ipsum deserunt laborum eiusmod ex. Aliquip dolor enim quis laborum deserunt occaecat ad ea consequat in do dolor aliquip. Cillum deserunt mollit cillum est anim quis proident ex ea. Nulla ut exercitation irure duis Lorem consectetur ad consequat ullamco. Sunt labore mollit et adipisicing sit consequat magna officia. Excepteur occaecat nisi aute consequat consequat qui aliqua magna officia.",
            "Cillum deserunt mollit cillum est anim quis proident ex ea. Nulla ut exercitation irure duis Lorem consectetur ad consequat ullamco. Sunt labore mollit et adipisicing sit consequat magna officia. Excepteur occaecat nisi aute consequat consequat qui aliqua magna officia."
          ]
        },
        {
          heading: "Heading 3",
          paragraphs: [
            "Tempor fugiat consectetur elit eiusmod exercitation do mollit commodo adipisicing tempor. Quis cillum esse id anim excepteur aliquip consequat aute labore id laboris. Exercitation laboris cupidatat pariatur aute irure ea laboris et mollit proident anim nostrud consequat voluptate."
          ]
        }
      ],
      timestamp: serverTimestamp()
    }).then((docRef) => {
      // Get the id of the new document
      console.log("Posted Reading")
    }).catch((error: any) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    });
  }
);

/**
 * Gets the last 12 readings from the database
 * 
 * @returns the readings if successful, null otherwise
 */
export const fetchAllNews = createAsyncThunk(
  'readings/getAllReadings',
  async () : Promise<TNews[] | null | undefined> => {
    const news: TNews[] = [];
    // Get all news
    const newsQuery = query(collection(db, 'news'), orderBy('timestamp', 'desc'));
    await getDocs(newsQuery).then((querySnapshot: any) => {
      querySnapshot.forEach((docSnap: DocumentSnapshot<DocumentData>) => {
        // Add the data from the document to the news array
        const data: DocumentData | undefined = docSnap.data();
        if (data) {
          news.push({
            datetime: data.datetime,
            title: data.title,
            contents: data.contents,
            author: data.author,
            description: data.description,
            id: docSnap.id
          });
        }
      });
      console.log("Got All News")
    }).catch((error: any) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error Code: ${errorCode} Error Message: ${errorMessage}`)
    });
    return news;
  }
);





export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    emptyNews: emptyNewsFunc,
  },
  extraReducers: (builder) => {
    builder
      // ==================== Get All Readings ====================
      .addCase(fetchAllNews.pending, (state: TNewsSliceState) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAllNews.fulfilled, (state: TNewsSliceState, action: PayloadAction<TNews[] | null | undefined>) => {
        state.isLoading = false;
        state.hasError = false;
        if (action.payload) {
          state.news = action.payload;
        }
      })
      .addCase(fetchAllNews.rejected, (state: TNewsSliceState) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // ==================== Post Reading ====================
      .addCase(postNews.pending, (state: TNewsSliceState) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(postNews.fulfilled, (state: TNewsSliceState) => {
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(postNews.rejected, (state: TNewsSliceState) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { emptyNews } = newsSlice.actions;



const getParams = (_: any, args: any) => args

export const selectNews = (state: RootState) => state.news.news;

export const selectNewsById = createSelector(selectNews, getParams, (news: TNews[], { id }: any): TNews => {
  return news.find((article: TNews) => article.id === id) ?? defaultNews;
});

export const selectNewsByIndex = createSelector(selectNews, getParams, (news: TNews[], { index }: any): TNews => {
  
  return news[index] ? news[index] : defaultNews;
});

export default newsSlice.reducer
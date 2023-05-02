import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  query,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  DocumentReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';

import {db} from '../scripts/firebase';

import {TReadingSliceState, TReading} from '../scripts/types';
import {RootState} from '../scripts/store';

const defaultReading: TReading = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  datetime: {
    date: '',
    time: '',
  },
  id: '',
  isSafe: false,
  hasSynced: true,
  measurements: [
    {name: 'turbidity', value: 0},
    {name: 'ph', value: 0},
    {name: 'chloride', value: 0},
    {name: 'nitrate', value: 0},
    {name: 'flouride', value: 0},
    {name: 'conductivity', value: 0},
  ],
};

const initialState: TReadingSliceState = {
  isLoading: false,
  hasError: false,
  readings: [],
  currentReading: null,
};

const emptyReadingsFunc = (state: TReadingSliceState) => {
  state.readings = [];
};

const addReadingToStateFunc = (
  state: TReadingSliceState,
  action: PayloadAction<TReading>,
) => {
  state.readings.push(action.payload);
};

/**
 * Send the reading to the database
 *
 * @param reading - the reading to post
 *
 * @returns the id of the document if successful, null otherwise
 */
export const postReading = createAsyncThunk(
  'readings/postReading',
  async (
    index: number,
    thunkAPI,
  ): Promise<{docName: string; index: number} | null | undefined> => {
    const state: RootState = thunkAPI.getState() as RootState;
    const reading: TReading = state.readings.readings[index];
    // Add a new document to the readings collection.
    await addDoc(collection(db, 'readings'), {
      name: 'getUserName()',
      ...reading,
      timestamp: serverTimestamp(),
    })
      .then((docRef: DocumentReference<DocumentData>) => {
        // Log the id of the document
        console.log('Posted Reading');
        const docName: string = docRef.id;
        return {docName, index};
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error Code: ${errorCode} Error Message: ${errorMessage}`,
        );
        return null;
      });
    return null;
  },
);

/**
 * Send all the unsynced readings to the database
 */
export const postAllReadings = createAsyncThunk(
  'readings/postAllReadings',
  async (
    arg: any,
    thunkAPI,
  ): Promise<{docName: string; index: number}[] | null | undefined> => {
    const state: RootState = thunkAPI.getState() as RootState;
    const readings: TReading[] = state.readings.readings;
    const syncedReadings: {docName: string; index: number}[] = [];

    for (let i: number = 0; i < readings.length; i++) {
      if (!readings[i].hasSynced) {
        // Add a new document to the readings collection.
        await addDoc(collection(db, 'readings'), {
          name: 'getUserName()',
          ...readings[i],
          timestamp: serverTimestamp(),
        })
          .then((docRef: DocumentReference<DocumentData>) => {
            // Log the id of the document
            console.log('Posted Reading');
            syncedReadings.push({docName: docRef.id, index: i});
          })
          .catch((error: any) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(
              `Error Code: ${errorCode} Error Message: ${errorMessage}`,
            );
          });
      }
    }
    return syncedReadings;
  },
);

/**
 * Gets the last 12 readings from the database
 *
 * @returns the readings if successful, null otherwise
 */
export const fetchAllReadings = createAsyncThunk(
  'readings/getAllReadings',
  async (): Promise<TReading[] | null | undefined> => {
    const readings: TReading[] = [];
    // Get all news
    const readingsQuery = query(
      collection(db, 'readings'),
      orderBy('timestamp', 'desc'),
    );
    await getDocs(readingsQuery)
      .then((querySnapshot: any) => {
        querySnapshot.forEach((docSnap: DocumentSnapshot<DocumentData>) => {
          // Add the data from the document to the news array
          const data: DocumentData | undefined = docSnap.data();
          if (data) {
            readings.push({
              location: data.location,
              datetime: data.datetime,
              isSafe: data.isSafe,
              hasSynced: true,
              measurements: data.measurements,
              id: docSnap.id,
            });
          }
        });
        console.log('Got All Readings');
      })
      .catch((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error Code: ${errorCode} Error Message: ${errorMessage}`,
        );
      });
    return readings;
  },
);

export const readingsSlice = createSlice({
  name: 'readings',
  initialState,
  reducers: {
    emptyReadings: emptyReadingsFunc,
    addReadingToState: addReadingToStateFunc,
  },
  extraReducers: builder => {
    builder
      // ==================== Post Reading ====================
      .addCase(postReading.pending, (state: TReadingSliceState) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        postReading.fulfilled,
        (
          state: TReadingSliceState,
          action: PayloadAction<
            {docName: string; index: number} | null | undefined
          >,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          if (action.payload) {
            state.readings[action.payload.index].hasSynced = true;
            state.readings[action.payload.index].id = action.payload.docName;
          }
        },
      )
      .addCase(postReading.rejected, (state: TReadingSliceState) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // ==================== Post All Readings ====================
      .addCase(postAllReadings.pending, (state: TReadingSliceState) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        postAllReadings.fulfilled,
        (
          state: TReadingSliceState,
          action: PayloadAction<
            {docName: string; index: number}[] | null | undefined
          >,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          if (action.payload) {
            action.payload.forEach(
              (reading: {docName: string; index: number}) => {
                state.readings[reading.index].hasSynced = true;
                state.readings[reading.index].id = reading.docName;
              },
            );
          }
        },
      )
      .addCase(postAllReadings.rejected, (state: TReadingSliceState) => {
        state.isLoading = false;
        state.hasError = true;
      })
      // ==================== Get All Readings ====================
      .addCase(fetchAllReadings.pending, (state: TReadingSliceState) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(
        fetchAllReadings.fulfilled,
        (
          state: TReadingSliceState,
          action: PayloadAction<TReading[] | null | undefined>,
        ) => {
          state.isLoading = false;
          state.hasError = false;
          if (action.payload) {
            state.readings = action.payload;
          }
        },
      )
      .addCase(fetchAllReadings.rejected, (state: TReadingSliceState) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {emptyReadings, addReadingToState} = readingsSlice.actions;

const getParams = (_: any, args: any) => args;

export const selectReadings = (state: RootState) => state.readings.readings;

export const selectReadingById = createSelector(
  selectReadings,
  getParams,
  (readings: TReading[], {id}: any): TReading => {
    return (
      readings.find((reading: TReading) => reading.id === id) ?? defaultReading
    );
  },
);

export const selectReadingByIndex = createSelector(
  selectReadings,
  getParams,
  (readings: TReading[], {index}: any): TReading => {
    return readings[index] ? readings[index] : defaultReading;
  },
);

export default readingsSlice.reducer;

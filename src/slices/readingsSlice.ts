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
  syncedReadings: [],
  unsyncedReadings: [],
  currentReading: null,
};

const emptySyncedReadingsFunc = (state: TReadingSliceState) => {
  state.syncedReadings = [];
};

const addReadingToStateFunc = (
  state: TReadingSliceState,
  action: PayloadAction<TReading>,
) => {
  state.unsyncedReadings.push(action.payload);
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
    {rejectWithValue, getState},
  ): Promise<{docName: string; index: number} | null | undefined> => {
    const state: RootState = getState() as RootState;
    const reading: TReading = state.readings.unsyncedReadings[index];
    const uid: string | null = state.account.uid;
    let docName: string = '';

    if (!uid) {
      console.error('User is not logged in');
      rejectWithValue('User is not logged in');
    }
    // Add a new document to the readings collection.
    reading.hasSynced = true;
    await addDoc(collection(db, 'readings'), {
      datetime: reading.datetime,
      hasSynced: true,
      isSafe: reading.isSafe,
      location: reading.location,
      measurements: reading.measurements,
      timeIntervals: reading.timeIntervals,
      timestamp: serverTimestamp(),
      uid: uid,
    })
      .then((docRef: DocumentReference<DocumentData>) => {
        docName = docRef.id;
      })
      .catch((error: any) => {
        // Handle Errors here.
        reading.hasSynced = false;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error Code: ${errorCode} Error Message: ${errorMessage}`,
        );
      });
    return {docName, index};
  },
);

/**
 * Send all the unsynced readings to the database
 */
export const postAllReadings = createAsyncThunk(
  'readings/postAllReadings',
  async (
    arg: any,
    {rejectWithValue, getState},
  ): Promise<{docName: string; index: number}[] | null | undefined> => {
    const state: RootState = getState() as RootState;
    const readings: TReading[] = state.readings.unsyncedReadings;
    const uid: string | null = state.account.uid;
    const syncedReadings: {docName: string; index: number}[] = [];

    if (!uid) {
      console.error('User is not logged in');
      rejectWithValue('User is not logged in');
    }

    for (let i: number = 0; i < readings.length; i++) {
      if (!readings[i].hasSynced) {
        // Add a new document to the readings collection.
        readings[i].hasSynced = true;
        await addDoc(collection(db, 'readings'), {
          datetime: readings[i].datetime,
          hasSynced: true,
          isSafe: readings[i].isSafe,
          location: readings[i].location,
          measurements: readings[i].measurements,
          timeIntervals: readings[i].timeIntervals,
          timestamp: serverTimestamp(),
          uid: uid,
        })
          .then((docRef: DocumentReference<DocumentData>) => {
            syncedReadings.push({docName: docRef.id, index: i});
          })
          .catch((error: any) => {
            // Handle Errors here.
            readings[i].hasSynced = false;
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
  async (
    _,
    {rejectWithValue, getState},
  ): Promise<TReading[] | null | undefined> => {
    const readings: TReading[] = [];
    const state: RootState = getState() as RootState;
    const uid: string | null = state.account.uid;

    if (!uid) {
      console.error('User is not logged in');
      rejectWithValue('User is not logged in');
    }
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
              datetime: data.datetime,
              hasSynced: true,
              id: docSnap.id,
              isSafe: data.isSafe,
              location: data.location,
              measurements: data.measurements,
              timeIntervals: data.timeIntervals,
            });
          }
        });
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
    emptySyncedReadings: emptySyncedReadingsFunc,
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
            const syncedReading: TReading =
              state.unsyncedReadings[action.payload.index];
            state.syncedReadings = [...state.syncedReadings, syncedReading];
            state.unsyncedReadings = state.unsyncedReadings.filter(
              (reading: TReading, index: number) => {
                return index !== action.payload?.index;
              },
            );
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
                state.unsyncedReadings[reading.index].hasSynced = true;
                state.unsyncedReadings[reading.index].id = reading.docName;
              },
            );
            state.syncedReadings = [
              ...state.syncedReadings,
              ...state.unsyncedReadings,
            ];
            state.unsyncedReadings = [];
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
            state.syncedReadings = action.payload;
          }
        },
      )
      .addCase(fetchAllReadings.rejected, (state: TReadingSliceState) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const {emptySyncedReadings, addReadingToState} = readingsSlice.actions;

const getParams = (_: any, args: any) => args;

export const selectSyndedReadings = (state: RootState) =>
  state.readings.syncedReadings;

export const selectUnsyncedReadings = (state: RootState) =>
  state.readings.unsyncedReadings;

export const selectReadings = createSelector(
  selectSyndedReadings,
  selectUnsyncedReadings,
  (syncedReadings: TReading[], unsyncedReadings: TReading[]) => {
    return [...syncedReadings, ...unsyncedReadings];
  },
);

export const selectLastReadingIndex = createSelector(
  selectReadings,
  (readings: TReading[]): number => {
    return readings.length - 1;
  },
);

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

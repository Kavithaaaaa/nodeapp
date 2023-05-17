import { Tanents } from "@/types/tenants";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";

const initialState: Tanents = {
  activeTanents: [],
  archivedTanents: [],
  myStates: [],
  timeZones: [],
};

export const tenantSlice = createSlice({
  name: "activeTanents",
  initialState,
  reducers: {
    getActiveTanents: (state: any, action: PayloadAction<Tanents>) => {
      state.activeTanents = action.payload;
      localStorage.setItem("IntailUser", JSON.stringify(action.payload));
    },
    getArchivedTanents: (state: any, action: PayloadAction<Tanents>) => {
      state.archivedTanents = action.payload;
      localStorage.setItem("ArchivedUser", JSON.stringify(action.payload));
    },
    getMyStats: (state: any, action: PayloadAction<Tanents>) => {
      state.myStates = action.payload;
    },

    getTimeZone: (state: any, action: PayloadAction<Tanents>) => {
      state.timeZones = action.payload;
    },

    addActiveTanents: (state: any, action: PayloadAction<Object>) => {
      state.activeTanents = [...state.activeTanents, action.payload];
    },
    filterActiveTanents: (state: any, action: PayloadAction<string[]>) => {
      var data = localStorage.getItem("IntailUser");
      var data1 = JSON.parse(data ? data : "");
      state.activeTanents = data1;
      var datastte = current(state);
      var d1;
      action.payload.length > 0
        ? (console.log("----tre", action.payload),
          (d1 = datastte.activeTanents.filter((item: any) =>
            action.payload.includes(item.type)
          )))
        : (console.log("----tfff", action.payload), (d1 = data1));

      state.activeTanents = d1;

      // var data  = current(state);

      // var d1=data1.activeTanents[0].data.filter((item:any) => action.payload.includes(item.type));
      state.activeTanents = d1;
    },
    filterArchivedTanents: (state: any, action: PayloadAction<string[]>) => {
      var data = localStorage.getItem("IntailUser");
      var data1 = JSON.parse(data ? data : "");
      state.archivedTanents = data1;
      var datastte = current(state);
      var d1;
      action.payload.length > 0
        ? (console.log("----tre", action.payload),
          (d1 = datastte.archivedTanents.filter((item: any) =>
            action.payload.includes(item.type)
          )))
        : (console.log("----tfff", action.payload), (d1 = data1));

      state.archivedTanents = d1;

      // var data  = current(state);

      // var d1=data1.activeTanents[0].data.filter((item:any) => action.payload.includes(item.type));
      state.archivedTanents = d1;
    },
    deleteActiveTanents: (state: any, action: PayloadAction<string[]>) => {
      var datastte = current(state);state.activeTanents = datastte.activeTanents.filter(
        (item: any) => item._id != action.payload
      );
    },
    deleteArchivedTanents: (state: any, action: PayloadAction<string[]>) => {
      var datastte = current(state);
      state.archivedTanents = datastte.archivedTanents.filter(
        (item: any) => item._id != action.payload
      );
    },
    updateActiveTanents: (state: any, action: PayloadAction<string[]>) => {
      var datastate = current(state).activeTanents;
      state.activeTanents = datastate.map((item: any) =>
        item._id == action.payload._id ? action.payload : item
      );
    },
    updateArchivedTanents: (state: any, action: PayloadAction<string[]>) => {
      var datastate = current(state).archivedTanents;
      state.archivedTanents = datastate.map((item: any) =>
        item._id == action.payload._id ? action.payload : item
      );
    },
    addArchivedTanents: (state: any, action: PayloadAction<string[]>) => {
      var datastate = current(state).archivedTanents;
      state.archivedTanents = [...state.archivedTanents, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addActiveTanents,
  getActiveTanents,
  getTimeZone,
  getMyStats,
  filterActiveTanents,
  filterArchivedTanents,
  deleteActiveTanents,
  deleteArchivedTanents,
  updateActiveTanents,
  updateArchivedTanents,
  getArchivedTanents,
  addArchivedTanents,
} = tenantSlice.actions;

export default tenantSlice.reducer;

// var data  = current(state);

// var d1=data.activeTanents[0].data.filter((item:any) => ['abc'].includes(item.name));
//  state.activeTanents[0]={statusCode: 200,data:d1}

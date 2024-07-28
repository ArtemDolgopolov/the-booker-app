import { createSlice } from "@reduxjs/toolkit"

export interface searchFormData {
 cityname: string,
   dates: {
    from: undefined,
    to: undefined
   },
   num_of_adults: string,
   num_of_children: string,
   rooms: string
}

const initialState: searchFormData = {
 cityname: '',
   dates: {
    from: undefined,
    to: undefined
   },
   num_of_adults: '1',
   num_of_children: '0',
   rooms: '1'
}

const searchFormSlice = createSlice({
 name: 'searchForm',
 initialState,
 reducers: {
  setCityName: (state, action) => {
   state.cityname = action.payload
  },
  setCheckInDate: (state, action) => {
   state.dates.from = action.payload
  },
  setCheckOutDate: (state, action) => {
   state.dates.to = action.payload
  },
  setNumOfAdults: (state, action) => {
   state.num_of_adults = action.payload
  },
  setNumOfChildren: (state, action) => {
   state.num_of_children = action.payload
  },
  setRooms: (state, action) => {
   state.rooms = action.payload
  },
 }
})

export const {
 setCityName,
 setCheckInDate,
 setCheckOutDate,
 setNumOfAdults,
 setNumOfChildren,
 setRooms
} = searchFormSlice.actions

export default searchFormSlice.reducer
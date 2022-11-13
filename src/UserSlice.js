import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
  name: 'user',
  initialState : {name: "Kim", age: 20},
  reducers: {
    changeName(state){
      state.name = "Lee";
    },
    increase(state, a){
      state.age += a.payload;
    }
  }
})

export let {changeName, increase} = user.actions

export default user;

import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store"
import { HYDRATE } from "next-redux-wrapper";

import { saveState } from "./localStorage";
import { loadState } from "./localStorage";
import { clearState } from "./localStorage";
 

// Initial state
const initialState = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    contact_no: '',
    company: '',
};

// Actual Slice
export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {

        // Action to set the Customerentication 
        setCustomerState(state, action) {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.contact_no = action.payload.contact_no;
            state.company = action.payload.company;

            console.log( "state.firstname-------------------------------------")
            console.log( state.firstname)

            console.log( "state.lastname-------------------------------------")
            console.log( state.lastname)
            console.log( "state.contact_no-------------------------------------")
            console.log( state.contact_no)


           

        },

        removeCustomerState(state) {

            state.firstname = "";
            state.email = "";

            clearState('accessfirstname')
            clearState('logged_in_email')
        },

        selectCustomerState() {

        }




        // Special reducer for hydrating the state. Special case for next-redux-wrapper
        //   extraReducers: {
        //     [HYDRATE]: (state, action) => {
        //       return {
        //         ...state,
        //         ...action.payload.Customer,
        //       };
        //     },
        //   },

    },
});




const { setCustomerState } = customerSlice.actions;
const { removeCustomerState } = customerSlice.actions;

 const selectCustomerState = (state) => state.customer;

module.exports = {
    customerSlice,
    setCustomerState,
    removeCustomerState,
    selectCustomerState
};


/**
 * Este archivo representa la definición del estado.
 */

import { useReducer } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";
import UserContext from "./UserContext";

const UserState = (props) => {
    //Definimos el estado inicial
    const initialState = {
        users: [],
        selectedUser: null
    };

    //Definimos un userReducer para manejar el estado.
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUsers = async () => {
        const res = await axios.get('https://reqres.in/api/users');
        // console.log(res.data.data);
        dispatch({
            type: 'GET_USERS',
            payload: res.data.data
        })
    }

    const getProfile = async (id) => {
        const res = await axios.get('https://reqres.in/api/users/'+id);
        // console.log(res.data.data);
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data.data
        })
    }

    return (
        /**
         * Todos los componentes dentro de UserContext van a poder acceder al state
         */
        <UserContext.Provider 
        value={{
            users: state.users,
            selectedUser: state.selectedUser,
            getUsers,
            getProfile
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;

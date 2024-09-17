import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const initialState = {
    moviesArr: [],      //Movies Array
    favsArr: [],        //Favourites Array
}

export const MoviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        //Add movie to favourites array if not there
        AddFav: (state, movie) => {
            if (state.favsArr.find((m) => m.id == movie.payload.id)) {
                Alert.alert('Error!', 'Already in favourites!', [{ text: 'OK' }])
            }
            else {
                state.favsArr.push(movie.payload);
                Alert.alert('Success!', 'Added to favourites!', [{ text: 'OK' }])
            }
        },
        //Remove movie from favourites array
        RemoveFav: (state, id) => {
            state.favsArr = state.favsArr.filter((m) => m.id != id.payload);
        },
        //Add an external array of movies to the movies array
        AddMovies: (state, movieArr) => {
            movieArr.payload.map(m => state.moviesArr.push(m))
        },
        //Clear the favourites array
        clearAllFavs: (state) => {
            state.favsArr = []
        },
    },
})

export const { AddFav, RemoveFav, AddMovies, clearAllFavs } = MoviesSlice.actions
export default MoviesSlice.reducer
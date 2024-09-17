import { View, StyleSheet, TextInput, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { AddMovies } from '../Redux_ToolKit/movieSlice';
import CardComp from '../Components/CardComp';

const apiKey = "&api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const url = "https://api.themoviedb.org/3";
const path = "/discover/movie?sort_by=popularity.desc";
const apiUrl = url + path + apiKey;


export default function Home() {

    const moviesSelect = useSelector(state => state.movies)
    const dispatch = useDispatch()
    const [filtered, setFiltered] = useState([])    //Filtered array for the search

    //Get movies from the API and add them to the movies array
    useEffect(() => {
        if (moviesSelect.moviesArr.length == 0)
            axios.get(apiUrl).then(res => dispatch(AddMovies(res.data.results)))
    }, [])
    //Copy the movies array to the favourites array after the API call is completed
    useEffect(() => { setFiltered(moviesSelect.moviesArr) }, [moviesSelect.moviesArr])
    //Update filtered array with the search's value
    const updateArray = (val) => {
        setFiltered(moviesSelect.moviesArr.filter((m) => m.title.toLowerCase().includes(val.toLowerCase())))
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Search for a movie...'
                onEndEditing={({nativeEvent}) => updateArray(nativeEvent.text)}
                style={styles.search}
                returnKeyType='search'
            />    
            <FlatList
                data={filtered}
                keyExtractor={data => data.id}
                ListEmptyComponent={
                    <View style={styles.error}>
                        <AntDesign name="exclamationcircleo" size={60} color="white" style={{ marginBottom: 30 }} />
                        <Text style={{ color: "white", fontSize: 20 }}>No Movies Found!</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <CardComp item={item}></CardComp>
                )}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    search: {
        color: "black",
        fontSize: 12,
        margin: 13,
        marginBottom: 5,
        borderRadius: 16,
        backgroundColor: "white",
        paddingHorizontal: 7,
        paddingVertical: 5,
        alignSelf: "stretch"
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250
    }
})
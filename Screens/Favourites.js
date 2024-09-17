import { View, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllFavs } from '../Redux_ToolKit/movieSlice';
import FavsComp from '../Components/FavsComp';
import { readAllFB, removeAllFB } from '../Firebase/Firebase';

export default function Favourites() {

    // Read data using redux toolkit
        const moviesSelect = useSelector(state => state.movies)
        const dispatch = useDispatch()
        const data = moviesSelect.favsArr

    // Read data using firestore
        // const [data, setData] = useState();
        // readAllFB().then((arr) => setData(arr))

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={data => data.id}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <AntDesign name="exclamationcircleo" size={60} color="white" style={{ marginBottom: 30 }} />
                        <Text style={{ color: "white", fontSize: 20 }}>No Movies Found!</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <FavsComp item={item}></FavsComp>
                )}>
            </FlatList>
            <TouchableOpacity onPress={() => {
                //Clear all using redux toolkit
                    dispatch(clearAllFavs())
                //Clear all using firestore
                    // removeAllFB()
            }} style={styles.trash}>
                <FontAwesome6 name="trash-can" size={20} color="white" marginTop={4} marginHorizontal={4} />
                <Text style={[styles.text, { marginHorizontal: 5 }]}>Remove All</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250
    },
    text: {
        color: "white",
        textAlign: "left",
        marginVertical: 5
    },
    trash: {
        borderColor: "red",
        borderWidth: 2,
        borderRadius: 15,
        alignSelf: "center",
        flexDirection: "row",
        padding: 10,
        marginVertical: 20,
    }
})
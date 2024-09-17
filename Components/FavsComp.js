import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { AirbnbRating, Divider } from '@rneui/themed';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { RemoveFav } from '../Redux_ToolKit/movieSlice';
import { useDispatch } from 'react-redux';
import { removeFB } from "../Firebase/Firebase"

const imgPath = "https://image.tmdb.org/t/p/w500/";

FavsComp = ({ item }) => {

const dispatch = useDispatch()

    return (
        <View style={styles.card} >
            <Image source={{ uri: imgPath.concat(item.backdrop_path) }} style={styles.image} />
            <Divider orientation="vertical" width={2} style={{ marginHorizontal: 12 }} />
            <View flexDirection="column" style={{ marginRight: 160 }}>
                <Text style={[styles.text, { fontSize: 23 }]}>{item.title}</Text>
                <Text style={[styles.text, { fontSize: 15 }]}>{item.release_date}</Text>
                <AirbnbRating
                    isDisabled={true}
                    size={15}
                    showRating={false}
                    defaultRating={Math.round(item.vote_average / 2)}
                    starContainerStyle={{ alignSelf: "flex-start", marginVertical: 6 }}
                />
                <TouchableOpacity style={styles.remove} onPress={() => {
                    //Remove data using redux toolkit
                        dispatch(RemoveFav(item.id))
                    //Remove data using firestore
                        // removeFB(item.id)
                }}>
                    <FontAwesome6
                        name="heart-circle-minus"
                        size={17}
                        color="red"
                        style={{ marginTop: 6, marginHorizontal: 10 }}
                    />
                    <Text style={styles.text}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(FavsComp)

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#212121",
        borderRadius: 20,
        borderWidth: 0,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: "row"
    },
    image: {
        width: "45%",
        minHeight: 150,
        minWidth: 110,
        height: "100%",
        borderRadius: 12,
    },
    remove: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "red",
        borderWidth: 1,
        alignSelf: "flex-start",
        borderRadius: 10,
        paddingTop: 2,
        paddingRight: 10,
        marginTop: 5,
    },
    text: {
        color: "white",
        textAlign: "left",
        marginVertical: 5
    },
})
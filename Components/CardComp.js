import { View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { AirbnbRating, Card } from '@rneui/themed'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useDispatch } from 'react-redux';
import { AddFav } from '../Redux_ToolKit/movieSlice';
import { writeFB } from "../Firebase/Firebase"

const imgPath = "https://image.tmdb.org/t/p/w500/";

const CardComp = ({ item }) => {

const dispatch = useDispatch()

    return (
        <Card containerStyle={styles.card} >
            <Card.Image source={{ uri: imgPath.concat(item.backdrop_path) }} style={styles.image} />
            <Card.Divider width={2} />
            <View style={styles.icon}>
                <Card.FeaturedTitle>{item.title}</Card.FeaturedTitle>
                <TouchableOpacity
                    onPress={() => {
                        //Add data using redux toolkit
                            dispatch(AddFav(item));
                        //Add data using firestore
                            // writeFB(item);
                    }}>
                    <FontAwesome6 name="heart-circle-plus" size={24} color="red" />
                </TouchableOpacity>
            </View>
            <Card.FeaturedSubtitle>Release Date: {item.release_date}</Card.FeaturedSubtitle>
            <Card.FeaturedSubtitle>
                <AirbnbRating
                    isDisabled={true}
                    size={20}
                    showRating={false}
                    defaultRating={Math.round(item.vote_average / 2)}
                />
            </Card.FeaturedSubtitle>
        </Card>
    )
}

export default memo(CardComp)


const styles = StyleSheet.create({
    card: {
        backgroundColor: "#212121",
        borderRadius: 20,
        borderWidth: 0
    },
    image: {
        width: "100%",
        borderRadius: 12,
        height: 180,
        marginBottom: 10,
        alignSelf: "center"
    },
    icon: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between"
    },
})
import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Book = ({ onPress, title, price, discountRate, coverImageUrl }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.container}
            onPress={onPress}
        >
            <Image
                style={styles.coverImage}
                source={{ uri: coverImageUrl }}
                loadingIndicatorSource={require('../../assets/placeholder.png')}
            />
            <View style={styles.textContent}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.discountRate}>{discountRate}%</Text>
                    <Text style={styles.price}>{price.toLocaleString()}원</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Book

const styles = StyleSheet.create({
    container: {
        gap: 4,
        width: 180 + ((Dimensions.get('window').width % 180) / parseInt(Dimensions.get('window').width / 180)),
        // flexGrow: 1
    },
    coverImage: {
        height: 200,
        width: "100%",
        resizeMode: 'cover'
    },
    textContent: {
        gap: 10,
        padding: 10,
        width: '100%'
    },
    title: {
        fontWeight: 'bold'
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    discountRate: {
        color: 'red',
        fontWeight: 700
    },
    price: {
        fontWeight: 'bold'
    }
})
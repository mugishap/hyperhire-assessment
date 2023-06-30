import { Dimensions, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Book = ({onPress}) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.8} 
        style={styles.container}
        onPress={onPress}
        >
            <Image
                style={styles.thumbnail}
                source={require('../../assets/placeholder.png')}
            />
            <View style={styles.textContent}>
                <Text>레이블라우스</Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.discount}>10%</Text>
                    <Text>57,600원</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Book

const styles = StyleSheet.create({
    container: {
        gap: 4,
        width: Dimensions.get('window').width /2 - 1,
    },
    thumbnail: {
        height: 200,
        width: "100%",
        resizeMode: 'cover'
    },
    textContent: {
        gap: 10,
        padding: 10,
        width: '100%'
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    discount: {
        color: 'red',
        fontWeight: 700
    }
})
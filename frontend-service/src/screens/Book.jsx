import { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import Review from '../components/Review';

const bookDetails = {
    thumbnail_url: 'https://picsum.photos/400',
    title: 'Book Title',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    discount: 0.1,
    price: 56700,
    reviews: [
        {
            _id: 'reviewId1',
            user: {
                _id: 'userId1',
                name: 'User1',
                profile: 'https://picsum.photos/100'
            },
            content: '어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭 우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도 이하도 아니잖아요?! 그런 제가 기꺼이 도전해봤는데 생각보다 괜찮았어요! 오늘 중으로 라이브 리뷰 올라온다고 하니 꼭 봐주세용~!',
            likes: 5,
            replies: [
                {
                    _id: 'replyId1',
                    user: {
                        _id: 'userId1',
                        name: 'User1',
                        profile: 'https://picsum.photos/100'
                    },
                    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    likes: 5,
                }
            ]
        }
    ]
}

const Book = ({ navigation, route }) => {
    const { title, _id } = route.params;

    useEffect(() => {
        navigation.setOptions({
            title: title
        })
        console.log(Dimensions.get('window').width)
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Image
                // source={{
                //     uri: bookDetails.thumbnail_url
                // }}
                source={require('../../assets/placeholder.png')}
                loadingIndicatorSource={require('../../assets/placeholder.png')}
                style={styles.thumbnail}
                alt={bookDetails.title + ' image'}
            />
            <View style={styles.bookDetails}>
                <Text style={styles.title}>{bookDetails.title}</Text>
                <Text style={styles.description}>{bookDetails.description}</Text>
                <View style={styles.priceBar}>
                    <Text style={styles.discount}>{bookDetails.discount * 100}%</Text>
                    <Text style={styles.price}>{bookDetails.price.toLocaleString()}로</Text>
                </View>
            </View>
            <View style={styles.reviews}>
                {
                    bookDetails.reviews.map((review, id) => {
                        return (
                            <Review
                                key={`review-${id}`}
                                {...review}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}

export default Book

const styles = StyleSheet.create({
    container: {
    },
    thumbnail: {
        resizeMode: 'cover',
        width: Dimensions.get('window').width < 375 ? '100%' : 375,
        height: 400,
    },
    bookDetails: {
        marginTop: 10,
        padding: 10,
        gap: 6,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    description: {},
    priceBar: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        fontWeight: 'bold',
    },
    discount: {
        fontWeight: 'bold',
        color: 'red'
    },
    reviews: {
        padding: 10
    }
})
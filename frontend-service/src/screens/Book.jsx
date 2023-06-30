import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import Review from '../components/Review';
import { axios } from '../utils/axios.config';
import { Button, IconButton, TextInput } from 'react-native-paper';

const bookDetails = {
    coverImageUrl: 'https://picsum.photos/400',
    title: 'Book Title',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    discountRate: 0.1,
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
    const { _id, title, price, discountRate, description, coverImageUrl, } = route.params;
    const [reviews, setReviews] = useState([])
    const [isLoadingReviews, setIsLoadingReviews] = useState(true)

    const fetchReviews = async () => {
        try {
            console.log("fetching reviews", `/get-reviews/${_id}`)
            const { data } = await axios.get(`/get-reviews/${_id}`)
            console.log(JSON.stringify(data, null, 2))
            if (data.success) setReviews(data.data.reviews)
        } catch (e) {
            console.log("ERROR: ", e.message)
        } finally {
            setIsLoadingReviews(false)
        }
    }

    useEffect(() => {
        navigation.setOptions({
            title: title.length > 25 ? title.slice(0, 25) + '...' : title
        })
        console.log(Dimensions.get('window').width)
        fetchReviews()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.bookDetailSection}>
                <Image
                    // source={{
                    //     uri: bookDetails.coverImage_url
                    // }}
                    source={{ uri: coverImageUrl }}
                    // source={require('../../assets/placeholder.png')}
                    loadingIndicatorSource={require('../../assets/placeholder.png')}
                    style={styles.coverImage}
                    alt={title + ' image'}
                />
                <View style={styles.bookDetails}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.priceBar}>
                        <Text style={styles.discountRate}>{discountRate}%</Text>
                        <Text style={styles.price}>{price.toLocaleString()}로</Text>
                    </View>
                </View>
            </View>
            <View style={styles.reviewSection}>
                <View style={styles.reviews}>
                    {
                        isLoadingReviews && <Text style={styles.notifyText}>Loading Reviews...</Text>
                    }
                    {
                        !isLoadingReviews && reviews.length === 0 && <Text style={styles.notifyText}>No Reviews</Text>
                    }
                    {
                        reviews.map((review, id) => {
                            return (
                                <Review
                                    key={`review-${id}`}
                                    {...{
                                        content: review.reviewMessage,
                                        ...bookDetails.reviews[0],
                                    }}
                                />
                            )
                        })
                    }
                </View>
                <View style={styles.addReviewContainer}>
                    <IconButton
                        icon={'image'}
                        size={20}
                        iconColor='#919EB6'
                        onPress={() => { }}
                    />
                    <TextInput
                        placeholder='댓글을 남겨주세요.'
                        placeholderTextColor={'#AFB9CA'}
                        style={styles.addReviewTextField}
                        underlineColor='transparent'
                        activeUnderlineColor='transparent'
                        height={20}
                    />
                    <Button onPress={() => { }}>
                        등록
                    </Button>
                </View>
            </View>
        </ScrollView>
    )
}

export default Book

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: Dimensions.get('window').width < 375*2 ? 'column' : 'row',
    },
    bookDetailSection: {
        maxWidth: 375,
        width: '100%',
    },
    bookDetails: {
        marginTop: 10,
        padding: 10,
        gap: 6,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        width: '100%'
    },
    reviewSection: {
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
    },
    coverImage: {
        resizeMode: 'cover',
        width: Dimensions.get('window').width < 375 ? '100%' : 375,
        height: 400,
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
    discountRate: {
        fontWeight: 'bold',
        color: 'red'
    },
    reviews: {
        padding: 10
    },
    notifyText: {
        textAlign: 'center',
        color: '#c4c4c4'
    },
    addReviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 30,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
    },
    addReviewTextField: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
    }
})
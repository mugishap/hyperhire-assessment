import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const hardcodedReplies = [
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

const hardcodedUser = {
    _id: 'userId1',
    name: 'User1',
    profile: 'https://picsum.photos/100'
}


const Review = (props) => {
    const { isReply = false, user, content, likes = 0, replies = [] } = props || {}
    const [isLiked, setIsLiked] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userDetails}>
                    <Image
                        source={{ uri: user.profile }}
                        style={styles.profile}
                    />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Icon
                        name="checkbox-marked-circle"
                        color={"#01B99F"}
                        size={20}

                    />
                    <Text style={styles.unknown1}>1일전</Text>
                </View>
                <IconButton
                    icon="dots-horizontal"
                    iconColor={"#AFB9CA"}
                    size={20}
                    onPress={() => console.log('review option')}
                />
            </View>
            <View style={styles.otherContent}>
                <Text style={styles.content}>
                    {content}
                </Text>
                <View style={styles.buttons}>
                    <Button
                        icon={!isLiked ? "cards-heart-outline" : "cards-heart"} textColor='#AFB9CA'
                        onPress={() => { setIsLiked(!isLiked) }}
                    >
                        {Number(likes) + (isLiked ? 1 : 0)}
                    </Button>
                    {
                        !isReply && <Button
                            icon={require('../../assets/comment_icon.png')} textColor='#AFB9CA'
                            onPress={() => { }}
                        >
                            {replies.length}
                        </Button>
                    }
                </View>
                <View>
                    {
                        replies.map((reply, id) => {
                            return (
                                <Review
                                    key={`review-reply-${id}`}
                                    {...reply}
                                    isReply={true}
                                />
                            )
                        })
                    }
                </View>
            </View>

        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    container: {
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 8,
    },
    profile: {
        width: 35,
        height: 35,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    textContent: {
        gap: 10
    },
    unknown1: {
        fontWeight: 'bold',
        color: '#919EB6'
    },
    otherContent: {
        paddingLeft: 45,
    },
    content: {
    },
    buttons: {
        flexDirection: 'row'
    }
})
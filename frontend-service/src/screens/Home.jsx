import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import Book from '../components/Book'
import { useEffect, useState } from 'react'

const bookData = [
    {
        _id: 'bookId1',
        title: '레이블라우스',
    },
    {
        _id: 'bookId2',
        title: '레이블라우스',
    },
    {
        _id: 'bookId3',
        title: '레이블라우스',
    },
]

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadMore = () => {
        setIsLoading(true)
        setTimeout(() => {
            fetchBooks()
            setIsLoading(false)
        }, 1000)
    }

    const fetchBooks = (params) => {
        setIsLoading(true)
        console.log(isRefreshing ? 'refreshing' : 'not refreshing')
        setTimeout(() => {
            setBooks(isRefreshing ? bookData : [...books, ...bookData])
            setIsLoading(false)
            setIsRefreshing(false)
        }, 1000)
    }

    const renderItem = ({ item }) => {
        return (
            <Book
                onPress={() => navigation.navigate('book', { bookId: item._id, title: item.title })}
                title={item.title}
            />
        )
    }

    const handleOnRefresh = () => {
        setIsRefreshing(true)
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    useEffect(() => {
        if (isRefreshing) fetchBooks()
    }, [isRefreshing])

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={handleOnRefresh}
                refreshing={isRefreshing}
                data={books}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                numColumns={2}
                contentContainerStyle={{ gap: 1 }}
                columnWrapperStyle={{ gap: 1 }}
                // onEndReached={fetchBooks.bind(null, {more: true, page: currentPage+1})}
                // onEndReachedThreshold={0.2}
                ListFooterComponent={
                    isLoading ? <Text>로딩...</Text> : null
                }
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
        // rowGap: 2
    }
})
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import Book from '../components/Book'
import { useEffect, useState } from 'react'
import { axios } from '../utils/axios.config'

const numOfColumns = parseInt(Dimensions.get('window').width / 180)

const Home = ({ navigation }) => {
    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchBooks = async (params = {}) => {
        setIsLoading(true)
        try {
            console.log(isRefreshing ? 'refreshing' : 'not refreshing')

            const { data } = await axios.get(`/all?page=${currentPage}&limit=5`)
            if (data.success) {
                setBooks(isRefreshing ? data.data.books : [...books, ...data.data.books])
                setCurrentPage(isRefreshing ? 1 : currentPage + 1)

            }
        } catch (e) {
            console.log("ERROR: ", e.message)
        } finally {
            setIsLoading(false)
            setIsRefreshing(false)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <Book
                onPress={
                    () => navigation.navigate(
                        'book',
                        {
                            ...item
                        }
                    )
                }
                {...item}
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
                numColumns={numOfColumns}
                contentContainerStyle={{ gap: 1 }}
                columnWrapperStyle={{ gap: 1 }}
                onEndReached={fetchBooks}
                onEndReachedThreshold={0.2}
                ListFooterComponent={
                    isLoading ? <Text>로딩...</Text> : books.length === 0 ? <Text style={{ textAlign: 'center', color: '#c4c4c4' }}>No Books</Text> : null
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
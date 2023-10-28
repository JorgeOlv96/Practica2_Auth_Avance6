import { View, Text, SafeAreaView, FlatList, ImageBackground, ActivityIndicator } from 'react-native'
import React from 'react'
import Card from '../components/Card/Card';
import { styles } from '../styles/HomeScreen.styles'


export default function HomeScreen(props) {
  const { title, characters, loadMoreData, nextUrl } = props;

  
  const loadMore = () => {
    if (nextUrl) {
      loadMoreData()
    }
  }


  return (
    <ImageBackground source={require('../assets/img/fondo.jpg')} resizeMode="cover" style={styles.fondo}>
    <SafeAreaView>
    <Text style={styles.title}>
        {title}
    </Text>

      <FlatList
        data={characters}
        style={{marginBottom: 90}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(characters) => String(characters.id)}
        renderItem={({ item }) =>  <Card character={item} /> }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          nextUrl && <ActivityIndicator style={styles.spiner} size="large" color="#79B543" />}
      />
    </SafeAreaView>
    </ImageBackground>
  )
}
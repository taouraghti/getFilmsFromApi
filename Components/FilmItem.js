// Components/FilmItem.js

import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'

class FilmItem extends React.Component {

  render() {
    const film = this.props.film;
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri:getImageFromApi(film.poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.heider_container}>
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image:{
    height:180,
    width:120,
    margin: 5,
  },
  content_container:{
    margin: 5,
    flex:1
  },
  heider_container:{
    flex:3,
    flexDirection: 'row'
  },
  title_text:{
    fontWeight: 'bold',
    fontSize: 20,
    flex:3,
    paddingRight: 5
  },
  vote_text:{
    flex:1,
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }

})

export default FilmItem
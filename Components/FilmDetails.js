// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator,Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {getFilmDetailFromApi} from '../API/TMDBApi'
import {getImageFromApi} from '../API/TMDBApi'


class FilmDetails extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            film: undefined,
            isLoading:true
        }
    }

    componentDidMount()
    {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayFilm()
    {
        const film = this.state.film
        if(film != undefined)
        {
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style={styles.title_text}>{film.title}</Text>
                    <Text style={styles.description_text}>{film.overview}</Text>
                    <Text style={styles.default_text}>Sorti le {film.release_date}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {film.budget}$</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                        return genre.name;
                        }).join(" / ")}
                    </Text>
                    <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
                        return company.name;
                        }).join(" / ")}
                    </Text>
                </ScrollView>
            )
        }
    }
    _displayLoading(){
        if(this.state.isLoading)
        {
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }


  render() {
      const idFilm = this.props.navigation.state.params.idFilm
    return (
      <View style={styles.main_container}>
        {this._displayFilm()}
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      justifyContent:'center',
      alignItems: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 200,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})

export default FilmDetails
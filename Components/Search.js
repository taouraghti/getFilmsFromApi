import React from 'react';
import {Button, View, TextInput,FlatList, StyleSheet, Text} from 'react-native';
import films from '../Helpers/FilmsData';
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
class Search extends React.Component{
    
    constructor(props)
    {
        super(props)
        this.state = {
            films: []
        }
        this.searchedText = ""
    }
    _searchText(text){
        this.searchedText = text
    }
    _loadFilms(){
        if(this.searchedText.length > 0)
            getFilmsFromApiWithSearchedText(this.searchedText).then(data =>this.setState({films: data.results}))
      }
    render(){
        return(
            <View style={styles.main_container}>
                <TextInput onChangeText={(text) => this._searchText(text)} placeholder="Titre de film" style={styles.TextInput}/>
                <Button title="Rechercher" style={{height:50}} onPress={ () => this._loadFilms() }/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        marginTop: 30,
        flex:1
    },
    TextInput:{
        marginLeft: 5,
        marginRight: 5,
        height:50,
        borderColor:'#000',
        borderWidth:1,
        padding: 5
    }
})
export default Search;
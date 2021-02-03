import React from 'react';
import {Button, View, TextInput,FlatList, StyleSheet, Text, ActivityIndicator} from 'react-native';
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'
class Search extends React.Component{
    
    constructor(props)
    {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ""
    }
    _searchText(text){
        this.searchedText = text
    }
    _loadFilms(){
        this.setState({isLoading:true})
        if(this.searchedText.length > 0)
            getFilmsFromApiWithSearchedText(this.searchedText).then(data =>
                this.setState({
                    films: data.results,
                    isLoading:false
                }))
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

    render(){
        return(
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._loadFilms()} onChangeText={(text) => this._searchText(text)} placeholder="Titre de film" style={styles.TextInput}/>
                <Button title="Rechercher" style={{height:50}} onPress={ () => this._loadFilms() }/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item}/>}
                />
                {this._displayLoading()}
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
    },
    loading_container:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        justifyContent:'center',
        alignItems: 'center'

    }
})
export default Search;
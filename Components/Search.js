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
        this.searchedText = "",
        this.page = 0,
        this.totalPage = 0
    }
    _searchText(text){
        this.searchedText = text
    }

    _searchFilms()
    {
        this.page = 0
        this.totalPage = 0
        this.setState({
            films:[]
        },() => this._loadFilms())
        
    }
    _loadFilms(){
        this.setState({isLoading:true})
        if(this.searchedText.length > 0)
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data =>
                {
                    this.page = data.page,
                    this.totalPage = data.total_pages,
                    this.setState({
                        films: this.state.films.concat(data.results),
                        isLoading:false
                    })  
                }
                )
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

    _displayDetailsForFilm = (idFilm) => {
        this.props.navigation.navigate('FilmDetails',{idFilm: idFilm});    
    }

    render(){
        return(
            <View style={styles.main_container}>
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchText(text)} placeholder="Titre de film" style={styles.TextInput}/>
                <Button title="Rechercher" style={{height:50}} onPress={ () => this._searchFilms() }/>
                <FlatList
                    data={this.state.films}
                    onEndReachedThreshold={0.5}
                    onEndReached={()=>{
                        if(this.page < this.totalPage)
                            this._loadFilms();
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailsForFilm={this._displayDetailsForFilm}/>}
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
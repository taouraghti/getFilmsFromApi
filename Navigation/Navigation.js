import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import FilmDetails from '../Components/FilmDetails'
import Search from '../Components/Search'

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetails:{
        screen: FilmDetails
    }
})

export default createAppContainer(SearchStackNavigator)
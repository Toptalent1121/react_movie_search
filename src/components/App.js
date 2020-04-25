import React, {useReducer, useEffect} from 'react';

import '../App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

const initialState = {
    loading: true,
    moveis: [],
    errMsg: null
};

const reducer = (state, action) => {
    switch(action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                loading: true,
                errMsg: null
            }
        case "SEARCH_MOVIES_SUCCESS": 
            return {
                ...state,
                loading: false,
                movies: action.payload
            }
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errMsg: action.error
            }
        default:
            return state;
    }
};

const App = () => {
    // const [loading, setLoading] = useState(true);
    // const [movies, setMovies] = useState([]);
    // const [errMsg, setErrMsg] = useState(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
                // setMovies(jsonResponse.Search);
                // setLoading(false);
                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                })
            });
    }, []);

    const search = searchValue => {
        // setLoading(true);
        // setErrMsg(null);
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
            .then(response => response.json())
            .then(jsonResponse => {
                if(jsonResponse.Response === "True") {
                    // setMovies(jsonResponse.Search);
                    // setLoading(false);
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    })
                } else {
                    // setErrMsg(jsonResponse.Error);
                    // setLoading(false);
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        error: jsonResponse.Error
                    })
                }
            });
    };

    const {movies, errMsg, loading} = state;

    return (
        <div className="App">
            <Header text="Hooked" />
            <Search search = {search} />
            <p className="App-intro">Sharing a few of our favorite movies</p>
            <div className="movies">
                {loading && !errMsg ? (<span>Loading...</span>) : errMsg ? (<div className="errorMessage">{errMsg}</div>) : (
                    movies.map((movie, index) => 
                        <Movie key = {`${index}-${movie.Title}`} movie = {movie}/>
                    )
                )}
            </div>
        </div>
    )
}

export default App;

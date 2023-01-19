import './charList.scss';
import MarverService from '../../services/MarverService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { Component } from 'react/cjs/react.production.min';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marverService = new MarverService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharLoading();
        this.marverService.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }



    renderItems(arr) {

        const items = arr.map(item => {
            const thumbnailUpdate = () => {
                if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    return (<img src={item.thumbnail} alt="abyss" style={{objectFit: 'unset'}}/>)
                } else {
                    return (<img src={item.thumbnail} alt="abyss"/>)
                }
            }
    
            return (
                <li className="char__item" 
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    {thumbnailUpdate()}
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}>

                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;
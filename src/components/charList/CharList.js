import './charList.scss';
import MarverService from '../../services/MarverService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { Component } from 'react/cjs/react.production.min';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marverService = new MarverService();

    componentDidMount() {
        this.marverService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }


    render() {
        const {charList, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <RenderItems charList={charList}/> : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const RenderItems = ({charList}) => {

    const items = charList.map(item => {
        const thumbnailUpdate = () => {
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                return (<img src={item.thumbnail} alt="abyss" style={{objectFit: 'contain'}}/>)
            } else {
                return (<img src={item.thumbnail} alt="abyss"/>)
            }
        }

        return (
            <li className="char__item" key={item.id}>
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

export default CharList;
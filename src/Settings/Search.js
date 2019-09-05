import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from '../Shared/Styles';
import {AppContext} from '../App/AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 150px 150px;
    @media (max-width: 400px) {
        grid-template-columns: 150px;
    }
`

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    border-radius: 50px;
    height: 25px;
    color: #1163c9;
    place-self: center left;
`

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    // Get all coins' symbols
    let coinSymbols = Object.keys(coinList);

    //Get all coins' names and map symbol to name
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName);

    // we need to match both the coin symbols and the coin names: 'Bitcoin' result comes up either typing 'Bitcoin' or 'BTC'
    let allStringsToSearch = coinSymbols.concat(coinNames);

    // use 'fuzzy' algorithm to do the search, which matches keywords likely to be relevant to the input value
    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(result => result.string);
    
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
    });
    console.log(filteredCoins);
    setFilteredCoins(filteredCoins);
}, 500);

function filteredCoins(e, setFilteredCoins, coinList){
    let inputValue = e.target.value;
    if(!inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
}

export default function(){
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) => 
                <SearchGrid> 
                    <h2> Search Coin </h2>
                    <SearchInput onKeyUp={(e) => filteredCoins(e, setFilteredCoins, coinList)}/>
                </SearchGrid>
            }
        </AppContext.Consumer>
    )
}
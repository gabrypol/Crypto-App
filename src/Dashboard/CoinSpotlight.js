import React from 'react';
import styled from 'styled-components';
import {Tile} from '../Shared/Tile';
import {AppContext} from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';

const SpotlightTileDashboard = styled(Tile)`
    grid-template-columns: 150px 150px;
    justify-content: start;
    @media (max-width: 400px) {
        grid-template-columns: auto auto;

        justify-content: space-around;
    }
`

const SpotlightName = styled.h2`
    text-align: center;
    align-self: center;
`

export default function (){
    return (
        <AppContext.Consumer>
            {({currentFavorite, coinList}) => 
                <SpotlightTileDashboard> 
                    <SpotlightName> {coinList[currentFavorite].CoinName} </SpotlightName>
                    <CoinImage spotlight coin={coinList[currentFavorite]}/>
                </SpotlightTileDashboard>
            }
        </AppContext.Consumer>
    )
}
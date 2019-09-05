import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from './AppProvider';

const Bar = styled.div`
    margin-bottom: 0px;
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 10px;
`

const Logo = styled.div`
    font-size: 2rem;
    justify-self: center;
`

const AlignRight = styled.div`
    display: grid;
    grid-gap: 10px;
`

const ControlButtonElem = styled.div`
    cursor: pointer;
    text-align: right;
    ${props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03;
    `}
    ${props => props.hidden && css`
        display: none;
    `}
`

function toProperCase(lower){
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

function ControlButton({name}){
    return (
        <AppContext.Consumer>
            {({firstVisit, page, setPage}) => (
            <ControlButtonElem 
                active={page === name}
                onClick={() => setPage(name)}
                hidden={firstVisit && name === 'dashboard'}
            >
                {toProperCase(name)}
            </ControlButtonElem>
        )}
        </AppContext.Consumer>
    )
}

export default function(){
    return (
        <Bar> 
            <Logo> Cryptodash </Logo>
            <AlignRight>
                <ControlButton active name="dashboard"/>
                <ControlButton name="settings"/>
            </AlignRight>
        </Bar>
    )
}
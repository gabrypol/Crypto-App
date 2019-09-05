import React from 'react';
import styled from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {fontSize1, greenBoxShadow, subtleBoxShadow} from '../Shared/Styles';

const ConfirmButtonStyled = styled.div`
    margin: 10px 10px 20px 10px;
    border: 2px solid rgb(6, 26, 68);
    ${subtleBoxShadow};
    border-radius: 50px;
    color: rgb(6, 26, 68);
    ${fontSize1};
    font-weight: 900;
    padding: 2px 10px 2px 10px;
    cursor: pointer;
    &:hover {
        ${greenBoxShadow}
    }
`

export const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`

export default function() {
    return (
        <AppContext.Consumer>
            {({confirmFavorites}) =>
            <CenterDiv>
                <ConfirmButtonStyled onClick={confirmFavorites}>
                    Confirm
                </ConfirmButtonStyled>
            </CenterDiv>
        }
        </AppContext.Consumer>
    )
}
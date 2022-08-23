import React from 'react';
import img from '../../../styles/assets/png/brainies.png';
import styled from 'styled-components';


const ReplicaBox = ({number}) => {

    const BoxStyle = styled.div`
        box-sizing: border-box;
        width: 10vw;
        height: 10vw;
        border: 1px solid black;
        background-image: url(${img});
        background-size: cover;
        background-position: 40%;
        margin-bottom: 10px;
        text-align: right;
        line-height: 17.5vw;
        padding-right: 5px;
        margin-right: 10px;
    `;

    return (
        <>
            <BoxStyle>
                {number}
            </BoxStyle>
        </>
    );
}

export default ReplicaBox;
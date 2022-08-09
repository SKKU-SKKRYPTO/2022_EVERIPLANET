import React from 'react';
import styled from 'styled-components';

const ChosenDNABOX = ({dna}) => {

    const BoxStyle = styled.div`
        width: 70%;
        height: 30%;
        background-color: white;
        border: 10px solid var(--border-color);
        border-radius: 10px;
        background-image: url(${props => props.img});
        background-size: cover;
        background-position: 40%;
        text-align: center;
        line-height: 2000%;
    `;

    return (
        <BoxStyle img={dna.img}>
            {dna.abrasionRate == -1 ? 'Choose DNA to copy' : `Abrasion Rate: ${dna.abrasionRate}`}
        </BoxStyle>
    );
}

export default ChosenDNABOX;
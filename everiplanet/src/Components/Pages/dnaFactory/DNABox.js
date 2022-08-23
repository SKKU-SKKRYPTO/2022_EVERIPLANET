import React from 'react';
import styled from 'styled-components';


const DNABox = ({img, isClicked, onClick}) => {

    const BoxStyle = styled.div`
        box-sizing: border-box;
        width: 10vw;
        height: 10vw;
        border: ${isClicked ? 5 : 1}px solid ${isClicked ? 'var(--highlight-color)' : 'black'};
        background-image: url(${img});
        background-size: cover;
        background-position: 40%;
        margin-bottom: 10px;
        margin-right: 10px;
    `;

    return (
        <>
            <BoxStyle onClick={onClick} />
        </>
    );
}

export default DNABox;
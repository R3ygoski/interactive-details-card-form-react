import styled from 'styled-components'
import cardLogo from './assets/card-logo.svg'

import FrontCard from './assets/bg-card-front.png'
import BackCard from './assets/bg-card-back.png'

    const CardNumber = styled.p `
    grid-area: 6/2/7/11;
    color: var(--white);
    font-size: 1.5rem;
    @media (min-width: 1440px) {
      & {
        grid-area: 6/2/7/11;
        font-size: 2.15rem;
      }
    }
    @media (min-width: 2000px) {
      & {
        font-size: 3rem;
      }
    }
    `
    const CardName = styled.p `
    grid-area: 9/2/10/10;
    color: var(--white);
    @media (min-width: 2000px) {
      & {
        font-size: 2rem;
      }
    }
    `
    const CardDate = styled.p `
    grid-area: 9/9/10/11;
    color: var(--white);
    margin-left: 1rem;
    @media (min-width: 1440px) {
      & {
        margin-left: 2rem;
      }
    }
    @media (min-width: 2000px) {
      & {
        font-size: 2rem;
        margin-left: 0rem;
      }
    }
    `

    const CardCCVContainer = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    grid-area: 3/9/4/11;
    margin: .2rem 0 0 .5rem;
    height: 80%;
    width: 70%;
    p {
        color: var(--white);
    }
    @media (min-width: 2000px) {
      & {
        font-size: 3rem;
      }
    }
    `
    const CardFrontAndBack = styled.div `
    display: grid;
    grid-template-columns: 5% repeat(9, 10%) 5%;
    grid-template-rows: ${props => props.$isFront?"repeat(10, 10%)":"repeat(5, 20%)"};
    background-image: ${props => props.$isFront?
    `url('${FrontCard}')`
    :
    `url('${BackCard}')`};
    background-size: cover;
    background-color: #333;
    width: 310px;
    height: 170px;
    position: absolute;
    border-radius: .5rem;
    left: ${props => props.$isFront? "3%":"10%"};
    top: ${props => props.$isFront? "14%":"3%"};
    @media (min-width: 375px) {
      & {
        left: ${props => props.$isFront? "3%":"15%"};
      }
    }
    @media (min-width: 425px) {
      & {
        left: ${props => props.$isFront? "3%":"24%"};
      }
    }
    @media (min-width: 768px) {
      & {
        top: ${props => props.$isFront? "12%":"12%"};
        left: ${props => props.$isFront? "5%":"55%"};
      }
    }
    @media (min-width: 1024px) {
      & {
        width: 400px;
        height: 245px;
        top: ${props => props.$isFront? "12%":"12%"};
        left: ${props => props.$isFront? "5%":"56%"};
      }
    }
    @media (min-width: 1440px) {
      & {
        width: 447px;
        height: 245px;
        left: ${props => props.$isFront? "10%":"15%"};
        top: ${props => props.$isFront? "20%":"52%"};
      }
    }
    @media (min-width: 2000px) {
      & {
        width: 600px;
        height: 400px;
        left: ${props => props.$isFront? "5%":"15%"};
        top: ${props => props.$isFront? "5%":"52%"};
      }
    }
`


export default function Card({isFront, valueName, valueNumber, valueCVC, valueMonth, valueYear}){

    return (
        <CardFrontAndBack $isFront={isFront}>
            {isFront? 
            <>
                <img style={{gridArea: '2/2/3/3'}} src={cardLogo} alt='Card Logo'/>

                {valueNumber? 
                <CardNumber>{`${valueNumber}`}</CardNumber>
                :
                <CardNumber>0000 0000 0000 0000</CardNumber>}

                {valueName? 
                <CardName>{`${valueName.toUpperCase()}`}</CardName>
                :
                <CardName>JANE APPLESEED</CardName>}

                {valueMonth? 
                <CardDate>{`${valueMonth}/${valueYear}`}</CardDate>
                :
                <CardDate>00/00</CardDate>}
            </>
            :
            <>
                <CardCCVContainer>
                    {valueCVC?
                    <p>{`${valueCVC}`}</p>
                    :
                    <p>000</p>}
                </CardCCVContainer>
            </>
            }
        </CardFrontAndBack>
    )
}
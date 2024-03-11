import './var.css'

import styled from 'styled-components'
import Card from './components/Card'
import Attribution from './components/Attribution/index.jsx'

import BannerDesktopImg from './assets/bg-main-desktop.png'
import BannerMobileImg from './assets/bg-main-desktop.png'
import iconComplete from './assets/icon-complete.svg'

import { numberList } from './numberListData.js'
import { useState } from 'react'

  // Styled Components

  const Banner = styled.figure `
    background-image: url('${BannerMobileImg}');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 40%;
    @media (min-width: 1440px) {
      & {
        background-image: url('${BannerDesktopImg}');
        background-repeat: no-repeat;
        background-size: cover;
        width: 30%;
        height: 100%;
      }
    }
  `
  const Main = styled.main `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--white);
    @media (min-width: 1440px) {
      & {
        width: 70%;
        height: 100%;
      }
    }
  `
  const Form = styled.form `
    width: 310px;
    height: 400px;
    @media (min-width: 1440px) {
      & {
        width: 470px;
        height: 400px;
      }
    }
  `
  const FormHighSection = styled.div `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
  `
  const FormLowSection = styled.div `
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin-top: .5rem;
    height: 25%;
  `
  const Button = styled.button `
    background: var(--very-dark-violet);
    color: var(--white);
    padding: 1rem;
    border: none;
    border-radius: .5rem;
    font-size: 1.2rem;
    width: 100%;
    margin-top: 1.25rem;
    cursor: pointer;
  `
  const ButtonDisabled = styled(Button) `
    background: #444;
    cursor: default;
  `
  const InputBig = styled.input `
    border: var(--light-grayish-violet) 2px solid;
    border-radius: .5rem;
    padding: .5rem;
    max-height: 48px;
    font-size: 1.15rem;
    &:focus {
      outline: var(--violet) 2px solid;
      border: 2px solid transparent;
    }
  `
  const LabelInput = styled.label `
    text-transform: uppercase;
    letter-spacing: .1rem;
    font-size: .7rem;
    white-space: nowrap;
    margin-top: 1rem;
    @media (min-width: 1440px) {
      & {
        font-size: 1rem;
      }
    }
  `
  const LabelInputLow = styled(LabelInput) `
    margin-top: 0rem;
  `
  const SuccessSection = styled.section `
    width: 310px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.3rem;
    @media (min-width: 1440px){
      & {
        width: 470px;
        height: 400px;
      }
    }
  `
  const Thanks = styled.p `
    font-size: 1.8rem;
    color: var(--very-dark-violet);
    text-transform: uppercase;
    letter-spacing: .2rem;
    margin-top: 1rem;
  `
  
export default function App() {

  // OnChange

  const [username, setUsername] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [cvc, setCVC] = useState('')

  // OnBlur

  const [errorName, setErrorName] = useState(false)
  const [errorNumber, setErrorNumber] = useState(false)
  const [errorDate, setErrorDate] = useState(false)
  const [errorCVC, setErrorCVC] = useState(false)

  // OnClick

  const [successPage, setSuccessPage] = useState(false)

  //Generic Section
  const inputError = (blurError) => {
    blurError(true)
  }
  const handleInputs = (e, regexp, setChangeFunction, blurError, length, conditional, switchToNumber, valueConverted) => {
    
    const value = e.target.value
    const valueFormatted = valueConverted

    if(!value.match(regexp) || conditional)  {
      inputError(blurError)
    } else if (length && switchToNumber === true){
      setChangeFunction(valueFormatted)
    } else if(length) {
      setChangeFunction(value)
    }
  }
  const checkInputs = (conditional, blurError) => {
    if(conditional){
      blurError(false)
    }
  }

  //Handlers and Checkers
    //Holdername Section
  const handleCardNameChange = (e) => {
    handleInputs(e, /^[A-Za-z ]*$/, setUsername, setErrorName, Infinity, null, false, '')
  }
  const checkCardName = (e) => {
    const finalValue = e.target.value
    checkInputs(numberList.some(n=>!finalValue.includes(n)) && finalValue.length !== 0, setErrorName)
  }

    //CardNumber Section
  const handleCardNumberChange = (e) => {
    const value = e.target.value
    const valueConv = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
    handleInputs(e, /^[0-9 ]*$/, setCardNumber, setErrorNumber, value.length <= 19, null, true, valueConv)
  }
  const checkCardNumber = (e) => {
    const finalValue = e.target.value
    checkInputs(numberList.some(n=>finalValue.includes(n)), setErrorNumber)
  }

    //Date Section
  const handleMonthChange = (e) => {
    const value = e.target.value
    handleInputs(e, /^[0-9]*$/, setMonth, setErrorDate, value.length <= 2, value < 0 || value > 12 || value == '00', false, '')
  }
  const handleYearChange = (e) => {
    const value = e.target.value
    handleInputs(e, /^[0-9]*$/, setYear, setErrorDate, value.length <= 2, value < 0, false, '')
  }
  const checkDate = (e) => {
    const finalValue = e.target.value
    checkInputs(!finalValue.length === 0 || !month.length <= 1 , setErrorDate)
  }

    //CVC Section
  const handleCVCChange = (e) => {
      const value = e.target.value
    handleInputs(e, /^[0-9]*$/, setCVC, setErrorCVC, value.length <= 3, null, false, '')
  }
  const checkCVC = (e) => {
    const finalValue = e.target.value
    checkInputs(numberList.some(n=>finalValue.includes(n)), setErrorCVC)
  }
  
    //Clear Form
  const clearForm = () => {
    setUsername('')
    setCardNumber('')
    setMonth('')
    setYear('')
    setCVC('')
  }

  return (
    <>
    <Banner/>
    <Main>
      {/* Card back */}
      <Card isFront={false} valueCVC={cvc}/>

      {/* Card front */}
      <Card isFront={true} valueName={username} valueNumber={cardNumber} valueMonth={month} valueYear={year}/>
      {!successPage && 
      <Form onSubmit={e=>e.preventDefault()} id="form" noValidate>
        <FormHighSection>
          <LabelInput htmlFor='username'>Cardholder Name</LabelInput>
          <InputBig id="username" type='text' onChange={handleCardNameChange} onBlur={checkCardName} value={username} placeholder='e.g. Jane Appleseed'/>
          { errorName?
          <p className="error_message">Letters only</p>
          :
          ''}
          <LabelInput htmlFor='cardnumber'>Card Number</LabelInput>
          <InputBig id="cardnumber" type='text' onChange={handleCardNumberChange} onBlur={checkCardNumber} value={cardNumber} placeholder='e.g. 1234 5678 9123 0000'/>
          { errorNumber?
          <p className="error_message">Numbers only</p>
          :
          ''}
        </FormHighSection>
        <FormLowSection>
          <div className='date_container'>
            <LabelInputLow id="date_label">Exp. Date (MM/YY)</LabelInputLow>
            <InputBig id="month_input" type='text' placeholder='MM' onChange={handleMonthChange} onBlur={checkDate} value={month}/>
            <InputBig id="year_input" type='text' placeholder='YY' onChange={handleYearChange} onBlur={checkDate} value={year}/>
            { errorDate?
            <p className="error_message" id="date_error">Can't be blank</p>
            :
            ''}
          </div>
          <div className='ccv_container'>
            <LabelInputLow id="cvc_label">CVC</LabelInputLow>
            <InputBig id="cvc_input" type='text' placeholder='e.g. 123' onChange={handleCVCChange} onBlur={checkCVC} value={cvc}/>
            { errorCVC?
            <p className="error_message" id="cvc_error">Can't be blank</p>
            :
            ''} 
          </div>
        </FormLowSection>
        {username && cardNumber && month && year && cvc && !errorNumber && !errorNumber && !errorDate && !errorCVC
        ?<Button type='button' onClick={(e)=>{setSuccessPage(true)}}>Confirm</Button>
        :<ButtonDisabled type='button'>Confirm</ButtonDisabled>}
      </Form>
      }

      {/* Success page */}
      {successPage && 
      <SuccessSection>
        <img src={iconComplete} alt="Success"></img>
        <Thanks>Thank You!</Thanks>
        <p className='success__desc'>We've added your card details</p>
        <Button onClick={(e)=>{setSuccessPage(false); clearForm()}}>Continue</Button>
      </SuccessSection>}
    </Main>
    <Attribution/>
    </>
  )
}
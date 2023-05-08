import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import PoweredBy from './images/powered_by.png';
import axios from 'axios'
// import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Unstable_Grid2';

function InvoiceRefComponent() {
  const { invoiceref } = useParams();
  const [paymentData, setPaymentData] = useState();

  useEffect(() => {
    (async () => {
      const { status, data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/payment/invoices/${invoiceref}`)
      status == 200 && setPaymentData(data)
    })()
  }, [])

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: '22px'
  }))

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: 'white',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  // console.log({ checkoutPayload });

  const PaymentLink = () => {
    const { link, business, key, logo, merchantEmail, merchantName } = paymentData;
    const {tradingname} = business;
    const { linkName, paymentreference, linkType, amount, currency, description, redirectUrl, pageImage, donationWebsite, donationContact } = link;
    const [checkoutPayload, setCheckoutPayload] = useState({});
    const { fname, lname, email, phoneNumber, amount: inputedAmount, service } = checkoutPayload;

    useEffect(() => {
      amount && updateValueHandler('amount', amount)
    }, [amount])

    const loadCheckout = () => {
      const randomReference = `ITEX-PAY-${Math.floor(Math.random() * 10000)}`;
      const Pay = new window.ItexPayNS.ItexPay({
        api_key: key,
        first_name: fname,
        last_name: lname,
        phone_number: phoneNumber,
        email: email,
        amount: inputedAmount,
        redirecturl: redirectUrl,
        reference: randomReference,
        paymentlinkreference: paymentreference,
        currency,
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
        onClose: () => {
        },
      });

      Pay.init();
    }

    const updateValueHandler = (prop, value) => {
      setCheckoutPayload(prev => ({
        ...prev, [prop]: value
      }))
    }

    return <div id="link-wrapper">
      <div id="payment-link" >
        <div id="transaction-details">
          <div id="merchant-logo">
            <img src={pageImage} alt="page-image"
              id="logo" />
          </div>
          <div id="tx-details-text">
            <div id="merchant-name">{tradingname}</div>
            <div id="customer-email">{merchantEmail}</div>
          </div>
        </div>
        <div id="payment-body" style={{
          marginBottom: '20px',
          border: "1px solid #27AE60",
          borderRadius: "20px"
        }}>
          <form onSubmit={(e) => {
            e.preventDefault()
            loadCheckout()
          }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <StyledFormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    First Name
                  </InputLabel>
                  <BootstrapInput id="bootstrap-input" fullWidth onChange={(e) => updateValueHandler('fname', e.target.value)} required />
                </StyledFormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <StyledFormControl variant="standard" fullWidth>
                  <InputLabel shrink htmlFor="bootstrap-input">
                    Last Name
                  </InputLabel>
                  <BootstrapInput id="bootstrap-input" fullWidth onChange={(e) => updateValueHandler('lname', e.target.value)} required />
                </StyledFormControl>
              </Grid>
            </Grid>
            <StyledFormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Email Address
              </InputLabel>
              <BootstrapInput type="email" placeholder="customer@mail.com" id="bootstrap-input" onChange={(e) => updateValueHandler('email', e.target.value)} required />
            </StyledFormControl>
            <StyledFormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Phone Number (Optional)
              </InputLabel>
              <BootstrapInput type="tel" placeholder="+23481356674" id="bootstrap-input" onChange={(e) => updateValueHandler('phoneNumber', e.target.value)} required />
            </StyledFormControl>
            <StyledFormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Amount to charge
              </InputLabel>
              <BootstrapInput type="number" defaultValue={amount} id="bootstrap-input" disabled={linkType !== 'donation' ? true : false} onChange={(e) => updateValueHandler('amount', e.target.value)} required />
            </StyledFormControl>
            <StyledFormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Service interested in?
              </InputLabel>
              <BootstrapInput id="bootstrap-input" onChange={(e) => updateValueHandler('service', e.target.value)} required />
            </StyledFormControl>
            <button style={{
              width: '100%',
              height: '54px',
              backgroundColor: '#008037',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
              type="submit"
            >Pay Now</button>
          </form>
        </div >
        <img src={PoweredBy} width="138px" height="28px" alt="secured by itex" />
      </div>
    </div >
  }

  if (!paymentData) {
    return <div id="loader"><ClipLoader
      color="green"
      loading={true}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    /></div>
  }

  return (
    <>
      {paymentData && <PaymentLink />}
    </>
  );
}

export default InvoiceRefComponent;

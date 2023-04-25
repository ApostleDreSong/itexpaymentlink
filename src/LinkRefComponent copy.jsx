import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import LinkInput from './components/LinkInput';
import PoweredBy from './images/powered_by.png';
import axios from 'axios'

function LinkRefComponent() {
  const { linkref } = useParams();
  const [paymentData, setPaymentData] = useState();
  const [checkoutPayload, setCheckoutPayload] = useState({});

  useEffect(() => {
    (async () => {
      const { status, data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/payment/link/${linkref}`)
      status == 200 && setPaymentData(data)
    })()
  }, [])

  const updateValueHandler = (prop, value) => {
    const newPayload = {
      ...checkoutPayload, [prop]: value
    }
    console.log({ prop, value, newPayload });
    setCheckoutPayload({ ...newPayload })
    // setCheckoutPayload(prev => ({
    //   ...prev, [prop]: value
    // }))
  }

  // console.log({ checkoutPayload });

  const PaymentLink = () => {
    const { logo, companyName, merchantName } = paymentData;
    const { linkName, linkType, amount, currency, description, redirectUrl, pageImage, donationWebsite, donationContact } = paymentData.link;

    return <div id="link-wrapper">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '32px'
      }}>
        <img width="45px" height="47px" src={logo} />
        <div style={{
          marginTop: '40px',
          marginBottom: '24px'
        }}>{companyName}</div>
        <div>Payment to {merchantName}</div>
      </div>
      <div id="payment-link" style={{
        marginBottom: '20px',
        border: "1px solid #E7E7E7",
        borderRadius: "12px"
      }}>
        <form>
          <div style={{
            display: 'flex',
            marginBottom: '28px'
          }}
            id="name-wrapper"
          >
            <div className="name">
              <LinkInput
                updateValue={updateValueHandler}
                name="firstName"
                value={checkoutPayload.firstName}
                label="First name" />
            </div>
            <div className="name">
              <LinkInput
                updateValue={updateValueHandler}
                name="lastName"
                value={checkoutPayload.name}
                label="Last name" />
            </div>
          </div>
          <div style={{
            marginBottom: '28px'
          }}>
            <LinkInput
              updateValue={updateValueHandler}
              name="email"
              value={checkoutPayload.email}
              label="Email address" />
          </div>
          <div style={{
            marginBottom: '28px'
          }}>
            <LinkInput
              updateValue={updateValueHandler}
              name="phoneNumber"
              value={checkoutPayload.phoneNumber}
              selectOptions={[
                {
                  name: '+234',
                  value: '+234'
                },
                {
                  name: '+235',
                  value: '+235'
                }
              ]} hasDropdown={true} label="Phone number (optional)" />
          </div>
          <div style={{
            marginBottom: '28px'
          }}>
            <LinkInput selectOptions={[
              {
                name: 'NGN',
                value: 'NGN'
              },
              {
                name: 'USD',
                value: 'USD'
              }
            ]} hasDropdown={true} label="Amount to charge"
              initialValue={amount}
              name="amount"
              value={checkoutPayload.amount}
              updateValue={updateValueHandler}
              editable={linkType === 'donation' ? true : false}
            />
          </div>
          <button style={{
            width: '100%',
            height: '54px',
            backgroundColor: '#008037',
            color: 'white',
            border: 'none'
          }}>Pay Now</button>
        </form>
      </div >
      <img src={PoweredBy} width="149px" height="22px" alt="powered by sayswitch" />
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

export default LinkRefComponent;

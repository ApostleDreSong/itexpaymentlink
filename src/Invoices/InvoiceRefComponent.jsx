import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import PoweredBy from '../images/powered_by.png';
import axios from 'axios';
import styles from './Invoices.module.scss';
// import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactComponent as DownloadIcon } from './csv.svg';
import { Divider } from '@mui/material';
import { numberWithCommas } from '../util/formatNumber';

function InvoiceRefComponent() {
	const { invoiceref } = useParams();
	const [paymentData, setPaymentData] = useState();

	useEffect(() => {
		(async () => {
			const { status, data } = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/api/v1/payment/invoice/${invoiceref}`
			);
			status == 200 && setPaymentData(data);
		})();
	}, []);

	const StyledFormControl = styled(FormControl)(({ theme }) => ({
		marginBottom: '22px',
	}));

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

	const InvoiceLink = () => {
		const { invoice, customer, key, business, items } = paymentData;
		const { tradingname, businessemail } = business;
		const { email: mail, firstname, lastname, country } = customer;

		const {
			invoiceName,
			paymentreference,
			invoiceUrl,
			customername,
			currency,
			dueDate,
			businesslogo,
			comment,
			tax,
			discount,
			totalAmount,
			status,
			createdAt,
		} = invoice;
		// const [checkoutPayload, setCheckoutPayload] = useState({});
		// const {
		// 	fname,
		// 	lname,
		// 	email,
		// 	phoneNumber,
		// 	amount,
		// 	service,
		// } = checkoutPayload;

		const loadCheckout = () => {
			const randomReference = `ITEX-PAY-INVOICE-${Math.floor(
				Math.random() * 10000
			)}`;
			const Pay = new window.ItexPayNS.ItexPay({
				api_key: key,
				first_name: firstname,
				last_name: lastname,
				// phone_number: '',
				email: mail,
				amount: totalAmount,
				redirecturl: '',
				reference: randomReference,
				paymentlinkreference: paymentreference,
				currency,
				onCompleted: (data) => {
					console.log(data);
				},
				onError: (error) => {
					console.log(error);
				},
				onClose: () => {},
			});

			Pay.init();
		};

		// const updateValueHandler = (prop, value) => {
		// 	setCheckoutPayload((prev) => ({
		// 		...prev,
		// 		[prop]: value,
		// 	}));
		// };

		const TotalSubTotal = items?.reduce(
			(curr, next) => curr + next.subtotal,
			0
		);

		return (
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<div className={styles.header_left}>
						<button className={styles.header_button_left}>
							<span>
								<DownloadIcon />
							</span>
							Download
						</button>
					</div>
					<div className={styles.header_right}>
						<button
							onClick={() => loadCheckout()}
							className={styles.header_button_right}>
							Pay Now
						</button>
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.body_wrapper}>
						<div className={styles.body_wrapper_item}>
							<h2>INVOICE</h2>
							<h5>Ref: {paymentreference}</h5>
							<h4>INVOICE FROM</h4>
							<div className={styles.body_desc}>
								<div className={styles.body_desc_img}>
									{tradingname.substring()[0]}
									{tradingname.substring()[1]}
								</div>
								<div className={styles.body_desc_content}>
									<h2>{tradingname}</h2>
									<p>{businessemail}</p>
								</div>
							</div>

							<div className={styles.list_wrapper}>
								<div className={styles.list}>
									<div className={styles.listItems}>
										<h5>Issue Date:&nbsp;</h5>
										<p>{createdAt}</p>
									</div>
									<div className={styles.listItems}>
										<h5>Bill to: &nbsp;</h5>
										<p>{customername}</p>
									</div>
								</div>
								<div className={styles.list}>
									<div className={styles.listItems}>
										<h5>Due Date:&nbsp;</h5>
										<p>{dueDate}</p>
									</div>
									<div className={styles.listItems}>
										<h5>
											{firstname} {lastname}: &nbsp;
										</h5>
										<p>({mail})</p>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.tableNew}>
							{/* Table header */}
							<div className={styles.table_header}>
								<div className={styles.table_header_left}>
									<h3 className={styles.table_header_h3}>Item Description</h3>
								</div>
								<div className={styles.table_header_right}>
									<h3 className={styles.table_header_h3}>Quantity</h3>
									<h3 className={styles.table_header_h3}>Unit Price</h3>
									<h3 className={styles.table_header_h3}>Amount</h3>
								</div>
							</div>

							{/* Table body */}
							{items.map((item) => (
								<>
									<div className={styles.table_body}>
										<div className={styles.table_header_left}>
											<h6 className={styles.table_header_h6}>
												{item.itemName}
											</h6>
										</div>
										<div className={styles.table_header_right}>
											<h6 className={styles.table_header_h6}>
												{item.quantity}
											</h6>
											<h6 className={styles.table_header_h6}>
												{currency} {numberWithCommas(item.price)}
											</h6>
											<h6 className={styles.table_header_h6}>
												{currency}
												{numberWithCommas(item.subtotal)}
											</h6>
										</div>
									</div>
									<Divider />
								</>
							))}

							{/* Table footer */}

							<div className={styles.table_footer}>
								<div className={styles.footer_left}></div>
								<div className={styles.footer_right}>
									<div className={styles.footer_content}>
										<h3 className={styles.footer_content_h3}>Subtotal</h3>
										<h3 className={styles.footer_content_h3}>
											{currency} {numberWithCommas(TotalSubTotal)}
										</h3>
									</div>
									<div className={styles.footer_content}>
										<h3 className={styles.footer_content_h3}>Tax (0%)</h3>
										<h3 className={styles.footer_content_h3}>{tax}</h3>
									</div>
									<div className={styles.footer_content}>
										<h3 className={styles.footer_content_h3}>Fees/Discounts</h3>
										<h3 className={styles.footer_content_h3}>{discount}</h3>
									</div>
								</div>
							</div>
							<div className={styles.footer_content_end}>
								<div className={styles.footer_content_dif}>
									<h3 className={styles.footer_content_h6}>Total</h3>
									<h3 className={styles.footer_content_h6}>
										{currency}
										{numberWithCommas(totalAmount)}
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	if (!paymentData) {
		return (
			<div id='loader'>
				<ClipLoader
					color='green'
					loading={true}
					size={150}
					aria-label='Loading Spinner'
					data-testid='loader'
				/>
			</div>
		);
	}

	return <>{paymentData && <InvoiceLink />}</>;
}

export default InvoiceRefComponent;

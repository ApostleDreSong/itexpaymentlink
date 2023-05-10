export function numberWithCommas(x) {
	return Number(x).toLocaleString('en-US', {
		minimumFractionDigits: 2,
	});
}

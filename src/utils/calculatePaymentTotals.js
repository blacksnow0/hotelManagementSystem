export default function calculatePaymentTotals(
  payments = [],
  totalAmount = 0,
  advanceAmount = 0,
) {
  const safeTotalAmount =
    Number(totalAmount) || 0;

  const safeAdvanceAmount =
    Number(advanceAmount) || 0;

  /* PAYMENTS ADDED LATER */
  const paymentAmount =
    payments.reduce(
      (sum, payment) =>
        sum +
        Number(payment.amount || 0),
      0
    );

  /* TOTAL RECEIVED */
  const receivedAmount =
    safeAdvanceAmount +
    paymentAmount;

  /* REMAINING */
  const pendingAmount =
    safeTotalAmount -
    receivedAmount;

  return {
    receivedAmount,

    pendingAmount,
  };
}
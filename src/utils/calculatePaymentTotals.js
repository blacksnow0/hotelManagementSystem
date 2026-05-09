export default function calculatePaymentTotals(
  payments = [],
  totalAmount = 0
) {
  const receivedAmount =
    payments.reduce(
      (sum, payment) =>
        sum + Number(payment.amount || 0),
      0
    );

  const pendingAmount =
    Number(totalAmount) -
    receivedAmount;

  return {
    receivedAmount,

    pendingAmount,
  };
}
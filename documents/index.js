module.exports = (file) => {
  const currentDay = new Date();
  const dueDate = new Date(currentDay.setDate(currentDay.getDate() + 30));
  const dueDateDate = dueDate.getDate();
  const dueDateMonth = dueDate.getMonth();
  const dueDateYear = dueDate.getFullYear();
  const items = file.invoiceItems.map(row => {
    const { item, quantity, rate, amount} = row;
    return (
      `<tr class='invoice-item'>
        <td>${item}</td>
        <td>${quantity}</td>
        <td>${rate}</td>
        <td>${amount}</td>
      </tr>`
    )
  })

  return `
  <!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title></title>
    <style>
      body {
        padding: 0;
        margin: 0;
      }
      .page {
        height: 8.5in;
        width: 95%;
        position: relative;
        margin: 30px 20px;
      }
      .page table {
        width: 100%;
      }
      .page .logo {
        width: 150px;
      }
      .invoice-header {
        width: 100%;
        padding-bottom: 20px;
      }
      .invoice-header .logo {
        vertical-align: top;
      }
      .invoice-dates {
        width: 100%;
        text-align: right;
        font-size: 16px;
      }
      .invoice-addresses {
        width: 100%;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        margin: 20px 0;
      }
      .invoice-address {
        padding: 30px;
        line-height: 1.3;
        font-size: 16px;
      }
      .invoice-address .address-frto {
        font-size: 20px;
      }
      .page td .invoice-money {
        text-align: right;
        margin-left: auto;
        margin-bottom: 10px;
        width: 200px;
      }
      .page td .invoice-money tr {
        line-height: 1.3;
        font-size: 16px;
      }
      .page td .invoice-money tr:nth-child(even) {
        background: lightgray;
      }
      .page td .invoice-money tr td {
        padding: 3px;
      }
      .page .invoice-next-page {
        font-size: 16px;
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
      }
      .invoice-terms {
        width: 100%;
        font-size: 16px;
        padding-top: 10px;
        border-top: 1px solid black;
      }
      .invoice-terms p {
        font-size: 16px;
      }
      #total-due {
        background: rgb(224, 123, 105);
      }
      #amount-paid {
        background: rgb(145, 195, 149);
      }
      .invoice-items {
        max-width: 600px;
        margin: 0 auto;
      }
      .invoice-items .invoice-item{
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <div class="page">
      <table>
        <tr>
          <td>
            <table class="invoice-header">
              <tr>
                <td class="logo">
                  Logo
                </td>
                <td>
                  <table class="invoice-dates">
                    <tr>
                      <td>Invoice #: ${file.invoiceNumber}</td>
                    </tr>
                    <tr>
                      <td>Date: ${currentDay.getMonth()}/${currentDay.getDate()}/${currentDay.getFullYear()}</td>
                    </tr>
                    <tr>
                      <td>Due Date: ${dueDateMonth}/${dueDateDate}/${dueDateYear}</td>
                    </tr>
                    <tr>
                      <td>Balance Due: $${file.balanceDue}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="invoice-addresses">
              <tr>
                <td class="invoice-address">
                  <strong class="address-frto">From: </strong><br />
                  Happy Inc.<br />
                  123 Happy St. <br />
                  Atlanta, GA 30075
                </td>
                <td class="invoice-address">
                  <strong class="address-frto">To: </strong><br />
                  Happy Inc.<br />
                  123 Happy St. <br />
                  Atlanta, GA 30075
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <table class="invoice-money" cellspacing="0">
              <tr>
                <td>Subtotal:</td>
                <td>$${file.subtotal}</td>
              </tr>
              <tr>
                <td>Discount:</td>
                <td>${file.discount}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td>${file.tax}</td>
              </tr>
              <tr>
                <td>Shipping:</td>
                <td>$${file.shipping}</td>
              </tr>
              <tr id="total-due">
                <td>Total:</td>
                <td>$${file.total}</td>
              </tr>
              <tr id="amount-paid">
                <td>Amount Paid:</td>
                <td>$${file.amountPaid}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
            <div class="invoice-terms">
              <h3>Terms of Services</h3>
              <p>
                Net 30 terms are for business customers only. Requests for Net
                30 terms will be reviewed and approved by the Company. Net 30
                terms are not guaranteed to all businesses.
              </p>
            </div>
          </td>
        </tr>
      </table>

      <h3 class="invoice-next-page">
        *** Please look on the next page for an Itemized list of your invoice.
        ***
      </h3>
    </div>
    <div class="page">
      <table>
        <tr>
          <td>
            <table class="invoice-header">
              <tr>
                <td class="logo">
                  Logo
                </td>
                <td>
                  <table class="invoice-dates">
                    <tr>
                      <td>Invoice #: 123456</td>
                    </tr>
                    <tr>
                      <td>Date: 03/12/2019</td>
                    </tr>
                    <tr>
                      <td>Due Date: 04/11/2019</td>
                    </tr>
                    <tr>
                      <td>Amount Due: $105.56</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td>
              <h3>Itemized Summary</h3>
          </td>
        </tr>
        <tr>
            <table class='invoice-items' cellspacing="0">
              <tr>
                <td>Item</td>
                <td>Quantity</td>
                <td>Rate</td>
                <td>Amount</td>
            </tr>
              ${items.join()}
            </table>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
};

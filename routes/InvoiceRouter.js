const { invoice_description, amount } = require('../module/InvoiceModule');

const express = require('express'),
invoiceRouter = express.Router();
dateFormat = require("dateformat");

invoiceRouter.use((req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect("/login");
  } else {
    next();
  }
});

invoiceRouter.get("/invoice_download", async (req, res) => {
    var data = req.query;
    var invoice_history = await invoice_description(data.order_id);
    res.render("invoice/invoice_details", {
        data1: invoice_history.suc > 0 ? invoice_history.msg : [],
    });
});


invoiceRouter.post('/download_pdf', async (req, res) => {
    var data = req.body
    const browser = await puppeteer.launch({
        headless: 'new'
    });
    
    // Open a new page
    const page = await browser.newPage();

    // Set the content of the page with your HTML
    const htmlContent = data.pdfDiv;

    await page.setContent(htmlContent);

    // Generate a PDF file
    const pdfBuffer = await page.pdf({format: 'A4' });
    // var pdfBlob = new Blob([pdfBuffer])

    // Close the browser
    await browser.close();

    // console.log(pdfBlob);

    // Send the PDF as a download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
    res.send(pdfBuffer);
})

module.exports = {invoiceRouter}
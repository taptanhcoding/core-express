"use strict";
const nodemailer = require("nodemailer");
const mailConfig = require("../configs/mailer.config");
const fs = require("fs");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_SEND,
    pass: process.env.PASS_EMAIL,
  },
});

// async..await is not allowed in global scope, must use a wrapper
module.exports= async function sendMail({ email, type, data }) {
  let htmlContent = ``;
  switch (type) {
    case "activeMail":
      htmlContent = await fs.readFileSync(mailConfig.activeMail.htmlLink, "utf-8");
      htmlContent = htmlContent
        .replace(
          "{{{logo}}}",
          "https://i.pinimg.com/564x/21/8b/8e/218b8e2c86a69c7581e40701416ac663.jpg"
        )
        .replace("{{{web}}}", "http://localhost:3000");
      break;
    case "accessCart":
      htmlContent = await fs.readFileSync(mailConfig.accessCart.htmlLink, "utf-8");

      let tableproduct = data.order.products.reduce(
        (prev, product, index) =>
          prev +
          `<tr>
          <td align="center"> <strong>${index + 1}</strong><br> </td>
          <td> <a href="${product.link}"
                  target="_blank"
                  >${product.name}</a> </td>
          <td> <strong>${Intl.NumberFormat().format(
            product.price
          )} ₫</strong> </td>
          <td> <strong>${product.quantity}</strong> </td>
          <td> <span>${Intl.NumberFormat().format(
            product.total
          )} ₫ </span> </td>
      </tr>`,
        ""
      );
      tableproduct += `<tr>
      <td colspan="4" align="right"><strong>Tổng:</strong></td>
      <td><strong>${Intl.NumberFormat().format(
        data.order.total
      )}₫</strong> </td>
  </tr>`;

      htmlContent = htmlContent
        .replace("{{{customer}}}", data.customer.name)
        .replace("{{{web}}}", "http://localhost:3000")
        .replace("{{{sellcode}}}", data.order.code)
        .replace("{{{customername}}}", data.order.nameorder)
        .replace("{{{gender}}}", data.customer.gender)
        .replace("{{{address}}}", data.customer.address)
        .replace("{{{email}}}", data.customer.email)
        .replace("{{{tel}}}", data.customer.tel)
        .replace("{{{body}}}", tableproduct);
      break;
    case "forgotpassword":
      htmlContent = await fs.readFileSync(mailConfig.forgotpassword.htmlLink, "utf-8");
      htmlContent = htmlContent.replace("{{{password}}}", data.password)
      break;
    default:
      break;
  }

  // send mail with defined transport object

  try {
    await transporter.sendMail({
      from: "viết gì đó ", // sender address
      to: email, // list of receivers
      subject: mailConfig[type].subject, // Subject line
      text: "", // plain text body
      html: htmlContent, // html body
    });
    return true
  } catch (error) {
    console.log(error);
    return false
  }


}



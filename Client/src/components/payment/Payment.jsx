import styles from "./payment.module.scss"
import CryptoJS from "crypto-js"
import axios from "axios"
import useFetch from "../../hooks/useFetch.js"

const PaymentButton = () => {
  const amount = 700
  const order_id = Date.now() // can be lessonId + studentId, should be unique
  const description = "Sign up for a lesson"
  const lessonId = "6633f318656b487f06489aea"

  const { patchData, postData } = useFetch()

  const generateData = (orderId, amount, description) => {
    const json = JSON.stringify({
      version: 3,
      public_key: import.meta.env.VITE_LIQPAY_PUBLIC_KEY,
      // private_key: import.meta.env.VITE_LIQPAY_SECRET_KEY,
      action: "pay",
      amount: amount,
      currency: "UAH",
      description: description,
      order_id: orderId
    })

    return btoa(json)
  }

  const sendServerRequestLessons = async () => {
    console.log("sendServerRequestLessons called")
    try {
      const res = await patchData(
        `http://localhost:3000/api/lessons/${lessonId}/signup`,
        {}
      )

      //console.log(res);
    } catch (err) {
      console.log(err)
    }
  }

  const sendServerRequestPayments = async requestData => {
    console.log("sendServerRequestPayments called")
    try {
      const res = await postData(
        "http://localhost:3000/api/payments",
        requestData
      )

      //console.log(res);
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = () => {
    console.log("handleClick called")
    const data = generateData(order_id, amount, description)
    const signature = sha1Base64(
      import.meta.env.VITE_LIQPAY_SECRET_KEY +
        data +
        import.meta.env.VITE_LIQPAY_SECRET_KEY
    )

    processLiqPayPayment(
      data,
      signature,
      () => sendServerRequestLessons(),
      () => console.log("Error"),
      requestData => sendServerRequestPayments({ ...requestData, lessonId })
    )
  }

  return (
    <div className={styles.wrapper}>
      <div id="#liqpay_checkout"></div>
      <button className={styles.payment_button} onClick={handleClick}>
        Pay
      </button>
    </div>
  )
}

const sha1Base64 = str => {
  const sha1Hash = CryptoJS.SHA1(str)
  const base64Hash = CryptoJS.enc.Base64.stringify(sha1Hash)
  return base64Hash
}

const processLiqPayPayment = (data, signature, successCb, errorCb, cb) => {
  console.log("processLiqPayPayment called")
  ;(window.LiqPayCheckoutCallback = function() {
    LiqPayCheckout.init({
      data: data,
      signature: signature,
      embedTo: "#liqpay_checkout",
      language: "en",
      mode: "popup" // embed || popup
    })
      .on("liqpay.callback", function(data) {
        if (data.status === "success") successCb()
        else if (data.status === "error") errorCb()
        const requestData = {
          status: data.status,
          amount: data.amount,
          paytype: data.paytype,
          end_date: data.end_date,
          order_id: data.order_id
        }
        cb(requestData)
      })
      .on("liqpay.ready", function(data) {
        // ready
      })
      .on("liqpay.close", function(data) {
        // close
      })
  })()
}
export default PaymentButton

import styles from "./payment.module.scss"
import CryptoJS from "crypto-js"
import useFetch from "../../hooks/useFetch.js"

const PaymentButton = () => {
  const amount = 700
  const order_id = Date.now() // can be lessonId + studentId, should be unique
  const description = "Sign up for a lesson"
  const lessonId = "6633f318656b487f06489ac2"

  const { data, patchData, error, loading } = useFetch()

  const generateData = (orderId, amount, description) => {
    const json = JSON.stringify({
      version: 3,
      public_key: import.meta.env.VITE_LIQPAY_PUBLIC_KEY,
      action: "pay",
      amount: amount,
      currency: "UAH",
      description: description,
      order_id: orderId
    })

    return btoa(json)
  }
  const sendServerRequest = async paymentData => {
    try {
      const res1 = await patchData(
        `http://localhost:3000/api/lessons/my`,
        paymentData
      )
      console.log("Response from /lessons/my:", res1)
    } catch (err) {
      console.log("Error from /lessons/my:", err)
    }

    try {
      const res2 = await patchData(
        `http://localhost:3000/api/lessons/${lessonId}/signup`,
        {}
      )
      console.log("Response from /lessons/${lessonId}/signup:", res2)
    } catch (err) {
      console.log("Error from /lessons/${lessonId}/signup:", err)
    }
  }
  // const sendServerRequest = async () => {
  //   try {
  //     const res = await patchData(
  //       `http://localhost:3000/api/lessons/${lessonId}/signup`,
  //       {}
  //     )

  //     console.log(res)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleClick = () => {
    const data = generateData(order_id, amount, description)
    const signature = sha1Base64(
      import.meta.env.VITE_LIQPAY_SECRET_KEY +
        data +
        import.meta.env.VITE_LIQPAY_SECRET_KEY
    )

    processLiqPayPayment(
      data,
      signature,
      data => {
        console.log(data.status)
        const paymentData = {
          lessonId,
          status: data.status,
          amount: data.amount,
          paytype: data.paytype,
          end_date: data.end_date,
          order_id: data.order_id
        }
        sendServerRequest(paymentData)
      },
      () => console.log("Error")
    )
  }

  return (
    <div className={styles.wrapper}>
      <div id="#liqpay_checkout"></div>
      <button className={styles.payment_button} onClick={handleClick}>
        Pay
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  )
}

const sha1Base64 = str => {
  const sha1Hash = CryptoJS.SHA1(str)
  const base64Hash = CryptoJS.enc.Base64.stringify(sha1Hash)
  return base64Hash
}

const processLiqPayPayment = (data, signature, successCb, errorCb) => {
  ;(window.LiqPayCheckoutCallback = function() {
    LiqPayCheckout.init({
      data: data,
      signature: signature,
      embedTo: "#liqpay_checkout",
      language: "en",
      mode: "popup" // embed || popup
    })
      .on("liqpay.callback", function(data) {
        if (data.status === "success") successCb(data)
        else if (data.status === "error") errorCb()
        console.log("liqpay.callback", data)
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

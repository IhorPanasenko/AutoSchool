import styles from "./payment.module.scss"
import CryptoJS from "crypto-js"
import useFetch from "../../hooks/useFetch.js"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LessonInPayment from "./lessonInPayment/LessonInPayment"

const PaymentButton = () => {
  const { chosenLessonId } = useParams()
  console.log("chosenLessonId", chosenLessonId)
  const order_id = Date.now() // can be lessonId + studentId, should be unique
  const description = "Sign up for a lesson"
  const lessonId = `${chosenLessonId}`
  const [lesson, setLesson] = useState(null)
  const [amount, setAmount] = useState(null)

  const {
    data: lessonData,
    error: lessonError,
    patchData,
    postData,
    getData
  } = useFetch()
  // const { data: lessonData, error: lessonError } = useFetch()
  // `http://localhost:3000/api/lessons/${chosenLessonId}`

  // useEffect(() => {
  //   if (lessonData) {
  //     const lessonExist = lessonData.data?.lesson
  //     if (lessonExist) {
  //       setLesson(lessonData.data.lesson)
  //       setAmount(lessonExist.price)
  //       console.log("Lesson :", lessonData)
  //     }
  //   }
  // }, [lessonData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await getData(
          `http://localhost:3000/api/lessons/${chosenLessonId}`
        )
        console.log(res)
        console.log("res.data.lesson", res.data.lesson)
        console.log("price", res.data.price)

        setLesson(res.data.lesson)
        setAmount(res.data.lesson.price)
      } catch (err) {
        console.error("Failed to fetch lessonData", err)
      }
    }
    if (chosenLessonId && typeof getData === "function") {
      fetchData()
    }
  }, [chosenLessonId])

  if (!lesson || !amount) {
    return <div>Loading lesson data...</div>
  }

  if (lessonError) {
    return <div>Error loading lessons: {lessonError}</div>
  }
  if (!lesson) {
    return <div>Loading lesson data...</div>
  }
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

      console.log(res)
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

      console.log(res)
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
      {lesson.isAvailable ? (
        <>
          <div className={styles.lesson}>
            {lesson && <LessonInPayment lesson={lesson} />}
          </div>
          <div className={styles.btn}>
            <div id="#liqpay_checkout"></div>
            <button className={styles.payment_button} onClick={handleClick}>
              Pay
            </button>
          </div>
        </>
      ) : (
        <h2 className={styles.title}>
          Обране заняття вже заброньовано, поверніться на календар та оберіть
          інше заняття
        </h2>
      )}
    </div>
  )
}

const sha1Base64 = str => {
  const sha1Hash = CryptoJS.SHA1(str)
  const base64Hash = CryptoJS.enc.Base64.stringify(sha1Hash)
  return base64Hash
}

const processLiqPayPayment = (data, signature, successCb, errorCb, cb) => {
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

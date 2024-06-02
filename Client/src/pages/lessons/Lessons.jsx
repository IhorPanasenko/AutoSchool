import { myLessonsColumns } from "../../components/datatablesourseFront"
import MyLessons from "../../components/myLessons/MyLessons"
import Navbar from "../../components/navbar/Navbar"
import PaymentButton from "../../components/payment/Payment"

const Lessons = () => {
  return (
    <div>
      <Navbar />

      {/* <PaymentButton /> */}
      <MyLessons columns={myLessonsColumns} />
    </div>
  )
}

export default Lessons

import { Alert, notification } from "antd"

const Notification = (type, message, description, duration) => {
    notification[type]({
        message: message,
        description: description,
        duration: duration
    })
}
export default Notification;
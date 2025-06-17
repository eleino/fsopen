const Notification = (props) => {
    const { message, isError } = props.notify

    if (message === null) return null
    
    return (
        <div className={isError ? "error" : "message"}>
            {message}
        </div>
    )
}

export default Notification

const AddContact = (props) => {

    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input value={props.newName} onChange={props.onNameChange} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.onNumChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddContact;
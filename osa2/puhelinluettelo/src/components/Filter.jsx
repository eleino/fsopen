
const Filter = (props) => {

    return (
        <>
            Filter names with: <input value={props.value} onChange={props.onChange} />
        </>
    )
}

export default Filter;
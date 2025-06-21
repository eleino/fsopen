const Filter = ({ userInput, handleUserInput }) => {
    return (
        <p>Find countries
            <input type="text" value={userInput} onChange={handleUserInput} />
        </p>
    )
}
export default Filter
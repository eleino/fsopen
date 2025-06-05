import Person from "./Person"

const Persons = (props) => {
    const filterFor = props.filterFor
    const persons = props.persons
    return (
        <ul>
            {persons
                .filter(person => person.name.toLowerCase().includes(filterFor.toLowerCase()))
                .map((person) => {
                    return <Person key={person.name} name={person.name} number={person.number} />
                })}

        </ul>
    )
}

export default Persons;
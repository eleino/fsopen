import Person from "./Person"

const Persons = (props) => {
    const filterFor = props.filterFor
    const persons = props.persons
    const delPerson = props.deletePerson
    return (
        <ul>
            {persons
                .filter(person => person.name.toLowerCase().includes(filterFor.toLowerCase()))
                .map((person) => {
                    return <Person key={person.name} person={person} delPerson={delPerson} />
                })}

        </ul>
    )
}

export default Persons;
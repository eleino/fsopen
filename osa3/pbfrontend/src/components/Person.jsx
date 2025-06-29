const Person = (props) => {
    const person = props.person
    const delPerson = props.delPerson
    return (<li>{person.name} {person.number}<button onClick={() =>delPerson(person.id)}>X</button></li>)
}

export default Person;
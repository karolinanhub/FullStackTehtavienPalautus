const Persons = ({filteredPersons}) => {
    return (
        <ul style={{ listStyleType: 'none' }}> 
            {filteredPersons?.map((person) => (
            <li key={person.name}>
                {person.name + " "}{person.number}
            </li>
        ))}
        </ul>
    );
};

export default Persons  
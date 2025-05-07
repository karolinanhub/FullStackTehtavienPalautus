const Persons = ({filteredPersons, handleDelete}) => {
    return (
        <ul style={{ listStyleType: 'none' }}> 
            {filteredPersons?.map((person) => (
            <li key={person.id}>
                {person.name + " "}{person.number}
                <button style={{ marginLeft: '0.5em', padding:0}} 
                onClick={() => handleDelete(person)}>delete</button>
            </li>
        ))}
        </ul>
    );
};

export default Persons  


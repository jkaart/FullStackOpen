const Persons = ({ persons, deleteOnClick }) => (
  <>
    {persons.map(person => (<p key={person.id}>{person.name} {person.number} <button onClick={() => deleteOnClick({ id: person.id, name: person.name })}>delete</button></p>))}
  </>
)

export default Persons
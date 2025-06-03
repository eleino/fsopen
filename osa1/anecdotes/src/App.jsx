import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => new Array(anecdotes.length).fill(0))
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={addVote} text="Upvote this anecdote" />
      <Button onClick={handleClick} text="Generate next anecdote" />
      <Title text="Anecdote with the most votes" />
      <Anecdote text={anecdotes[votes.indexOf(Math.max(...votes))]}
        votes={Math.max(...votes)} />
    </div>
  )
}

const Title = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>{votes} votes</p>
  </div>
)

export default App
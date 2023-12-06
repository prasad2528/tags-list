import './index.css'

const TagsCard = props => {
  const {details} = props
  const {id, name, tag} = details
  return (
    <li className="item-card" key={id}>
      <p className="task">{name}</p>
      <p className="category">{tag}</p>
    </li>
  )
}
export default TagsCard

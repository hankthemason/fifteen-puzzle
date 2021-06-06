export const Cell = (props) => {

  const { value, onClick } = props

  return (
    <div className="cell" onClick={onClick} value={value}>
      {value}
    </div>
  )
}
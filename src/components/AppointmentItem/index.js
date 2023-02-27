import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarIcon} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starIcon = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarIcon = () => {
    toggleStarIcon(id)
  }

  return (
    <li className="list-items">
      <div className="title-container">
        <p className="title">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="star-btn"
          onClick={onClickStarIcon}
        >
          <img src={starIcon} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem

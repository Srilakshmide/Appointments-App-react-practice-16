import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFavoriteActive: false,
  }

  onClickFilter = () => {
    const {isFavoriteActive} = this.state
    this.setState({isFavoriteActive: !isFavoriteActive})
  }

  toggleStarIcon = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppoint => {
        if (id === eachAppoint.id) {
          return {...eachAppoint, isStarred: !eachAppoint.isStarred}
        }
        return eachAppoint
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeInputText = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateText = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilteredStarredItems = () => {
    const {appointmentList, isFavoriteActive} = this.state

    if (isFavoriteActive) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFavoriteActive} = this.state
    const filterStarBtnClassName = isFavoriteActive
      ? 'star-active-button'
      : 'favorite-btn'
    const filteredAppointmentList = this.getFilteredStarredItems()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointment-container">
            <div className="appointment-inputs">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label htmlFor="textInput">TITLE </label>

                <input
                  type="text"
                  className="title-input-box"
                  placeholder="Title"
                  id="textInput"
                  value={titleInput}
                  onChange={this.onChangeInputText}
                />
                <label htmlFor="dateInput">DATE</label>

                <input
                  type="date"
                  id="dateInput"
                  value={dateInput}
                  className="date-input-box"
                  onChange={this.onChangeDateText}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="appointment-data">
              <h1 className="appoint">Appointments</h1>
              <button
                type="button"
                className={filterStarBtnClassName}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>

            <ul className="item-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleStarIcon={this.toggleStarIcon}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments

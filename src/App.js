import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import TagsCard from './components/TagsCard'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    myTasksList: [],
    taskInput: '',
    selectTag: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  onChangeTaskInput = event => {
    const {taskInput} = this.state
    this.setState({taskInput: event.target.value})
    console.log(taskInput)
  }

  onChangeSelect = event => {
    this.setState({selectTag: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {taskInput, selectTag} = this.state
    const newItem = {
      id: uuid(),
      name: taskInput,
      tag: selectTag,
      bgColor: false,
    }
    console.log(newItem)
    if (taskInput.length !== 0) {
      this.setState(prevState => ({
        myTasksList: [...prevState.myTasksList, newItem],
        taskInput: '',
        selectTag: tagsList[0].optionId,
      }))
    }
  }

  onClickTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {myTasksList, activeTag, taskInput, selectTag} = this.state
    const filteredData =
      activeTag === 'INITIAL'
        ? myTasksList
        : myTasksList.filter(each => each.tag === activeTag)
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="left-card">
            <h1 className="left-heading">Create a task!</h1>
            <form className="form">
              <label htmlFor="task" className="labels">
                Task
              </label>
              <input
                type="text"
                className="inputs"
                id="task"
                value={taskInput}
                placeholder="Enter the task here"
                onChange={this.onChangeTaskInput}
              />
              <label htmlFor="tags" className="labels">
                Tags
              </label>
              <select
                id="tags"
                onChange={this.onChangeSelect}
                value={selectTag}
              >
                {tagsList.map(eachTag => (
                  <option
                    className="tag"
                    key={eachTag.optionId}
                    value={eachTag.optionId}
                  >
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
              <button
                className="button"
                type="submit"
                onClick={this.onSubmitForm}
              >
                Add Task
              </button>
            </form>
          </div>
          <div className="right-card">
            <div className="inner-card">
              <h1 className="heading">Tags</h1>
              <ul className="tags-list">
                {tagsList.map(eachTag => (
                  <li className="item" key={eachTag.optionId}>
                    <button
                      type="button"
                      className="tag-btn"
                      value={eachTag.optionId}
                      onClick={this.onClickTag}
                    >
                      {eachTag.displayText}
                    </button>
                  </li>
                ))}
              </ul>
              <h1 className="heading">Tasks</h1>
              {filteredData.length === 0 ? (
                <p className="para">No Tasks Added Yet</p>
              ) : (
                <ul className="tasks-list-container">
                  {filteredData.map(eachItem => (
                    <TagsCard key={eachItem.id} details={eachItem} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

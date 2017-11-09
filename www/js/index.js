const person = { name: 'as' }

const { name } = person

class Course extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            selectedUserName: null,
            inputValue: ''
        }

        fetch('/api/users')
            .then(response => {
                response.json().then(data => {
                    this.setState({
                        users: data,
                        selectedUserName: null,
                        inputValue: ''
                    })
                })
            })
    }

    selectUser(userName) {
        this.setState(prevState => {
            prevState.selectedUserName = userName
            return prevState
        })
    }

    deleteUser() {

        fetch(`/api/users?name=${this.state.selectedUserName}`, { method: 'delete' })
            .then(response => {
                alert('ok')
                let newUsers = this.state.users.filter(user => user.name !== this.state.selectedUserName)

                this.setState(prevState => {
                    return {
                        users: newUsers,
                        selectedUserName: null,
                        inputValue: prevState.inputValue
                    }
                })
            })
            .catch(e => {
                console.log(e)
                alert(':(')
            })
    }

    handleInputChange(value) {
        this.setState(prevState => {
            prevState.inputValue = value
            return prevState
        })
    }

    createUser() {
        let body = new FormData()

        fetch(`/api/users`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ baia: this.state.inputValue })
        })
            .then(response => {
                alert('Usuario creado')
                this.setState(prevState => {
                    prevState.users.push({ name: prevState.inputValue })

                    const newUsers = prevState.users

                    return {
                        users: newUsers,
                        selectedUserName: null,
                        inputValue: null
                    }
                })
            })
            .catch(e => {
                console.log(e)
                alert(':(')
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Curso</h1>

                <div className="row">
                    <div className="col s6">
                        <CreateUser
                            onInputChange={(value) => { this.handleInputChange(value) }}
                            onCreate={() => { this.createUser() }}
                        />

                    </div>
                    <div className="col s6">
                        <DeleteUser selectedUserName={this.state.selectedUserName} onDeleteUser={() => { this.deleteUser() }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <UsersList users={this.state.users} selectedUserName={this.state.selectedUserName}
                            onSelectUser={(userName) => {
                                this.selectUser(userName)
                            }} />
                    </div>
                </div>
            </div>
        )
    }
}

const UsersList = ({ users, selectedUserName, onSelectUser }) => {

    const selectUser = (userName) => {
        onSelectUser(userName)
    }

    return (
        <ul className="collection">
            {users.map(user => {
                return (
                    <a className={user.name === selectedUserName ? 'collection-item active' : 'collection-item'}>
                        <User name={user.name} onSelectUser={selectUser} />
                    </a>
                )
            })}
            {/* <User name={props.user.name} /> */}
        </ul>
    )
}

const User = ({ name, onSelectUser }) => {
    return (
        <div onClick={() => { onSelectUser(name) }}> {name} </div>
    )
}

const CreateUser = ({ onInputChange, onCreate }) => {

    return (
        <form>
            <div className="row">
                <div className="col s8">
                    <input
                        type="text"
                        name="user"
                        onChange={event => { onInputChange(event.target.value) }}
                    />
                </div>

                <div className="col s4">
                    <button className="waves-effect waves-light btn" type="button" onClick={() => onCreate()}>
                        Crear
                    </button>
                </div>

            </div>
        </form>
    )
}

const DeleteUser = ({ selectedUserName, onDeleteUser }) => {
    return (
        <div>
            {selectedUserName ? <button onClick={onDeleteUser} className="waves-effect waves-light btn"> Borrar </button> : ''}
        </div>
    )
}

ReactDOM.render(<Course />, document.getElementById('root'))
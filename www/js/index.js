const person = { name: 'as' }

const { name } = person


class Course extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [
                { name: 'Carlos' },
                { name: 'Jessica' },
                { name: 'Estrada' },
                { name: 'Miguel' },
                { name: 'Alan' },
                { name: 'Alberto' },
                { name: 'Hiram' },
                { name: 'Ricardo' }
            ],
            selectedUserName: null
        }
    }

    selectUser(userName) {
        this.setState(prevState => {
            prevState.selectedUserName = userName
            return prevState
        })
    }

    deleteUser() {
        let newUsers = this.state.users.filter(user => user.name !== this.state.selectedUserName)

        this.setState({
            users: newUsers,
            selectedUserName: null
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Curso</h1>

                <div className="row">
                    <div className="col s6">
                        <CreateUser />

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

const CreateUser = props => {

    const addUser = () => {
        alert('Crear usuario')
    }

    return (
        <form>
            <div className="row">
                <div className="col s8">
                    <input type="text" name="user" />
                </div>

                <div className="col s4">
                    <button className="waves-effect waves-light btn" type="button" onClick={() => addUser()}>
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
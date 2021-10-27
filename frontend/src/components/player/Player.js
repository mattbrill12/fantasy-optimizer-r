function Player({ name, salary, value, position }) {
    return (
        <div className="border">
            <div className="d-flex">{name}</div>
            <div className="d-flex p-2">
                <ul>
                    <li>{salary}</li>
                    <li>{value}</li>
                    <li>{position}</li>
                </ul>
            </div>
        </div>
    )
}

export default Player;
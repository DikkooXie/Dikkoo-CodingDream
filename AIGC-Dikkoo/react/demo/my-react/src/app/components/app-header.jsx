const AppHeader = (props) => {
    // const name = 'React Demo';
    const { name } = props;
    return (
        <div className="app-header">
            <h1 className="title">{name}</h1>
        </div>
    )
}

export default AppHeader;
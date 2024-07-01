
const AppHeader = (props) => { // 传入props对象
    const { name } = props; // 解构赋值

    return (
        <header>
            <h1>Hello {name}</h1>
        </header>
    )
};

export default AppHeader;
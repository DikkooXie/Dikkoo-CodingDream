export default function Progress({ text, percentage }) {
    percentage = percentage ?? 0; // ES6+ 语法： ?? 空值合并运算符，如果percentage为null或undefined，则使用0
    // 本质上是三元运算符的简写，当percentage为null或undefined时，使用0，否则使用percentage

    return (
        <div className="progress-container">
            <div    
                className="progress-bar"
                style={{'width': `${percentage}%`}}
            >
            {text} {`${percentage.toFixed(2)}%`}
            </div>
        </div>
    )

}
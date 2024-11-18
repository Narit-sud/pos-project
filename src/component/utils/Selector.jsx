function Selector(props) {
    const {
        value = "",
        text = "Select",
        options = [],
        style = "",
        id = "",
        onChange = () => {
            console.log("please add onChange handler function");
        },
    } = props;
    return (
        <select
            id={id}
            value={value}
            className={`${style} text-center`}
            onChange={onChange}
        >
            <option value="">{text}</option>
            {options.map((option) => {
                return (
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                );
            })}
        </select>
    );
}

export default Selector;

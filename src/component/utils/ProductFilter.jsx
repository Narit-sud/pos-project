function ProductFilter(props) {
    const {
        text = "All",
        style = "m-1 flex-grow border text-center text-sm",
        value,
        options,
        onChange,
        name,
    } = props;
    return (
        <select className={style} value={value} onChange={onChange} name={name}>
            <option value="">{text}</option>
            {options.map((item) => {
                return (
                    <option value={item.name} key={item.id}>
                        {item.name}
                    </option>
                );
            })}
        </select>
    );
}

export default ProductFilter;

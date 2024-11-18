function ProductDisplayItemOption(props) {
    const { option } = props;
    return (
        <div>
            <div className="grid grid-cols-3 place-items-center">
                <span>{option.name}</span>
                <span>{option.price}</span>
                <span>{option.cost}</span>
            </div>
        </div>
    );
}

export default ProductDisplayItemOption;

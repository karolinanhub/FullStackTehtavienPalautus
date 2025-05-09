const Filter = ({handleFilterChange}) => {
    return (
        <div>
        find countries
            <input onChange={handleFilterChange}></input>
        </div>
    );
};   

export default Filter
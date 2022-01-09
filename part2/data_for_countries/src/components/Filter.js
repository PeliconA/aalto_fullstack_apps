//import react from "react";

const Filter = ({value, eventHandler}) => {
    return(
        <div>
            find countries <input
                            value={value}
                            onChange={eventHandler}
                            />
        </div>
    )
}

export default Filter;
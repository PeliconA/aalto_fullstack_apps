import react from "react";

const Filter = ({value, eventHandler}) => {
  return(
      <div>
      filter shown with <input
                          value={value} 
                          onChange={eventHandler} 
                        />
    </div>
  )
}

export default Filter;
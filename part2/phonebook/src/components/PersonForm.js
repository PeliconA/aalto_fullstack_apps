import React from 'react';

const PersonForm = (props) => {
    return(
      <form onSubmit={props.addNameEventHandler}>
        <div>
          name: <input 
                  value={props.name}
                  onChange={props.nameChangeEventHandler}
                />
        </div>
        <div>
          number: <input 
                    value={props.number}
                    onChange={props.numberChangeEventHandler}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm
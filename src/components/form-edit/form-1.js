import React, { Fragment } from 'react';

const Form = ({ input, isedit, DeleteInput }) => {

  return (
    <form style={{ maxWidth: '500px', margin: 'auto' }}>
      {
        input && input.map(item => {
          return <div key={item.id} className="input-group">
            <input type="text" placeholder={item.placeholder} className="form-control my-2" />
            {
              isedit ?
                <Fragment>
                  <button onClick={() => { DeleteInput(item.id) }} type="button">Delete</button>
                </Fragment>
                : null}
          </div>
        })
      }
      <input type="submit" />
    </form>
  )
}

export default Form;
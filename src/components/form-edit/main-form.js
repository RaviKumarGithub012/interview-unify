import React, { useState, Fragment } from 'react';
import Form from './form-1';



const MainForm = () => {

  const [inputData, setinputData] = useState([
    { id: 1, placeholder: 'field-1' },
    { id: 2, placeholder: 'field-2' },
    { id: 3, placeholder: 'field-3' },
    { id: 4, placeholder: 'field-4' }
  ]);

  const [isedit, setisedit] = useState(false);

  const tab2 = () => {
    setisedit(true);
  }

  const DeleteInput = id => {
    console.log(id);
    // setinputData(inputData.filter(item => item !== id));
  }

  return (
    <Fragment>

      <div className="text-center mt-3">
        <button>Tab 1</button>
        <button onClick={tab2}>Tab 2</button>
        <button>Tab 3</button>
      </div>

      <Form input={inputData} isedit={isedit} DeleteInput={DeleteInput} />
    </Fragment>
  );
}

export default MainForm;
import React, { useState, useEffect } from 'react';
import { Button, Container, FormHelperText } from '@mui/material';
import Element from './components/Element';
import { FormContext } from './FormContext';
import formJSON from './formElement.json';

function App() {
  const [elements, setElements] = useState(null);

  useEffect(() => {
    setElements(formJSON[0]);
  }, []);

  const { fields, page_label } = elements ?? {};
  const [additionalFields, setAdditionalFields] = useState([]); // State for dynamically added fields

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log([...fields, ...additionalFields]); // Combine static and dynamic fields
  };

  const handleChange = (id, event) => {
    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
            break;
          default:
            field['field_value'] = event.target.value;
            break;
        }
      }
    });
    setElements(newElements);
  };

  const handleAddField = () => {
    // You can customize the new field as needed
    const newField = {
      field_id: `dynamic_${additionalFields.length + 1}`,
      field_label: `Dynamic Field ${additionalFields.length + 1}`,
      field_type: 'text',
      field_value: '',
    };
    setAdditionalFields([...additionalFields, newField]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  return (
    <div className="App" sx={{ backgroundColor: 'red', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 20px 0px rgba(255, 0, 0, 0.5)' }}>
      <FormContext.Provider value={{ handleChange }}>
        <Container sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 20px 0px rgba(255, 0, 0, 0.5)' }}>
          <h3>{page_label}</h3>
          <form>
            {fields ? fields.map((field, i) => <Element key={i} field={field} />) : null}
            
            {/* Render dynamically added fields */}
            {additionalFields.map((field, index) => (
              <Element key={`dynamic_${index}`} field={field} />
            ))}

            <FormHelperText id="emailHelp">
              We'll never share your email with anyone else.
            </FormHelperText>


            <Button
  variant="contained"
  color="primary"
  type="submit"
  onClick={(e) => handleSubmit(e)}
  sx={{ marginTop: '10px' }} // Add margin to the submit button
>
  Submit
</Button>

{/* Buttons for adding and removing fields */}
<Button variant="outlined" color="secondary" onClick={handleAddField} sx={{ margin: '10px' }}>
  Add Field
</Button>
{additionalFields.map((_, index) => (
  <Button key={index} variant="outlined" color="secondary" onClick={() => handleRemoveField(index)} sx={{ margin: '10px' }}>
    Remove Field {index + 1}
  </Button>
))}
          </form>
        </Container>
      </FormContext.Provider>
    </div>
  );
}

export default App;








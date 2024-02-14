import React, { useState } from 'react';
import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';

const FormContainer = styled.div`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px; 
  &:hover {
    background-color: #0056b3;
  }
`;

const TaskForm = ({ onSubmit, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !dueDate.trim()) return;
    onSubmit({
      id: uuidv4(),
      Task: taskName.trim(),
      Due_Date: dueDate.trim(),
    });
    setTaskName('');
    setDueDate('');
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Label>Task Name:</Label>
        <Input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Label>Due Date:</Label>
        <Input
          type="text"
          placeholder='DD-MMM-YYYY'
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div style={{ flexDirection: "column"}}>
          <Button type="submit">Add Task</Button>
          <Button type="button" onClick={handleClose}>Close</Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default TaskForm;

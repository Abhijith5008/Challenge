import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { columnsFromBackend } from './DummyData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const Container = styled.div`
  display: flex;
  position: relative;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  margin-left: 100px;
  margin-top: 20px; 
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const AddTaskFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

const AddTaskButton = styled.button`
  padding: 10px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Title = styled.span`
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
  color: ${props => {
        if (props.status === 'Added') return '#800080';
        if (props.status === 'Started') return '#ff9d00';
        if (props.status === 'Completed') return '#008000';
        return '#10957d';
    }};
  background: ${props => {
        if (props.status === 'Added') return 'rgba(128, 0, 128, 0.15)';
        if (props.status === 'Started') return 'rgba(255, 255, 0, 0.15)';
        if (props.status === 'Completed') return 'rgba(0, 128, 0, 0.15)';
        return 'rgba(16, 149, 125, 0.15)';
    }};
`;


const Tasks = () => {

    const [columns, setColumns] = useState(() => {
        const storedColumns = localStorage.getItem('columnsFromBackend');
        return storedColumns ? JSON.parse(storedColumns) : columnsFromBackend;
    });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        localStorage.setItem('columnsFromBackend', JSON.stringify(columns));
    }, [columns]);

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    const handleAddTask = (newTask) => {
        setColumns((prevColumns) => {
            const updatedColumns = { ...prevColumns };
            updatedColumns[Object.keys(updatedColumns)[0]].items.push(newTask);
            return updatedColumns;
        });
        setShowForm(false);
    };

    return (
        <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
            <h1>DataSeer Challenge</h1>
            <Container>
                <TaskColumnStyles>
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <Droppable key={columnId} droppableId={columnId}>
                                {(provided, snapshot) => (
                                    <TaskList
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <Title status={column.title}>{column.title}</Title>
                                        {column.items.map((item, index) => (
                                            <TaskCard key={item} item={item} index={index} />
                                        ))}
                                        {provided.placeholder}
                                    </TaskList>
                                )}
                            </Droppable>
                        );
                    })}
                </TaskColumnStyles>
            </Container>
            {showForm && (
                <AddTaskFormContainer>
                    <TaskForm onSubmit={handleAddTask} onClose={() => setShowForm(false)} />
                </AddTaskFormContainer>
            )}
            {!showForm && (
                <div style={{ position: "absolute", top: "4%", left: "8%" }}>
                    <AddTaskButton onClick={() => setShowForm(true)}>Add Task</AddTaskButton>
                </div>
            )}
        </DragDropContext>
    );
};

export default Tasks;

import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    id: '1',
    Task: 'Challenge Started',
    Due_Date: '13-Feb-2024',
  },
];

export const columnsFromBackend = {
  [uuidv4()]: {
    title: 'Added',
    items: [],
  },
  [uuidv4()]: {
    title: 'Started',
    items: data,
  },
  [uuidv4()]: {
    title: 'Completed',
    items: [],
  },
};

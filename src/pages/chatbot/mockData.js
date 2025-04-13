import { v4 as uuidv4 } from 'uuid';

export const presetQA = {
  "what is project list?": "The project list is a collection of tasks and summary associated with a particular goal or objective.",
  "how to save task?": "Click the 'Save Task' button on the top right to store your task. For now, this will show a confirmation toast.",
  "can I rename folders?": "Yes, click the three-dot menu and select 'Rename' to modify folder names.",
  "how to delete chat?": "Click the 3 dots beside the chat name and choose 'Delete'."
};

export const initialChats = [
  { id: uuidv4(), name: "General Discussion", type: 'chat' },
  {
    id: uuidv4(),
    name: "Project Alpha",
    type: 'folder',
    isOpen: false,
    children: [
      { id: uuidv4(), name: "Alpha Planning", type: 'chat' },
      { id: uuidv4(), name: "Alpha UI Design", type: 'chat' },
    ]
  },
  { id: uuidv4(), name: "Meeting summary", type: 'chat' },
  {
    id: uuidv4(),
    name: "Archived",
    type: 'folder',
    isOpen: false,
    children: [
      { id: uuidv4(), name: "Old Feature X", type: 'chat' },
    ]
  },
];
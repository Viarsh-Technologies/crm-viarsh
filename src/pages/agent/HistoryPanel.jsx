import React from 'react';
import HistoryItem from './HistoryItem';
import { FaRedo } from 'react-icons/fa';

function HistoryPanel({ historyItems }) {

  return (
    <div className="p-4 space-y-2 ">
     
      {historyItems.length === 0 && (
        <p className="text-gray-500">No history yet.</p>
      )}
      {historyItems.map((item) => (
        <HistoryItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default HistoryPanel;
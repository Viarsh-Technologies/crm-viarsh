import React from 'react';
import HistoryItem from './HistoryItem';

function HistoryPanel({ historyItems }) {

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">History</h2>
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
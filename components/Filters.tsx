interface FiltersProps {
  onFilterChange: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex gap-4 mb-4 mt-4">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Severities</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="text"
        placeholder="Search IOC..."
        onChange={(e) => onFilterChange(e.target.value)}
        className="p-2 border rounded-md shadow-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Filters;

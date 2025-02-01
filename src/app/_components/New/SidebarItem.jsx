export function SidebarItem({ icon, label, active = false, soon = false }) {
  return (
    <button
      className={`
        flex gap-2.5 justify-between items-center px-5 py-4 mt-2.5 w-full 
        min-h-[54px] rounded-lg transition-all 
        ${active ? 'bg-sky-50 border-l-4 border-sky-600' : ''}
        hover:border-l-4 hover:border-sky-300 hover:bg-sky-100
      `}
    >
      <div className="flex gap-2.5 items-center">
        <img
          src={icon}
          alt=""
          className="object-contain w-6 h-6"
        />
        <span className="text-sky-950 font-medium">{label}</span>
      </div>
      {soon && (
        <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
          Soon
        </span>
      )}
    </button>
  );
}

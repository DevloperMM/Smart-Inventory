function WelcomeCard({ title, description, icon }) {
  return (
    <div className="bg-gray-50 hover:bg-teal-50 border border-gray-200 rounded-lg p-8 transition shadow-sm hover:shadow-md grid grid-cols-1 align-center gap-4 min-h-3xl">
      <div className="flex flex-row">
        <span className="text-teal-600">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800 ml-4">{title}</h3>
      </div>

      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default WelcomeCard;

import React from "react";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">IT Inventory</h2>
      <nav className="space-y-3">
        {["Dashboard", "Assets", "Consumables", "Transactions"].map((item) => (
          <a
            key={item}
            href={`/${item.toLowerCase()}`}
            className="block px-3 py-2 rounded hover:bg-gray-200"
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

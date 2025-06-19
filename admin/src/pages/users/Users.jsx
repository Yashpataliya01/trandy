import React, { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Emma Carter",
    email: "emma.carter@email.com",
    country: "USA",
    status: "Active",
    visitedAt: "2025-06-18 12:45 PM",
  },
  {
    id: 2,
    name: "James Holden",
    email: "james.h@email.com",
    country: "UK",
    status: "Guest",
    visitedAt: "2025-06-17 9:30 PM",
  },
  {
    id: 3,
    name: "Ava Singh",
    email: "ava.singh@email.com",
    country: "India",
    status: "Active",
    visitedAt: "2025-06-16 5:15 PM",
  },
  {
    id: 4,
    name: "Lucas Zhu",
    email: "lucas.z@email.com",
    country: "Canada",
    status: "Guest",
    visitedAt: "2025-06-15 8:45 AM",
  },
];

const Users = () => {
  const [search, setSearch] = useState("");

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-[#fdfdfb] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            Website Visitors
          </h2>
          <input
            type="text"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:border-black transition"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Visited</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-gray-700">{user.country}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {user.visitedAt}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400 italic"
                  >
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Users;

import React from 'react';

const Home = () => {
  const auth = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome</h1>
        {auth ? (
          <p className="text-lg text-gray-700">
            Hello, <span className="font-semibold">{auth.email}</span>!
          </p>
        ) : (
          <p className="text-lg text-gray-700">
            User not found. Please <a href="/login" className="text-blue-500 hover:underline">log in</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;

const LoginModal = ({ onLogin }) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
    <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-sm shadow-2xl">
      <h2 className="text-2xl font-black mb-6">Enter the Marketplace</h2>
      <form onSubmit={onLogin} className="space-y-4">
        <input 
          name="username"
          type="text" 
          placeholder="Username" 
          className="w-full p-4 bg-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          required 
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold">
          Start Swapping
        </button>
      </form>
    </div>
  </div>
);
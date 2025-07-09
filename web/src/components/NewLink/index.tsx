export default function NewLinkComponent() {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:w-1/3 self-start">
        <h2 className="text-xl font-semibold mb-4">Novo link</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">LINK ORIGINAL</label>
          <input
            type="text"
            placeholder="linkedin.com/in/myprofile"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">LINK ENCURTADO</label>
          <div className="flex items-center">
            <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-4 py-2">brev.ly/</span>
            <input
              type="text"
              placeholder="Linkedin-Profile"
              className="flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
          Salvar link
        </button>
      </div>
    </>
  )
}
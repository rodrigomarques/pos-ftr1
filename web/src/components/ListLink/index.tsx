import { FiCopy, FiDownload, FiTrash2 } from "react-icons/fi";

export default function ListLink() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:w-2/3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Meus links</h2>
        <button className="flex bg-gray-200 p-2  items-center gap-2 text-gray-800 hover:text-indigo-800">
          <FiDownload className="text-lg" />
          <span>Exportar</span>
        </button>
      </div>

      {/* Link 1 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-indigo-600">brev.ly/Portfolio-Dev</h3>
          <div className="flex gap-2 items-center">
            <div className="text-sm text-gray-500 mr-3">
              <span>347 acessos</span>
            </div>
            <button className="bg-gray-200 p-2 text-gray-800 hover:text-indigo-600">
              <FiCopy className="text-lg" />
            </button>
            <button className="bg-gray-200 p-2 text-gray-800 hover:text-red-600">
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">dexsite.portfolio.com.br/devname-123456</p>
      </div>

      {/* Link 2 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-indigo-600">brev.ly/Linkedin-Profile</h3>
          <div className="flex gap-2">
            <button className="bg-gray-200 p-2 text-gray-800 hover:text-indigo-600">
              <FiCopy className="text-lg" />
            </button>
            <button className="bg-gray-200 p-2 text-gray-800 hover:text-red-600">
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">linkedin.com/in/myp</p>
        <div className="text-sm text-gray-500">
          <span>18 acessos</span>
        </div>
      </div>

      {/* Link 3 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-indigo-600">brev.ly/Github-Project</h3>
          <div className="flex gap-2">
            <button className="text-gray-500 hover:text-indigo-600">
              <FiCopy className="text-lg" />
            </button>
            <button className="text-gray-500 hover:text-red-600">
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">github.com/devname/project-name-v2</p>
      </div>

      {/* Link 4 */}
      <div className="mb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-indigo-600">brev.ly/Figma-Encurtador-de-Links</h3>
          <div className="flex gap-2">
            <button className="text-gray-500 hover:text-indigo-600">
              <FiCopy className="text-lg" />
            </button>
            <button className="text-gray-500 hover:text-red-600">
              <FiTrash2 className="text-lg" />
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-4">figma.com/design/file/Encurtador-de-Links</p>
        <div className="text-sm text-gray-500">
          <span>53 acessos</span>
        </div>
      </div>
    </div>
  )
}
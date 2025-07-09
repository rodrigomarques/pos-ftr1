import { FiCopy, FiDownload, FiTrash2 } from "react-icons/fi";
import { useUrls } from "./useLinks";
import Loading from "../Loading";

export default function ListLink() {
  const { data, isLoading, error } = useUrls();

  if (isLoading) return (
    <div className="w-full bg-white py-3 rounded-md font-semibold transition">
      <Loading label="Carregando links" classValues="!text-indigo-600" />
    </div>
  );
  if (error) return <p>Erro ao buscar os LINKS.</p>;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:w-2/3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Meus links</h2>
        <button className="flex bg-gray-200 p-2  items-center gap-2 text-gray-800 hover:text-indigo-800">
          <FiDownload className="text-lg" />
          <span>Exportar</span>
        </button>
      </div>

      {data && data.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="mb-4">Nenhum link encontrado.</p>
          <p className="text-sm">Crie um novo link para começar.</p>
        </div>
      )}

      {data && data.map((link) => (
        <div className="mb-6 pb-6 border-b border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-indigo-600">brev.ly/{link.shortUrl}</h3>
            <div className="flex gap-2 items-center">
              <div className="text-sm text-gray-500 mr-3">
                <span>{countAcessos(link.accessCount)}</span>
              </div>
              <button className="bg-gray-200 p-2 text-gray-800 hover:text-indigo-600">
                <FiCopy className="text-lg" />
              </button>
              <button className="bg-gray-200 p-2 text-gray-800 hover:text-red-600">
                <FiTrash2 className="text-lg" />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{link.originalUrl}</p>
        </div>
      ))}
    </div>
  )
}

function countAcessos(acessos: number) {
  if (acessos <= 1) {
    return acessos + " acesso"
  }
  return acessos + " acessos"
}
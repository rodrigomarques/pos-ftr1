import { FiCopy, FiDownload, FiTrash2 } from "react-icons/fi";
import { useUrls, type LinkItem } from "./useLinks";
import Loading from "../Loading";
import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { toast } from "react-toastify";
import { queryClient } from "../../lib/react-query";
import { useState } from "react";
import { env } from "../../env";

export default function ListLink() {
  const { data, isLoading, error } = useUrls();
  const [isRemoveLoading, setRemoveLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: async (data: LinkItem) => {
      return await api.delete(`links/${data.shortUrl}`)
    },
    onSuccess: () => {
      toast.success('Link deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['list-urls'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error)
      toast.error(error.response?.data.error || 'Erro ao excluir o link. Por favor, tente novamente.');
    },
  });

  if (isLoading) return (
    <div className="w-full bg-white py-3 rounded-md font-semibold transition">
      <Loading label="Carregando links" classValues="!text-indigo-600" />
    </div>
  );
  if (error) return <p>Erro ao buscar os LINKS.</p>;

  const handlerDelete = (link: LinkItem) => {
    if (confirm('Você tem certeza que deseja excluir este link?')) {
      mutation.mutate(link);
    }
  };

  const hanlderExport = async () => {
    try {
      setRemoveLoading(true)
      await new Promise(resolve => setTimeout(resolve, 5000));
      const result = await api.get(`links/export`)
      if (!result.data || !result.data.url) {
        setRemoveLoading(false)
        toast.error('Nenhum link encontrado para exportar.');
        return
      }

      const link = result.data.url;
      console.log(link)
      if (!link) {
        setRemoveLoading(false)
        toast.error('Erro ao gerar o link de exportação.');
        return;
      }
      const a = document.createElement('a');
      a.href = link;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setRemoveLoading(false)
    } catch (error) {
      setRemoveLoading(false)
      console.error('Erro ao exportar links:', error);
      toast.error('Erro ao exportar links. Por favor, tente novamente.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:w-2/3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Meus links</h2>
        <button
          onClick={() => hanlderExport()}
          className="flex bg-gray-200 p-2 items-center gap-2 text-gray-800 hover:text-indigo-400 cursor-pointer"
        >
          {isRemoveLoading && <Loading classValues="!text-indigo-400" label="" />}
          <FiDownload className="text-lg" />
          <span>Exportar</span>
        </button>
      </div>

      <div
        className="max-h-[500px] overflow-y-auto pr-2"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#6366f1 #e5e7eb",
        }}
      >
        {data && data.length === 0 && (
          <div className="text-center text-gray-500">
            <p className="mb-4">Nenhum link encontrado.</p>
            <p className="text-sm">Crie um novo link para começar.</p>
          </div>
        )}

        {data && data.map((link) => (
          <div className="mb-6 pb-6 border-b border-gray-200" key={link.id}>
            <div className="flex justify-between items-start mb-2">
              <a
                href={`${env.VITE_FRONTEND_URL}${link.shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-indigo-600 hover:underline cursor-pointer"
              >
                {env.VITE_FRONTEND_URL}{link.shortUrl}
              </a>
              <div className="flex gap-2 items-center">
                <div className="text-sm text-gray-500 mr-3">
                  <span>{countAcessos(link.accessCount)}</span>
                </div>
                <button
                  className="bg-gray-200 p-2 text-gray-800 hover:text-indigo-400"
                  onClick={() => {
                    navigator.clipboard.writeText(`${env.VITE_FRONTEND_URL}${link.shortUrl}`);
                    toast.success('Link copiado para a área de transferência!');
                  }}
                >
                  <FiCopy className="text-lg cursor-pointer" />
                </button>
                <button onClick={() => handlerDelete(link)} className="bg-gray-200 p-2 text-gray-800 hover:text-red-600">
                  <FiTrash2 className="text-lg cursor-pointer" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{link.originalUrl}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function countAcessos(acessos: number) {
  if (acessos <= 1) {
    return acessos + " acesso"
  }
  return acessos + " acessos"
}
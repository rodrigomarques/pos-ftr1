import { useEffect, useState } from 'react'
import Logo from '../../components/Logo';
import api from '../../services/api';
import NotFound from '../NotFound';

export default function RedirectPage({ shortCode }: { shortCode?: string }) {

  const [originalPage, setOriginalPage] = useState<string>("#");
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (!shortCode) {
      return;
    }

    const fetchOriginalPage = async () => {
      try {
        const increment = await api.get(`links/${shortCode}/increment`)
        console.log(increment.data)

        if (increment.data.link && increment.data.link.originalUrl) {
          setOriginalPage(increment.data.link.originalUrl);
          setIsError(false);
        } else {
          setIsError(true);
          console.error('Link not found or invalid response structure');
        }
      } catch (error) {
        setIsError(true);
        console.error('Error fetching original page:', error);
      }
    };

    fetchOriginalPage();
  }, [shortCode])

  useEffect(() => {
    if (!originalPage || originalPage === "#") {
      return;
    }

    window.location.href = originalPage;
  }, [originalPage])

  if (isError) {
    return <NotFound />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-10 text-center max-w-md w-full">
        <div className="flex justify-center ">
          <Logo width={64} height={64} />

        </div>
        <h1 className="text-2xl font-semibold mb-2">Redirecionando...</h1>
        <p className="text-gray-600">O link será aberto automaticamente em alguns instantes.</p>
        <p className="mt-4 text-sm text-gray-500">
          Não foi redirecionado? <a href={originalPage} className="text-blue-600 hover:underline">Acesse aqui</a>
        </p>
      </div>
    </div>
  )
}
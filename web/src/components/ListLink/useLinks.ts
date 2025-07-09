import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';

type LinkItem = {
  id: string;
  shortUrl: string;
  originalUrl: string;
  accessCount: number;
  createdAt: string;
  updatedAt: string;
};

export function useUrls() {
  return useQuery<LinkItem[]>({
    queryKey: ['list-urls'],
    queryFn: async () => {
      const res = await api.get('/links');
      console.log(res)
      return res.data.links || [];
    },
  });
}

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Loading from "../Loading";
import api from "../../services/api";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { queryClient } from "../../lib/react-query";

const schema = z.object({
  originalLink: z.string().url({ message: "Insira uma URL válida" }),
  shortLink: z.string().min(1, "Campo obrigatório"),
});

type FormData = z.infer<typeof schema>;

export default function NewLinkComponent() {

  useEffect(() => {
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await api.post("links", {
        url: data.originalLink,
        shortCode: data.shortLink,
      })
    },
    onSuccess: () => {
      toast.success('Link salvo com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['list-urls'] });
      reset()
    },
    onError: (error: any) => {
      toast.error(error.response?.data.error || 'Erro ao salvar o link. Por favor, tente novamente.');
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 md:w-1/3 self-start">
        <h2 className="text-xl font-semibold mb-4">Novo link</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">LINK ORIGINAL</label>
            <input
              type="text"
              placeholder="linkedin.com/in/myprofile"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              {...register("originalLink")}
            />
            {errors.originalLink && (
              <span className="text-red-500 text-sm">{errors.originalLink.message}</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">LINK ENCURTADO</label>
            <div className="flex items-center">
              <span className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-4 py-2">brev.ly/</span>
              <input
                type="text"
                placeholder="Linkedin-Profile"
                className="flex-1 border border-gray-300 rounded-r-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                {...register("shortLink")}
              />
            </div>
            {errors.shortLink && (
              <span className="text-red-500 text-sm">{errors.shortLink.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
            disabled={isSubmitting || mutation.isPending}
          >
            {mutation.isPending ? (
              <Loading />
            ) : "Salvar link"}
          </button>
        </form>
      </div>
    </>
  );
}


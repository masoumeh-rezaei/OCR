import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubUser } from "@/lib/api/auth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

/**
 * Custom hook to delete a sub-user using React Query.
 * @param onSuccessCallback Optional callback when delete is successful (e.g., close modal).
 */
export function useDeleteSubUser(onSuccessCallback?: () => void) {
    const queryClient = useQueryClient();

    const mutation = useMutation<void, AxiosError<{ msg: string }>, string>({
        mutationFn: (id: string) => deleteSubUser(id),
        onSuccess: () => {
            toast.success("Sub-user deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["subusers"] });
            onSuccessCallback?.();
        },
        onError: (error) => {
            const message = error.response?.data?.msg || "Failed to delete sub-user";
            toast.error(message);
        },
    });

    return {
        deleteSubUser: mutation.mutate,
        isDeleting: mutation.isPending,
    };
}

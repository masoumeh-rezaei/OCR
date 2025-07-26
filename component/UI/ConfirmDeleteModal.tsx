import * as Dialog from "@radix-ui/react-dialog";
import { X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDeleteModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    loading?: boolean;
}

export function ConfirmDeleteModal({
                                       open,
                                       onOpenChange,
                                       onConfirm,
                                       title = "Delete Item",
                                       description = "Are you sure you want to delete this item? This action cannot be undone.",
                                       loading = false,
                                   }: ConfirmDeleteModalProps) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.3 }}
                                className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-2xl space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <Dialog.Title className="text-lg font-semibold text-zinc-800 dark:text-white">
                                        {title}
                                    </Dialog.Title>
                                    <Dialog.Close asChild>
                                        <button className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition">
                                            <X size={20} />
                                        </button>
                                    </Dialog.Close>
                                </div>

                                <Dialog.Description className="text-sm text-zinc-600 dark:text-zinc-300">
                                    {description}
                                </Dialog.Description>

                                <div className="flex justify-end gap-2 pt-4">
                                    <Dialog.Close asChild>
                                        <button className="px-4 py-2 text-sm font-medium border border-zinc-300 dark:border-zinc-700 rounded-md text-zinc-700 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                                            Cancel
                                        </button>
                                    </Dialog.Close>
                                    <button
                                        onClick={onConfirm}
                                        disabled={loading}
                                        className={cn(
                                            "px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center gap-2 transition",
                                            loading && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <Trash2 size={16} />
                                        {loading ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}

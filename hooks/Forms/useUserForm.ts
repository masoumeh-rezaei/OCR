import React, { useState } from "react";
import { useRouter } from "next/navigation"; // ✅
import { z } from "zod";
import { addSubUser } from "@/lib/api/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";

const SubUserSchema = z
    .object({
        email: z.string().email({ message: "email_invalid" }),
        password: z.string().min(6, { message: "password_required" }),
        confirm: z.string().min(6, { message: "confirm_required" }),
        name: z.string().optional().default(""),
        last_name: z.string().optional().default(""),
        position: z.string().optional().default(""),
        role: z.enum(["viewer", "editor"], { message: "role_required" }),
    })
    .refine((data) => data.password === data.confirm, {
        path: ["confirm"],
        message: "passwords_mismatch",
    });

type SubUserForm = z.infer<typeof SubUserSchema>;

export function useUserForm() {
    const t = useTranslations("form");
    const router = useRouter();

    const [form, setForm] = useState<SubUserForm>({
        email: "",
        password: "",
        confirm: "",
        name: "",
        last_name: "",
        position: "",
        role: "viewer",
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFormErrors({ ...formErrors, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = SubUserSchema.safeParse(form);

        if (!result.success) {
            const errors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                const field = err.path[0];
                if (typeof field === "string") {
                    errors[field] = t(err.message);
                }
            });
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
        }

        setFormErrors({});

        try {
            const res = await addSubUser(form);
            toast.success(t("success"));
            router.push("/user");
        } catch (err) {
            const error = err as AxiosError<{ msg?: string }>;
            const msg = error.response?.data?.msg || t("fail");
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        formErrors,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
}

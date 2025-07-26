"use client";

import FloatingInput from "@/component/UI/FloatingInput";
import { useUserForm } from "@/hooks/Forms/useUserForm";
import { useTranslations } from "next-intl";
import { Button } from "@/component/UI/Button";
import { useCallback } from "react";

export default function AddSubUserForm() {
    const { form, formErrors, handleChange, handleSubmit,isSubmitting } = useUserForm();
    const t = useTranslations("form");


    const renderField = useCallback(
        (
            id: keyof typeof form,
            labelKey: string,
            type: string = "text"
        ) => (
            <div>
                <FloatingInput
                    id={id}
                    name={id}
                    label={t(labelKey)}
                    type={type}
                    value={form[id] ?? ""}
                    onChange={handleChange}
                    error={formErrors[id]}
                />
                {formErrors[id] && (
                    <p className="text-sm text-rose-400 mt-1">{formErrors[id]}</p>
                )}
            </div>
        ),
        [form, formErrors, handleChange, t]
    );

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 w-[90%] mt-10  max-w-md bg-white p-6 rounded-2xl mx-auto dark:bg-darkSlider shadow"
        >
            <h2 className="text-2xl font-bold text-center text-blue/80">
                {t("title")}
            </h2>

            {renderField("email", "email", "email")}
            {renderField("password", "password", "password")}
            {renderField("confirm", "confirm", "password")}
            {renderField("name", "first_name")}
            {renderField("last_name", "last_name")}
            {renderField("position", "position")}


            <div className="relative pt-6">
                <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent outline-none text-gray-800 py-2 transition-all duration-300 ${
                        formErrors.role
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-blue-500"
                    }`}
                >
                    <option value="viewer">{t("role_viewer")}</option>
                    <option value="editor">{t("role_editor")}</option>
                </select>
                <label
                    htmlFor="role"
                    className={`absolute top-0 left-0 text-sm ${
                        formErrors.role ? "text-red-500" : "text-gray-500"
                    }`}
                >
                    {t("role")}
                </label>
                {formErrors.role && (
                    <p className="text-sm text-rose-400 mt-1">{formErrors.role}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-xl dark:bg-blue/80 dark:hover:bg-blue"
            >
                {isSubmitting ? t("creating") + "..." : t("submit")}
            </Button>

        </form>
    );
}

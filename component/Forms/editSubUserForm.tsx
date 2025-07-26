'use client';

import { useEditSubUserForm } from '@/hooks/Forms/useEditSubUserForm';
import FloatingInput from '@/component/UI/FloatingInput';
import { Button } from '@/component/UI/Button';
import { useTranslations } from 'next-intl';

interface Props {
    id: string;
}

export default function EditSubUserForm({ id }: Props) {
    const t = useTranslations('editForm');
    const {
        form,
        errors,
        handleChange,
        handleSubmit,
        loading,
        submitting,
    } = useEditSubUserForm(id);

    if (loading) return <p className="text-center">{t('loading')}</p>;

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow dark:bg-darkSlider"
        >
            <h2 className="text-2xl font-bold text-center text-blue/80">
                {t('edit_subuser')}
            </h2>

            <FloatingInput
                id="email"
                name="email"
                label={t('email')}
                type="email"
                value={form.email ?? ''}
                onChange={() => {}}
                disabled
            />

            <FloatingInput
                id="name"
                name="name"
                label={t('first_name')}
                value={form.name ?? ''}
                onChange={handleChange}
                error={errors.name}
            />

            <FloatingInput
                id="last_name"
                name="last_name"
                label={t('last_name')}
                value={form.last_name ?? ''}
                onChange={handleChange}
                error={errors.last_name}
            />

            <FloatingInput
                id="position"
                name="position"
                label={t('position')}
                value={form.position ?? ''}
                onChange={handleChange}
                error={errors.position}
            />

            <div className="relative pt-6">
                <select
                    id="role"
                    name="role"
                    value={form.role ?? ''}
                    onChange={handleChange}
                    className={`w-full border-b-2 bg-transparent outline-none text-gray-800 py-2 transition-all duration-300 dark:text-gray-300 ${
                        errors.role
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-300 focus:border-blue-500'
                    }`}
                >
                    <option value="">{t('select_role')}</option>
                    <option value="viewer">{t('role_viewer')}</option>
                    <option value="editor">{t('role_editor')}</option>
                </select>
                <label
                    htmlFor="role"
                    className={`absolute top-0 left-0 text-sm ${
                        errors.role ? 'text-red-500' : 'text-gray-500'
                    }`}
                >
                    {t('role')}
                </label>
                {errors.role && (
                    <p className="text-sm text-rose-400 mt-1">{errors.role}</p>
                )}
            </div>

            <Button
                type="submit"
                disabled={submitting}
                className={`w-full text-xl dark:bg-blue/80 dark:hover:bg-blue ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {submitting ? t('saving') + '...' : t('save')}
            </Button>

        </form>
    );
}

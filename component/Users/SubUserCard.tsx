'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Calendar, Pencil, Trash, Eye, ShieldCheck, FilePen, HelpCircle } from 'lucide-react';

import CardContainer from '@/component/layout/CardContainer';
import { Button } from '@/component/UI/ButtonUser';
import { ConfirmDeleteModal } from '@/component/UI/ConfirmDeleteModal';
import { useDeleteSubUser } from '@/hooks/Forms/useDeleteSubUser';
import { useRouter } from 'next/navigation';

interface SubUserCardProps {
    user: {
        id: string;
        name: string;
        last_name: string;
        email: string;
        role: string;
        position?: string;
        is_email_verified: boolean;
    };
}

function getCardIconData(role?: string) {
    switch (role) {
        case 'viewer':
            return {
                icon: <Eye size={20} />,
                bgColor: 'bg-yellowTitle',
            };
        case 'admin':
            return {
                icon: <ShieldCheck size={20} />,
                bgColor: 'bg-blue',
            };
        case 'editor':
            return {
                icon: <FilePen size={20} />,
                bgColor: 'bg-purple-400',
            };
        default:
            return {
                icon: <HelpCircle size={20} />,
                bgColor: 'bg-gray-400',
            };
    }
}

export default function SubUserCard({ user }: SubUserCardProps) {
    const router = useRouter();
    const t = useTranslations('subusers');
    const { icon, bgColor } = getCardIconData(user.role);

    const [open, setOpen] = useState(false);
    const { deleteSubUser, isDeleting } = useDeleteSubUser(() => setOpen(false));

    return (
        <>
            <CardContainer icon={icon} iconBgColor={bgColor}>
                <div className="text-left space-y-2 text-sm sm:text-base">
                    <p className="font-semibold text-gray-600 dark:text-gray-300">
                        {t('email')}: <span className="font-normal">{user.email}</span>
                    </p>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <Mail size={14} />
                        <span className="font-semibold">{t('position')}</span>:
                        <span> {user.position || '—'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                        <Calendar size={14} />
                        <span className="font-semibold">{t('role')}</span>:
                        <span> {user.role || '—'}</span>
                    </div>
                </div>

                <hr className="my-3 border-blue dark:border-gray-700" />

                <div className="flex justify-between gap-2">
                    <Button
                        className="w-full bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-100 dark:text-gray-300 dark:border-gray-300 dark:hover:text-blue-300 dark:hover:border-blue-300 dark:hover:bg-transparent"
                        variant="ghost"
                        onClick={() => router.push(`/subuser/${user.id}`)}
                    >
                        <Pencil
                            size={16}
                            className="mr-1 text-blue-400 dark:text-gray-300 dark:hover:text-blue-300"
                        />
                        {t('edit')}
                    </Button>

                    <Button
                        className="w-full bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-50 dark:text-rose-200 dark:border-rose-200 dark:hover:border-rose-300 dark:hover:text-rose-300 dark:hover:bg-transparent"
                        variant="ghost"
                        onClick={() => setOpen(true)}
                        disabled={isDeleting}
                    >
                        <Trash
                            size={16}
                            className="mr-1 text-rose-500 dark:text-rose-200 dark:hover:text-rose-300"
                        />
                        {isDeleting ? t('deleting') : t('delete')}
                    </Button>
                </div>
            </CardContainer>

            <ConfirmDeleteModal
                open={open}
                onOpenChange={setOpen}
                onConfirm={() => deleteSubUser(user.id)}
                loading={isDeleting}
                title={t('confirm_delete_title')}
                description={t('confirm_delete_message')}
            />
        </>
    );
}

'use client';

import {  Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/component/UI/ButtonUser';
import Link from 'next/link';
import { useSubUserCount } from '@/hooks/useSubUserCount';



import SubUsersList from "@/component/Users/SubUsersList";

export default function UserCard() {
    const t = useTranslations('users');
    const { count, loading } = useSubUserCount();


    return (

           <>

               <div className="text-left space-y-2 flex justify-between p-4">


                   <div className={'flex space-y-2 flex-col'}>
                       <h1 className="text-2xl  font-bold dark:text-white ">{t('title')}</h1>


                       <p className="text-gray-500 text-sm dark:text-gray-300">{t('subtitle')}</p>
                   </div>

                   <div className=" ">
                       <Button variant="default" className=" flex justify-center items-center gap-1 bg-blue" >
                           <Link href="/add-user" className="flex items-center justify-center">
                               <Plus size={16} />
                               {t('action')}
                           </Link>
                       </Button>
                   </div>
               </div>

               {/* hr */}
               <hr className="my-3 border-gray-300 dark:border-gray-700" />

               <div className={'flex items-center gap-2 mb-5'}>
                   <h3 className={'dark:text-white'}>{t('all')}</h3>
                   {loading ? (
                       <span className="text-sm text-gray-500 dark:text-white">{t('loading')}...</span>
                   ) : (
                       <Button size={"sm"} variant="default" className="  h-3 flex justify-center items-center gap-1 bg-blue">{count}</Button>
                   )}
               </div>

               <SubUsersList />
           </>

    );
}

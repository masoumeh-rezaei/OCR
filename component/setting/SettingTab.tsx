'use client';

import React, { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/component/UI/dialog';
import { usePlanById } from '@/hooks/usePlans';
import PlanModal from '@/component/Plans/PlanIDModal';
import InvoicesSection from '@/component/setting/AcountTabs/invoice';

import {
    Settings,
    Bell,
    Link2,
    ArrowUpCircle,
    FileText,
} from 'lucide-react';


// Lazy-loaded upgrade tab
const UpgradePlanTab = lazy(() => import('@/component/setting/AcountTabs/UpgradePlan'));

type TabKey = 'preferences' | 'notifications' | 'connections' | 'upgrade' | 'invoices';


interface SettingTabProps {
  open: boolean;
  onCloseAction: () => void;
}

const SettingTab: React.FC<SettingTabProps> = ({ open, onCloseAction }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('upgrade');
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  // Fetch selected plan when modal is open
  const {
    data: selectedPlan,
    isLoading: isPlanLoading,
    error: planError,
  } = usePlanById(selectedPlanId, !!selectedPlanId && planModalOpen);

  // Handle plan upgrade click
  const handleUpgradeClick = useCallback((planId: number) => {
    setSelectedPlanId(planId);
    setPlanModalOpen(true);
  }, []);

  // Handle tab switching
  const handleTabChange = useCallback((tab: TabKey) => {
    setActiveTab(tab);
  }, []);

  // Sidebar tab list
    const sidebarTabs = useMemo(
        () =>
            [
                { label: 'Preferences', value: 'preferences', icon: Settings },
                { label: 'Notifications', value: 'notifications', icon: Bell },
                { label: 'Connections', value: 'connections', icon: Link2 },
                { label: 'Upgrade Plan', value: 'upgrade', icon: ArrowUpCircle },
                { label: 'Invoices', value: 'invoices', icon: FileText },
            ] as { label: string; value: TabKey; icon: React.FC<{ size?: number; className?: string }> }[],
        []
    );



    // Render tab content
    const renderTabContent = useMemo(() => {
        switch (activeTab) {
            case 'upgrade':
                return <UpgradePlanTab onUpgradeClick={handleUpgradeClick} />;
            case 'invoices':
                return <InvoicesSection/>;
            default:
                return <div className="text-sm text-gray-500">Coming soon...</div>;
        }
    }, [activeTab, handleUpgradeClick]);


    return (
      <>
        <Dialog
            open={open}
            onOpenChange={(value) => {
              if (!value) onCloseAction();
            }}
        >
          <DialogContent className="!w-[70%] max-h-[90vh] !overflow-y-scroll rounded-xl !p-0">
            <div className="flex flex-col md:flex-row h-full gap-6 dark:bg-darkBg">
              {/* Sidebar */}
              <aside className="w-full md:w-1/4 bg-gray-100 dark:bg-darkSlider p-6 rounded-lg">
                <DialogTitle className="text-lg font-semibold mb-4 dark:text-white">Account</DialogTitle>
                  <ul className="text-sm  text-gray-800 dark:text-gray-300 space-y-2">
                      {sidebarTabs.map((tab) => {
                          const Icon = tab.icon;
                          return (
                              <li
                                  key={tab.value}
                                  className={`flex items-center gap-2 cursor-pointer transition-colors ${
                                      activeTab === tab.value ? 'font-semibold text-blue-600 dark:text-blue-400' : ''
                                  }`}
                                  onClick={() => handleTabChange(tab.value)}
                              >
                                  <Icon size={18} className="shrink-0" />
                                  {tab.label}
                              </li>
                          );
                      })}
                  </ul>

              </aside>

              {/* Main content */}
              <main className="w-full md:w-3/4 p-6 overflow-y-auto">
                <Suspense fallback={<p className="text-sm text-gray-400">Loading...</p>}>
                  {renderTabContent}
                </Suspense>
              </main>
            </div>
          </DialogContent>
        </Dialog>

        {/* Plan Detail Modal */}
        {planModalOpen && selectedPlanId && (
            <PlanModal
                open={planModalOpen}
                onCloseAction={() => {
                  setPlanModalOpen(false);
                  setSelectedPlanId(null);
                }}
                plan={selectedPlan}
                isLoading={isPlanLoading}
                error={planError}
            />
        )}
      </>
  );
};

export default React.memo(SettingTab);

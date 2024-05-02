import React from 'react';
import { Tabs, Tab } from "@nextui-org/react";


const AdminTabs = ({ adminType, selectedTab, setSelectedTab, ADMIN_ACTIONS }) => {
    return (
        adminType && ADMIN_ACTIONS[adminType] && (
            <Tabs
                key={adminType}
                aria-label="Admin Tabs"
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
            >
                {Object.keys(ADMIN_ACTIONS[adminType]).map(tab => (
                    <Tab
                        key={tab}
                        value={tab}
                        title={tab}
                        aria-label={`Admin Tab ${tab}`}
                    />
                ))}
            </Tabs>
        )
    );
};

export default AdminTabs;
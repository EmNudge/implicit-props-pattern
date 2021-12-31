/** @jsxImportSource react */
import React, { useState, useContext, useEffect, useMemo } from 'react';

const TabsContext = React.createContext({
  addTab: (_label: string, _children: React.ReactNode) => {},
  removeTab: (_label: string) => {}
});

type Children = { children: React.ReactNode };

export const TabContent = ({ children, label }: { label: string } & Children) => {
  const { addTab, removeTab } = useContext(TabsContext);

  useEffect(() => {
    addTab(label, children);
    return () => removeTab(label);
  }, []);

  return null;
};

const TabsContainer = ({ children }: Children) => {
  const [tabs, setTabs] = useState<{ [label: string]: React.ReactNode }>({});
  const [currentTab, setCurrentTab] = useState('');

  const providerData = useMemo(() => ({ 
    addTab(label: string, children: React.ReactNode) {
      setTabs(prev => {
        if (!Object.keys(prev).length) setCurrentTab(label);
        return { ...prev, [label]: children };
      });
    },
    removeTab(label: string) {
      const { [label]: x, ...rem } = tabs;
      setTabs(rem);
    },
  }), []);

  return (
    <div className="tabs-container">
      <div className="tabs">
        {Object.keys(tabs).map(label => (
          <span
            key={label}
            className={label === currentTab ? 'selected' : undefined}
            onClick={() => setCurrentTab(label)}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="content">
        {/* @ts-ignore */}
        <TabsContext.Provider value={providerData}>
          {children}
        </TabsContext.Provider>
        {tabs[currentTab] || 'please add some tabs'}
      </div>
    </div>
  );
};

export default TabsContainer;

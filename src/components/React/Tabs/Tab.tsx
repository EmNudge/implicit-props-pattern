import React, { useState, useContext, useEffect, useMemo } from 'react';

const TabsContext = React.createContext({
  addTab: () => {},
  removeTab: () => {}
});

export const TabContent: React.FC<{ label: string}> = ({ children, label }) => {
  const { addTab, removeTab } = useContext(TabsContext);
  useEffect(() => {
    addTab(label, children);
    return () => removeTab(label);
  }, []);

  return null;
};

const TabsContainer: React.FC = ({ children }) => {
  const [tabs, setTabs] = useState<{ [label: string]: React.Element }>({});
  const [currentTab, setCurrentTab] = useState('');

  const addTab = (label: string, children: React.Element) => {
    setTabs(prev => {
      if (!Object.keys(prev).length) setCurrentTab(label);
      return { ...prev, [label]: children };
    });
  };
  const removeTab = (label: string) => {
    const { [label]: x, ...rem } = tabs;
    setTabs(rem);
  };
  const providerData = useMemo(() => ({ addTab, removeTab }), []);

  const selectedTab = currentTab
    ? tabs[currentTab]
    : tabs.length
    ? tabs[0]
    : undefined;

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
        <TabsContext.Provider value={providerData}>
          {children}
        </TabsContext.Provider>
        {selectedTab || 'please add some tabs'}
      </div>
    </div>
  );
};

export default TabsContainer;

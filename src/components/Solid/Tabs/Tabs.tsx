/** @jsxImportSource solid-js */
import { 
    createSignal, createContext, useContext, 
    onCleanup, For, batch,
} from 'solid-js';

const TabsContext = createContext({
    addTab: (_label: string, _children) => {},
    removeTab: (_label: string) => {},
});

export const TabContent = (props: { label: string, children: Element[] | unknown }) => {
    const { addTab, removeTab } = useContext(TabsContext);

    addTab(props.label, props.children);
    onCleanup(() => removeTab(props.label));

    return <></>;
};

const TabsContainer = (props: { children: Element[] | unknown }) => {
    const [tabs, setTabs] = createSignal<{ [label: string]: any }>({});
    const [currentTab, setCurrentTab] = createSignal('');

    const providerData = {
        addTab(label: string, children: Element[]) {
            batch(() => {
                if (!Object.keys(tabs()).length) setCurrentTab(label);
                setTabs(prev => ({ ...prev, [label]: children }));
            })
        },
        removeTab(label: string) {
            setTabs(prev => {
                const { [label]: x, ...rem } = prev;
                return rem;
            });
        },
    };

    return (
        <div className="tabs-container">
            <div className="tabs">
                <For each={Object.keys(tabs())}>
                    {(label) => 
                        <span
                            classList={{ selected: label === currentTab() }}
                            onClick={[setCurrentTab, label]}
                        >
                            {label}
                        </span>
                    }
                </For>
            </div>
            <div className="content">
                <TabsContext.Provider value={providerData}>
                    {props.children}
                </TabsContext.Provider>
                {tabs()[currentTab()] || 'please add some tabs'}
            </div>
        </div>
    );
};

export default TabsContainer;

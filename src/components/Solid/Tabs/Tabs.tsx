/** @jsxImportSource solid-js */
import { 
    createSignal, createContext, useContext, 
    onCleanup, onMount, createMemo, For,
} from 'solid-js';

const TabsContext = createContext({
    addTab: (label: string, children) => { console.error('using old addTab') },
    removeTab: (label: string) => { console.error('using old removeTab') }
});

export const TabContent = (props) => {
    const { addTab, removeTab } = useContext(TabsContext);

    onMount(() => addTab(props.label, props.children));
    onCleanup(() => removeTab(props.label));

    return <></>;
};

const TabsContainer = (props) => {
    const [tabs, setTabs] = createSignal<{ [label: string]: any }>({});
    const [currentTab, setCurrentTab] = createSignal('');

    const providerData = {
        addTab(label: string, children) {
            setTabs(prev => {
                if (!Object.keys(prev).length) setCurrentTab(label);
                return { ...prev, [label]: children };
            });
        },
        removeTab(label: string) {
            setTabs(prev => {
                const { [label]: x, ...rem } = prev;
                return rem;
            });
        },
    };

    const selectedTab = createMemo(() => {
        const tab = tabs()[currentTab()];
        if (!tab && tabs().length) return Reflect.ownKeys(tabs())[0]
        return tab;
    })

    return (
        <div className="tabs-container">
            <div className="tabs">
                <For each={Object.keys(tabs())}>
                    {(label) => 
                        <span
                            className={label === currentTab() ? 'selected' : undefined}
                            onClick={() => setCurrentTab(label)}
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
                {selectedTab || 'please add some tabs'}
            </div>
        </div>
    );
};

export default TabsContainer;

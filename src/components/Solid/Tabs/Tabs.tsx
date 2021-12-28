/** @jsxImportSource solid-js */
import { 
    createSignal, createContext, useContext, 
    onCleanup, onMount, createMemo, For,
} from 'solid-js';

const TabsContext = createContext({
    addTab: (_label: string, _children) => { console.error('using old addTab') },
    removeTab: (_label: string) => { console.error('using old removeTab') }
});

export const TabContent = (props: { label: string, children: unknown }) => {
    const { addTab, removeTab } = useContext(TabsContext);

    onMount(() => addTab(props.label, props.children));
    onCleanup(() => removeTab(props.label));

    return <></>;
};

const TabsContainer = (props: { children: unknown }) => {
    const [tabs, setTabs] = createSignal<{ [label: string]: any }>({});
    const [currentTab, setCurrentTab] = createSignal('');

    const providerData = {
        addTab(label: string, children: unknown) {
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

    const selectedTab = (() => {
        const tab = tabs()[currentTab()];
        if (!tab && Object.keys(tabs()).length) return Reflect.ownKeys(tabs())[0]
        return tab;
    })();

    return (
        <div className="tabs-container">
            <div className="tabs">
                <For each={Object.keys(tabs())}>
                    {(label) => 
                        <span
                            className={label === currentTab() ? 'selected' : undefined}
                            onClick={() => {alert('hey!'); setCurrentTab(label)}}
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

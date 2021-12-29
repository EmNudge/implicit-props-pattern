/** @jsxImportSource solid-js */
import { 
    createSignal, createContext, useContext, 
    onCleanup, For, batch,
} from 'solid-js';

const TabsContext = createContext({
    addTab: (_label: string, _children) => { console.error('using old addTab') },
    removeTab: (_label: string) => { console.error('using old removeTab') }
});

export const TabContent = (props: { label: string, children: Element[] }) => {
    const { addTab, removeTab } = useContext(TabsContext);

    addTab(props.label, props.children);
    onCleanup(() => removeTab(props.label));

    return <></>;
};

const TabsContainer = (props: { children: Element[] }) => {
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

    const selectedTab = (() => {
        const tab = tabs()[currentTab()];
        if (!tab) {
            const keysArr = Reflect.ownKeys(tabs());
            if (keysArr.length) return keysArr[0];
            return 'please add some tabs';
        }
        return tab;
    });

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
                {selectedTab()}
            </div>
        </div>
    );
};

export default TabsContainer;

/** @jsxImportSource solid-js */
import { 
    createSignal, createContext, useContext, 
    onCleanup, onMount, createMemo, For, createEffect,
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
        console.log({ tab })
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
                            className={label === currentTab() ? 'selected' : undefined}
                            onClick={() => {console.log('hey!'); setCurrentTab(label)}}
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

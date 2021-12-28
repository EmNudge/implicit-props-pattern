import { createSignal } from "solid-js";
import TabContainer, { TabContent } from './Tabs';

export default function App() {
  // so that vite doesn't yell at us
  createSignal();

  return (
    <>
      <TabContainer>
        <TabContent label="tab 1">
          <h1>Hello tab 1</h1>
          <p>This is the first tab</p>
        </TabContent>
        <TabContent label="tab 2">
          <h1>Hello tab 2</h1>
          <p>This is the second tab</p>
        </TabContent>
      </TabContainer>
    </>
  );
}

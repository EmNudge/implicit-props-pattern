/** @jsxImportSource react */
import TabContainer, { TabContent } from './Tab';

export default function App() {
  return (
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
  );
}
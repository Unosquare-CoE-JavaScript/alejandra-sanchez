import React, { useState, useCallback, useMemo } from "react";

import Button from "./components/UI/Button/Button";
import DemoList from "./components/Demo/DemoList";
import "./App.css";

function App() {
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title')
  }, [])

  const ListItems = useMemo(() => [5,3,1,10,9], [])

  return (
    <div className="app">
      <DemoList title={listTitle} items={ListItems}/>
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;

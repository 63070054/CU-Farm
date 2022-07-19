import React, { useState } from 'react';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

export default function App() {
  const [mqttData, setData] = useState({ resetReason: [], switch: 0, rssi: 0, update: "", temp: 0 })
  const setOrder = () => {

    // POST request using fetch inside useEffect React hook
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({ title: 'React Hooks POST Request Example' })
    };
    fetch('${config.backendUrl}mqtt', requestOptions)
      .then(response => response.json())
      .then(data => setData(data.data));


    // empty dependency array means this effect will only run once (like componentDidMount in classes)

  }
  return (
    <>
      <DashboardLayout>
        <button onClick={setOrder} >order</button>
      </DashboardLayout>
    </>
  );
}

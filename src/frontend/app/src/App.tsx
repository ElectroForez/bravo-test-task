import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./components/Form";
import ApplicationsTable from "./components/ApplicationsTable";

function App() {
  return (
      <>
        <Form/>
        <ApplicationsTable/>
      </>
  )
}

export default App;

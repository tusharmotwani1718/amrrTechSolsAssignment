import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Layout from './Layout.jsx';
import { AddItems, ViewItems } from './components/index.js';
import { useState } from 'react';
import { MessageProvider } from './context/MessageContext.js';
import Message from './components/Message.jsx';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout />}>
        <Route index element={<ViewItems />} />
        <Route path="/add-items" element={<AddItems />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />
      </>
    )
  );

  // message context:
  const [messageType, setMessageType] = useState(null);
  const [messageContent, setMessageContent] = useState(null);

  const displayMessage = (type, content) => {
    // closeModal(); // close all modals if anyone is open.
    setMessageType(type);
    setMessageContent(content);
  }
  

  return (
    <MessageProvider value={{ messageType, messageContent, displayMessage }}>
    <RouterProvider router={router} />
    <Message /> {/* Render the Message component to show messages */}
    </MessageProvider>
  );
}

export default App

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { NoteState } from './context/NoteState';


const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <NoteState>
  <ChakraProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </ChakraProvider>
  </NoteState>
);

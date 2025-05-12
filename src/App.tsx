import { Header } from './components/Header';
import { Card } from './components/Card';
import { getClient } from './services/clientService';
async function fetchClients() {
  try {
    const clients = await getClient();
    console.log(clients);
  } catch (error) {
    console.error('Failed to fetch clients:', error);
  }
}

fetchClients();
export function App() {
  return (
    <>
      <Header />
    
      <Card/>
    </>
  )
}


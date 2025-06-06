import { Client } from '../models/Client';

export async function getClients(): Promise<Client[]> {
  try {
    const response = await fetch('http://localhost:8080/client');
    if (!response.ok) {
      throw new Error(`Failed to fetch clients: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
}
export async function getClientById(id: number): Promise<Client> {
  try {
    const response = await fetch(`http://localhost:8080/client/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch clients: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
}

export async function createClient(client: Client): Promise<Client> {
  try {
    const response = await fetch('http://localhost:8080/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) {
      throw new Error(`Failed to create client: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
}
import { Client } from '../models/Client';

const BASE_URL = 'http://localhost:8080/clients';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }
  return response.json();
}

export async function getClients(): Promise<Client[]> {
  const response = await fetch(BASE_URL);
  return handleResponse<Client[]>(response);
}

export async function getClientById(id: number): Promise<Client> {
  const response = await fetch(`${BASE_URL}/${id}`);
  return handleResponse<Client>(response);
}

export async function createClient(client: Client): Promise<Client> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  });
  return handleResponse<Client>(response);
}

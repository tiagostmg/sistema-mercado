// GET http://localhost:8080/client
export async function getClient() {
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
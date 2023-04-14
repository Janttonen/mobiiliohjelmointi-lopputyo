export const default_API = 'https://opentdb.com/api.php?'

export async function fetchJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Server responded with a non-OK status');
      }
      return response.json();
    } catch (error) {
      console.error('API error:', error);
    }
  }

  export const difficulty = [
    {id: 1, title: 'Easy', value: 'easy'},
    {id: 2,title: 'Medium', value: 'medium'},
    {id:3, title: 'Hard', value: 'hard'}
  ]
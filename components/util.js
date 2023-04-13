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
    {title: 'Easy', value: 'easy'},
    {title: 'Medium', value: 'medium'},
    {title: 'Hard', value: 'hard'}
  ]
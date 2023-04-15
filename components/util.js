export const default_API = "https://opentdb.com/api.php?amount=";
export const category_API = 'https://opentdb.com/api_category.php';

export async function fetchJson(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Server responded with a non-OK status");
    }
    return response.json();
  } catch (error) {
    console.error("API error:", error);
  }
}

export const gameOptions = {
  difficulty: [
    { id: 1, title: "Any difficulty", value: "any"},
    { id: 2, title: "Easy", value: "easy" },
    { id: 3, title: "Medium", value: "medium" },
    { id: 4, title: "Hard", value: "hard" },
  ],
};

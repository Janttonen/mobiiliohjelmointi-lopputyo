export const default_API = "https://opentdb.com/api.php?amount=";
export const category_API = "https://opentdb.com/api_category.php";

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

export const checkUrl = (category, difficulty, amount) => {
  if (category === 0 && difficulty === "any") {
    return `${default_API}${amount}&encode=url3986`;
  } else if (category === 0) {
    return `${default_API}${amount}&difficulty=${difficulty}&encode=url3986`;
  } else {
    return `${default_API}${amount}&category=${category}&difficulty=${difficulty}&encode=url3986`;
  }
};

export const gameOptions = {
  difficulty: [
    { id: 1, title: "Any difficulty", value: "any" },
    { id: 2, title: "Easy", value: "easy" },
    { id: 3, title: "Medium", value: "medium" },
    { id: 4, title: "Hard", value: "hard" },
  ],
};

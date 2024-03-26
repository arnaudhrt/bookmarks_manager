export const googleGetRequest = async (params) => {
  try {
    const response = await fetch(`https://www.google.com/complete/search?sclient=psy-ab&q=${params}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // Pour déboguer
    return data; // Retourne les données pour une utilisation en dehors de la fonction
  } catch (error) {
    console.error("Error:", error);
    return null; // Retourne null ou une valeur par défaut en cas d'erreur
  }
};

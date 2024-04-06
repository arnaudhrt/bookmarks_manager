function extractBookmarks(bookmarkNodes) {
  let bookmarks = []; // Tableau pour stocker les signets

  function traverseNodes(nodes) {
    for (let node of nodes) {
      if (node.url && node.url !== "about:blank") {
        // Si le noeud a une URL, c'est un signet
        bookmarks.push({ title: node.title, url: node.url }); // Ajouter le signet au tableau
      }
      if (node.children) {
        // Si le noeud a des enfants, les parcourir récursivement
        traverseNodes(node.children);
      }
    }
  }

  traverseNodes(bookmarkNodes); // Commencer le parcours de l'arbre des signets
  return bookmarks; // Retourner le tableau de signets
}

// Exemple d'utilisation avec chrome.bookmarks.getTree
chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
  const bookmarks = extractBookmarks(bookmarkTreeNodes);
  chrome.runtime.sendMessage({ bookmarks: bookmarks });
});

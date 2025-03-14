document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    if (!articleId) {
        document.body.innerHTML = "<h1>Artikel tidak ditemukan</h1>";
        return;
    }

    async function fetchArticleDetails() {
        try {
            const response = await fetch(`http://localhost:3000/articles/id/${articleId}`);
            if (!response.ok) throw new Error("Artikel tidak ditemukan.");

            const article = await response.json();

            document.getElementById("articleTitle").textContent = article.title;
            document.getElementById("articleImage").src = article.pictureUrl || "template.jpg";
            document.getElementById("articleDate").textContent = `Dibuat pada: ${new Date(article.createdAt).toLocaleDateString("id-ID")}`;
            document.getElementById("articleSource").textContent = `Sumber: ${article.source}`;
            document.getElementById("articleContent").textContent = article.content;
        } catch (error) {
            console.error("Error fetching article details:", error);
            document.body.innerHTML = "<h1>Gagal memuat artikel.</h1>";
        }
    }

    fetchArticleDetails();
});

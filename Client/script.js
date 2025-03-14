document.getElementById('reportForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const urlInput = document.getElementById('urlInput').value;
    const messageDiv = document.getElementById('message');
    
    // Fungsi untuk membersihkan URL
    const cleanUrl = (url) => {
        // Hapus protokol (http:// atau https://)
        let cleaned = url.replace(/^https?:\/\//i, '');
        // Hapus www. jika ada
        cleaned = cleaned.replace(/^www\./i, '');
        // Hapus trailing slash (/) di akhir
        cleaned = cleaned.replace(/\/+$/, '');
        // Hapus path, query string, atau fragment jika ada (misal /page atau ?id=123)
        cleaned = cleaned.split(/[/?#]/)[0];
        return cleaned;
    };

    // Bersihkan URL sebelum dikirim
    const cleanedUrl = cleanUrl(urlInput);

    const reportData = {
        url: cleanedUrl
    };

    try {
        const response = await fetch('http://localhost:3000/judol-report/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData)
        });

        if (response.ok) {
            messageDiv.textContent = 'Laporan berhasil dikirim!';
            messageDiv.className = 'message success';
            document.getElementById('reportForm').reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || `Server error: ${response.status}`);
        }
    } catch (error) {
        let errorMessage = 'Terjadi kesalahan: ';
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Tidak dapat terhubung ke server. Pastikan server berjalan.';
        } else {
            errorMessage += error.message;
        }
        messageDiv.textContent = errorMessage;
        messageDiv.className = 'message error';
    }

    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
});

document.addEventListener("DOMContentLoaded", async function () {
    const articlesContainer = document.getElementById("articlesContainer");

    async function fetchArticles() {
        try {
            const response = await fetch("http://localhost:3000/articles/cards");
            if (!response.ok) throw new Error("Gagal mengambil data artikel.");
            
            const articles = await response.json();
            
            // Batasi hanya 9 artikel yang ditampilkan
            const limitedArticles = articles.slice(0, 9);

            // Bersihkan kontainer sebelum menambahkan artikel baru
            articlesContainer.innerHTML = "";

            limitedArticles.forEach(article => {
                const articleCard = document.createElement("div");
                articleCard.classList.add("article-card");

                articleCard.innerHTML = `
                    <img class="article-image" src="${article.pictureUrl || 'template.jpg'}" alt="${article.title}">
                    <div class="article-title">${article.title}</div>
                    <div class="article-meta">${new Date(article.createdAt).toLocaleDateString("id-ID")}</div>
                `;

                // Tambahkan event listener agar saat card diklik, pindah ke halaman detail
                articleCard.addEventListener("click", function () {
                    window.location.href = `article.html?id=${article.id}`;
                });

                articlesContainer.appendChild(articleCard);
            });
        } catch (error) {
            console.error("Error fetching articles:", error);
            articlesContainer.innerHTML = "<p>Gagal memuat artikel.</p>";
        }
    }

    fetchArticles();
});

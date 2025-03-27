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

    // Show loading state
    articlesContainer.innerHTML = `
        <div class="article-card loading">
            <div class="skeleton-loading article-image"></div>
            <div class="article-content">
                <div class="skeleton-loading article-title"></div>
                <div class="skeleton-loading article-meta"></div>
                <div class="skeleton-loading article-excerpt"></div>
            </div>
        </div>
        <div class="article-card loading">
            <div class="skeleton-loading article-image"></div>
            <div class="article-content">
                <div class="skeleton-loading article-title"></div>
                <div class="skeleton-loading article-meta"></div>
                <div class="skeleton-loading article-excerpt"></div>
            </div>
        </div>
        <div class="article-card loading">
            <div class="skeleton-loading article-image"></div>
            <div class="article-content">
                <div class="skeleton-loading article-title"></div>
                <div class="skeleton-loading article-meta"></div>
                <div class="skeleton-loading article-excerpt"></div>
            </div>
        </div>
    `;

    async function fetchArticles() {
        try {
            const response = await fetch("http://localhost:3000/articles/cards");
            if (!response.ok) throw new Error("Gagal mengambil data artikel.");
            
            const articles = await response.json();
            
            // Batasi hanya 9 artikel yang ditampilkan
            const limitedArticles = articles.slice(0, 9);

            // Bersihkan kontainer sebelum menambahkan artikel baru
            articlesContainer.innerHTML = "";

            if (limitedArticles.length === 0) {
                articlesContainer.innerHTML = `
                    <div class="no-articles">
                        <i class="far fa-newspaper"></i>
                        <p>Belum ada artikel yang tersedia.</p>
                    </div>
                `;
                return;
            }

            limitedArticles.forEach(article => {
                const articleCard = document.createElement("div");
                articleCard.classList.add("article-card");

                // Format date
                const date = new Date(article.createdAt);
                const formattedDate = date.toLocaleDateString("id-ID", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // Create excerpt from content
                const excerpt = article.content ? article.content.substring(0, 150) + '...' : '';

                articleCard.innerHTML = `
                    <img class="article-image" src="${article.pictureUrl || 'template.jpg'}" alt="${article.title}" 
                         onerror="this.src='https://via.placeholder.com/400x200?text=LawanJudol'">
                    <div class="article-content">
                        <div class="article-title">${article.title}</div>
                        <div class="article-meta">
                            <span><i class="far fa-calendar"></i> ${formattedDate}</span>
                            <span><i class="far fa-eye"></i> ${article.views || 0} views</span>
                        </div>
                        <div class="article-excerpt">${excerpt}</div>
                    </div>
                    <div class="article-footer">
                        <span class="article-category">${article.category || 'Umum'}</span>
                        <span class="article-readmore">
                            Baca Selengkapnya 
                            <i class="fas fa-arrow-right"></i>
                        </span>
                    </div>
                `;

                // Tambahkan event listener agar saat card diklik, pindah ke halaman detail
                articleCard.addEventListener("click", function () {
                    window.location.href = `article.html?id=${article.id}`;
                });

                articlesContainer.appendChild(articleCard);
            });
        } catch (error) {
            console.error("Error fetching articles:", error);
            articlesContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Gagal memuat artikel. Silakan coba lagi nanti.</p>
                </div>
            `;
        }
    }

    fetchArticles();
});

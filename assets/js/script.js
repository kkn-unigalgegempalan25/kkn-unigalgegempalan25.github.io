// Script Carousel Hero
document.addEventListener("DOMContentLoaded", function() {
  fetch("assets/img/carousel/images.json")  // Ambil daftar gambar & deskripsi dari JSON
      .then(response => response.json())
      .then(images => {
          let carouselInner = document.getElementById("carousel-inner");
          images.forEach((item, index) => {
              let isActive = index === 0 ? " active" : "";

              let slide = document.createElement("div");
              slide.className = "carousel-item" + isActive;
              slide.innerHTML = `
                  <div class="carousel-container text-center">
                      <img src="assets/img/carousel/${item.file}" class="img-fluid" alt="Carousel Image">
                      <p class="animate__animated animate__fadeInUp">${item.description}</p>
                  </div>
              `;
              carouselInner.appendChild(slide);
          });
      })
      .catch(error => console.error("Error loading images:", error));
});


// Script Auto Load Team
document.addEventListener("DOMContentLoaded", function () {
  fetch("/assets/img/team/team.json")
    .then(response => response.json())
    .then(data => {
      const teamContainer = document.getElementById("team-container");

      data.sort((a, b) => a.order - b.order);

      let delay = 100;

      data.forEach(member => {
        const memberHTML = `
          <div class="swiper-slide" data-aos="fade-up" data-aos-delay="${delay}">
            <div class="team-member">
              <div class="member-img">
                <a href="${member.file}" data-gallery="team-gallery" class="glightbox">
                  <img src="${member.file}" class="img-fluid" alt="${member.name}">
                </a>
              </div>
              <div class="member-info">
                <h4>${member.name}</h4>
                <span>${member.role}</span>
              </div>
            </div>
          </div>
        `;
        teamContainer.innerHTML += memberHTML;
        delay += 100;
      });

      // Inisialisasi Swiper
      new Swiper(".swiper-container", {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },  // Mobile (pagination disembunyikan)
          768: { slidesPerView: 2, spaceBetween: 15 },  // Tablet
          1024: { slidesPerView: 4, spaceBetween: 20 }  // Desktop
        }
      });

      AOS.init();
      AOS.refresh();

      const lightbox = GLightbox({ selector: ".glightbox" });
    })
    .catch(error => console.error("Error loading team data:", error));
});

// <!-- Script Galeri Auto Load -->

  document.addEventListener("DOMContentLoaded", function () {
    fetch("/assets/img/galeri/gallery.json")
      .then(response => response.json())
      .then(data => {
        const portfolioContainer = document.getElementById("portfolio-container");
        const filtersContainer = document.getElementById("portfolio-filters");
        const filters = new Set();
        const allFiles = [];
  
        Object.entries(data).forEach(([folder, files]) => {
          const filterClass = folder.toLowerCase().replace(/\s+/g, '-');
          filters.add(folder);
  
          files.forEach(file => {
            allFiles.push({ folder, file, filterClass });
          });
        });
  
        // Acak urutan file
        allFiles.sort(() => Math.random() - 0.5);
  
        allFiles.forEach(({ folder, file, filterClass }) => {
          const fileExt = file.split('.').pop().toLowerCase();
          const fileName = file.split('/').pop().split('.')[0]
            .replace(/_/g, ' ')  // Mengubah underscore menjadi spasi
            .replace(/(\d+).*$/, '$1');  // Menghapus semua karakter setelah angka terakhir
  
          const portfolioItem = document.createElement("div");
          portfolioItem.classList.add("col-lg-4", "col-md-6", "portfolio-item", "isotope-item", `filter-${filterClass}`);
  
          if (fileExt === "mp4") {
            portfolioItem.innerHTML = `
              <div class="portfolio-wrap">
                <a href="${file}" class="glightbox" data-gallery="portfolio-gallery">
                  <video class="img-fluid">
                    <source src="${file}" type="video/mp4">
                  </video>
                </a>
                <div class="portfolio-info">
                  <h4>${folder}</h4>
                  <p>${fileName}</p>
                </div>
              </div>
            `;
          } else {
            portfolioItem.innerHTML = `
              <div class="portfolio-wrap">
                <a href="${file}" class="glightbox" data-gallery="portfolio-gallery">
                  <img src="${file}" class="img-fluid" alt="${fileName}">
                </a>
                <div class="portfolio-info">
                  <h4>${folder}</h4>
                  <p>${fileName}</p>
                </div>
              </div>
            `;
          }
          portfolioContainer.appendChild(portfolioItem);
        });
  
        filters.forEach(folder => {
          const filterClass = folder.toLowerCase().replace(/\s+/g, '-');
          const filterItem = document.createElement("li");
          filterItem.setAttribute("data-filter", ".filter-" + filterClass);
          filterItem.innerText = folder;
          filtersContainer.appendChild(filterItem);
        });
  
        // **Inisialisasi Isotope dengan Masonry Layout**
        let iso = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'masonry',
        });
  
        // **Filter ketika klik kategori**
        document.querySelectorAll(".portfolio-filters li").forEach(item => {
          item.addEventListener("click", function () {
            document.querySelectorAll(".portfolio-filters li").forEach(li => li.classList.remove("filter-active"));
            item.classList.add("filter-active");
  
            let filterValue = item.getAttribute("data-filter");
            iso.arrange({ filter: filterValue === '*' ? '*' : filterValue });
          });
        });
  
        // **Re-layout setelah semua gambar dimuat**
        imagesLoaded(portfolioContainer, function () {
          iso.layout();
        });
  
        // **Inisialisasi GLightbox**
        const lightbox = GLightbox({
          selector: '.glightbox',
          touchNavigation: true,
          loop: true,
          autoplayVideos: true
        });
      })
      .catch(error => console.error("Error loading gallery.json:", error));
  });

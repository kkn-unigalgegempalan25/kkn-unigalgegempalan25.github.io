// <!-- Script Team Auto Load -->

    document.addEventListener("DOMContentLoaded", function () {
      fetch("/assets/img/team/team.json")
        .then(response => response.json())
        .then(data => {
          const teamContainer = document.getElementById("team-container");
          let delay = 100;
  
          data.sort((a, b) => a.order - b.order); // Urutkan berdasarkan jabatan
  
          data.forEach(member => {
            const memberHTML = `
              <div class="col-lg-3 col-md-6 d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="${delay}">
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
              </div><!-- End Team Member -->
            `;
            teamContainer.innerHTML += memberHTML;
            delay += 100;
          });
  
          // Inisialisasi Glightbox setelah elemen ditambahkan ke DOM
          const lightbox = GLightbox({ selector: ".glightbox" });
        })
        .catch(error => console.error("Error loading team data:", error));
    });

    
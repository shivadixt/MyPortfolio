/**
 * BAUHAUS UI — INTERACTIVE SCRIPT
 * Handling Theme Switching, Scrollspy, Swatch Copying & Geometric Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switcher (Vermilion, Cobalt, Ochre, Charcoal)
    const themePickers = document.querySelectorAll('.theme-picker-btn');
    const savedTheme = localStorage.getItem('bauhaus-theme') || 'vermilion';
    
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('bauhaus-theme', theme);
    };

    applyTheme(savedTheme);

    themePickers.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme-name');
            if (theme) applyTheme(theme);
        });
    });

    // 2. Active Section Scrollspy for Bauhaus Side Dock
    const dockButtons = document.querySelectorAll('.dock-pill-btn');
    const targetSections = document.querySelectorAll('section[id], header[id]');

    const updateActiveSection = () => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.35;

        targetSections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                dockButtons.forEach(btn => {
                    if (btn.getAttribute('href') === `#${id}`) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    // 3. Color Swatch Copy-to-Clipboard with Toast Feedback
    const swatchCards = document.querySelectorAll('.swatch-card');
    swatchCards.forEach(card => {
        card.addEventListener('click', () => {
            const hex = card.getAttribute('data-hex');
            if (hex) {
                navigator.clipboard.writeText(hex).then(() => {
                    const originalName = card.querySelector('.swatch-name').textContent;
                    const nameEl = card.querySelector('.swatch-name');
                    nameEl.textContent = 'COPIED!';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        nameEl.textContent = originalName;
                        card.style.transform = '';
                    }, 1200);
                }).catch(() => {
                    // Fallback
                });
            }
        });
    });

    // 4. Interactive Bauhaus Mosaic Tile Playground
    const mosaicTiles = document.querySelectorAll('.mosaic-tile');
    mosaicTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const currentRotation = tile.getAttribute('data-rot') || 0;
            const nextRotation = (parseInt(currentRotation, 10) + 90) % 360;
            tile.style.transform = `rotate(${nextRotation}deg) scale(1.08)`;
            tile.setAttribute('data-rot', nextRotation);
            setTimeout(() => {
                tile.style.transform = `rotate(${nextRotation}deg)`;
            }, 300);
        });
    });

    // 5. Contact Form Submission directly to sdevs.in.cs24@gmail.com
    const contactForm = document.getElementById('bauhaus-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'TRANSMITTING...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formsubmit.co/ajax/sdevs.in.cs24@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    submitBtn.textContent = 'MESSAGE SENT TO SHIVA ✓';
                    submitBtn.style.backgroundColor = '#10b981';
                    submitBtn.style.borderColor = '#10b981';
                    contactForm.reset();
                } else {
                    // Fallback to mailto if service fails
                    window.location.href = `mailto:sdevs.in.cs24@gmail.com?subject=${encodeURIComponent(formData.get('subject') || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.get('message') || '')}`;
                    submitBtn.textContent = 'OPENED IN EMAIL CLIENT ✓';
                }
            } catch (err) {
                // Fallback to mailto on network block
                window.location.href = `mailto:sdevs.in.cs24@gmail.com?subject=${encodeURIComponent(formData.get('subject') || 'Portfolio Inquiry')}&body=${encodeURIComponent(formData.get('message') || '')}`;
                submitBtn.textContent = 'OPENED IN EMAIL CLIENT ✓';
            } finally {
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 4000);
            }
        });
    }


});

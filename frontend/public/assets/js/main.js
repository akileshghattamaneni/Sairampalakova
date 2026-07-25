/**
 * Sai Ram PalaKova — Premium Frontend
 * GSAP animations · Cart · Wishlist · Toasts
 */
(function () {
    'use strict';

    const CART_KEY = 'srp_cart';
    const WISH_KEY = 'srp_wishlist';

    /* ── Page loader ── */
    const loader = document.getElementById('pageLoader');
    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 700);
        }
        initGSAP();
    });

    /* ── Navbar scroll ── */
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        const onScroll = () => mainNav.classList.toggle('scrolled', window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ── Toast system ── */
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        const el = document.createElement('div');
        el.className = 'toast-msg ' + (type === 'success' ? 'success' : type === 'error' ? 'error' : '');
        el.setAttribute('role', 'alert');
        el.textContent = message;
        container.appendChild(el);
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(20px)';
            el.style.transition = '0.35s ease';
            setTimeout(() => el.remove(), 350);
        }, 3800);
    }
    window.showToast = showToast;

    /* ── Cart (localStorage) ── */
    function getCart() {
        try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
        catch { return []; }
    }
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        updateCartUI();
    }
    function getWishlist() {
        try { return JSON.parse(localStorage.getItem(WISH_KEY) || '[]'); }
        catch { return []; }
    }
    function saveWishlist(list) {
        localStorage.setItem(WISH_KEY, JSON.stringify(list));
        updateWishlistUI();
    }

    function updateCartUI() {
        const cart = getCart();
        const countEl = document.getElementById('cartCount');
        const itemsEl = document.getElementById('cartItems');
        const emptyEl = document.getElementById('cartEmpty');
        const footerEl = document.getElementById('cartFooter');
        const totalEl = document.getElementById('cartTotal');

        const totalQty = cart.reduce((s, i) => s + i.qty, 0);
        if (countEl) countEl.textContent = totalQty;

        if (!itemsEl) return;

        const existing = itemsEl.querySelectorAll('.cart-item');
        existing.forEach(n => n.remove());

        if (cart.length === 0) {
            if (emptyEl) emptyEl.style.display = '';
            if (footerEl) footerEl.classList.add('d-none');
            return;
        }

        if (emptyEl) emptyEl.style.display = 'none';
        if (footerEl) footerEl.classList.remove('d-none');

        let total = 0;
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price * item.qty} <small>(${item.qty} × ₹${item.price})</small></div>
                    <div class="cart-item-qty">
                        <button type="button" class="qty-btn cart-qty-minus" data-idx="${idx}">−</button>
                        <span>${item.qty}</span>
                        <button type="button" class="qty-btn cart-qty-plus" data-idx="${idx}">+</button>
                        <button type="button" class="cart-remove" data-idx="${idx}">Remove</button>
                    </div>
                </div>`;
            itemsEl.appendChild(row);
        });

        if (totalEl) totalEl.textContent = '₹' + Math.round(total);

        itemsEl.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = +btn.dataset.idx;
                const c = getCart();
                if (c[i].qty > 1) c[i].qty--;
                else c.splice(i, 1);
                saveCart(c);
            });
        });
        itemsEl.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = +btn.dataset.idx;
                const c = getCart();
                c[i].qty++;
                saveCart(c);
            });
        });
        itemsEl.querySelectorAll('.cart-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const c = getCart();
                c.splice(+btn.dataset.idx, 1);
                saveCart(c);
                showToast('Removed from cart', 'info');
            });
        });
    }

    function addToCart(product) {
        const cart = getCart();
        const existing = cart.find(i => i.id === product.id);
        if (existing) existing.qty += product.qty || 1;
        else cart.push({ ...product, qty: product.qty || 1 });
        saveCart(cart);
        showToast(`${product.name} added to cart`, 'success');
        flyToCart(product.el);
    }

    function flyToCart(sourceEl) {
        if (!sourceEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = sourceEl.getBoundingClientRect();
        const dot = document.createElement('div');
        dot.style.cssText = `
            position:fixed;left:${rect.left + rect.width/2}px;top:${rect.top}px;
            width:12px;height:12px;background:var(--saffron,#D97706);border-radius:50%;
            z-index:99999;pointer-events:none;transition:all 0.6s cubic-bezier(0.22,1,0.36,1);
        `;
        document.body.appendChild(dot);
        const cartBtn = document.getElementById('cartToggle');
        const target = cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 60, top: 20 };
        requestAnimationFrame(() => {
            dot.style.left = target.left + 'px';
            dot.style.top = target.top + 'px';
            dot.style.opacity = '0';
            dot.style.transform = 'scale(0.3)';
        });
        setTimeout(() => dot.remove(), 650);
    }

    function updateWishlistUI() {
        const list = getWishlist();
        const countEl = document.getElementById('wishlistCount');
        if (countEl) countEl.textContent = list.length;
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            const id = btn.dataset.wishlistId;
            btn.classList.toggle('active', list.includes(id));
        });
    }

    function toggleWishlist(id, name) {
        let list = getWishlist();
        const sid = String(id);
        if (list.includes(sid)) {
            list = list.filter(x => x !== sid);
            showToast('Removed from wishlist');
        } else {
            list.push(sid);
            showToast(`${name || 'Item'} saved to wishlist`, 'success');
        }
        saveWishlist(list);
    }

    /* Cart drawer */
    const cartDrawer = document.getElementById('cartDrawer');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartToggle = document.getElementById('cartToggle');
    const mobCartBtn = document.getElementById('mobCartBtn');

    function openCart() {
        if (cartDrawer) {
            cartDrawer.classList.add('open');
            cartDrawer.setAttribute('aria-hidden', 'false');
            document.body.classList.add('cart-open');
        }
    }
    function closeCart() {
        if (cartDrawer) {
            cartDrawer.classList.remove('open');
            cartDrawer.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('cart-open');
        }
    }
    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (mobCartBtn) mobCartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            const cart = getCart();
            closeCart();
            const modal = document.getElementById('orderModal');
            if (modal && typeof bootstrap !== 'undefined') {
                const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
                bsModal.show();
                if (cart.length > 0) {
                    const productSelect = document.getElementById('orderProductName');
                    const qtyInput = document.getElementById('quantity');
                    const notesInput = document.getElementById('notes');
                    const hiddenId = document.getElementById('orderProductId');
                    const first = cart[0];
                    if (productSelect && first.name) {
                        productSelect.value = first.name;
                        productSelect.dispatchEvent(new Event('change'));
                    }
                    if (hiddenId && first.id) hiddenId.value = first.id;
                    if (qtyInput) qtyInput.value = first.qty || 1;
                    if (notesInput && cart.length > 0) {
                        const summary = cart.map(i => `${i.name} x ${i.qty} kg`).join(', ');
                        notesInput.value = `Cart: ${summary}`;
                    }
                }
            } else {
                window.location.href = 'products.php';
            }
        });
    }

    document.getElementById('wishlistToggle')?.addEventListener('click', () => {
        const list = getWishlist();
        if (list.length === 0) showToast('Your wishlist is empty — tap ♥ on products');
        else showToast(`${list.length} item(s) in wishlist`, 'success');
    });

    /* Product card interactions */
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.product-card-premium, .product-card');
            if (!card) return;
            const id = card.dataset.productId;
            const name = card.dataset.productName;
            const price = parseFloat(card.dataset.productPrice) || 0;
            const image = card.dataset.productImage || '';
            let qty = 1;
            const qtyVal = card.querySelector('.qty-value');
            if (qtyVal) qty = parseInt(qtyVal.textContent, 10) || 1;

            addToCart({ id, name, price, image, qty, el: card.querySelector('.product-image-wrapper') || card });

            this.classList.add('added');
            const txt = this.querySelector('.btn-text');
            if (txt) txt.textContent = 'Added';
            setTimeout(() => {
                this.classList.remove('added');
                if (txt) txt.textContent = 'Add';
            }, 2000);
        });
    });

    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const card = this.closest('.product-card-premium');
            toggleWishlist(this.dataset.wishlistId, card?.dataset.productName);
        });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.parentElement.querySelector('.qty-value');
            if (val) val.textContent = (parseInt(val.textContent, 10) || 1) + 1;
        });
    });
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.parentElement.querySelector('.qty-value');
            const n = parseInt(val.textContent, 10) || 1;
            if (val && n > 1) val.textContent = n - 1;
        });
    });

    updateCartUI();
    updateWishlistUI();

    /* ── Scroll reveal ── */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealEls.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        revealEls.forEach(el => obs.observe(el));
    }

    /* ── Counters ── */
    document.querySelectorAll('[data-count]').forEach(el => {
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounter(el);
                obs.disconnect();
            }
        }, { threshold: 0.4 });
        obs.observe(el);
    });

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const suffix = el.getAttribute('data-suffix');
        if (suffix !== null) el.setAttribute('data-suffix', suffix);
        const duration = 2000;
        const start = performance.now();
        function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ── Fresh batch countdown (resets daily 6 AM) ── */
    const freshEl = document.getElementById('freshCountdown');
    if (freshEl) {
        function updateFreshTimer() {
            const now = new Date();
            const next = new Date(now);
            next.setHours(6, 0, 0, 0);
            if (now >= next) next.setDate(next.getDate() + 1);
            const diff = next - now;
            const h = Math.floor(diff / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            freshEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        }
        updateFreshTimer();
        setInterval(updateFreshTimer, 1000);
    }

    /* ── FAQ ── */
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        if (!q) return;
        q.setAttribute('tabindex', '0');
        q.setAttribute('role', 'button');
        const toggle = () => {
            const open = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!open) item.classList.add('open');
        };
        q.addEventListener('click', toggle);
        q.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });

    /* ── Testimonials slider ── */
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.slider-dot');
    if (track && track.children.length) {
        let slideIndex = 0;
        const slides = track.children;
        const getPerView = () => window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        function goTo(i) {
            const per = getPerView();
            const max = Math.max(0, slides.length - per);
            slideIndex = Math.max(0, Math.min(i, max));
            const slideW = slides[0].offsetWidth + 24;
            track.style.transform = `translateX(-${slideIndex * slideW}px)`;
            dots.forEach((d, j) => d.classList.toggle('active', j === slideIndex));
        }
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
        let auto = setInterval(() => goTo(slideIndex + 1 >= slides.length ? 0 : slideIndex + 1), 5000);
        track.parentElement?.addEventListener('mouseenter', () => clearInterval(auto));
        window.addEventListener('resize', () => goTo(slideIndex));
        goTo(0);
    }

    /* ── Product search & filter ── */
    const searchInput = document.getElementById('productSearch');
    const filterChips = document.querySelectorAll('.filter-chip');
    const productCols = document.querySelectorAll('[data-product-col]');

    function filterProducts() {
        const q = (searchInput?.value || '').toLowerCase().trim();
        const activeChip = document.querySelector('.filter-chip.active');
        const cat = activeChip?.dataset.filter || 'all';

        productCols.forEach(col => {
            const name = (col.dataset.name || '').toLowerCase();
            const tags = (col.dataset.tags || '').toLowerCase();
            const matchQ = !q || name.includes(q) || tags.includes(q);
            const matchCat = cat === 'all' || tags.includes(cat);
            col.classList.toggle('product-hidden', !(matchQ && matchCat));
        });
    }
    if (searchInput) searchInput.addEventListener('input', filterProducts);
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            filterProducts();
        });
    });

    /* ── Order modal (preserve backend) ── */
    const orderModal = document.getElementById('orderModal');
    const orderForm = document.getElementById('orderForm');
    const orderStatus = document.getElementById('orderStatus');
    const whatsappOrderLink = document.getElementById('whatsappOrderLink');
    const addressWrapper = document.getElementById('addressWrapper');
    const deliveryType = document.getElementById('deliveryType');
    const productSelect = document.getElementById('orderProductName');

    if (orderModal) {
        orderModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            if (!orderForm) return;
            orderForm.reset();
            orderStatus?.classList.add('d-none');
            whatsappOrderLink?.classList.add('d-none');
            addressWrapper?.classList.add('d-none');
            if (!button) return;
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const hiddenProductId = document.getElementById('orderProductId');
            if (hiddenProductId) hiddenProductId.value = productId || '';
            if (productSelect && productName) productSelect.value = productName;
        });
    }

    if (productSelect) {
        productSelect.addEventListener('change', function () {
            const opt = this.options[this.selectedIndex];
            const hid = document.getElementById('orderProductId');
            if (hid) hid.value = opt?.dataset.productId || '';
        });
    }

    if (deliveryType && addressWrapper) {
        deliveryType.addEventListener('change', function () {
            const addressField = document.getElementById('address');
            if (this.value === 'delivery') {
                addressWrapper.classList.remove('d-none');
                addressField?.setAttribute('required', 'required');
            } else {
                addressWrapper.classList.add('d-none');
                addressField?.removeAttribute('required');
            }
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(orderForm);
            const name = (formData.get('name') || '').trim();
            const mobile = (formData.get('mobile') || '').trim();
            const quantity = parseFloat(formData.get('quantity'));
            const delivery = formData.get('delivery_type');
            const preferredDate = formData.get('preferred_date');

            if (!name || !mobile || !quantity || !delivery || !preferredDate) {
                showOrderStatus('Please fill all required fields.', 'danger');
                return;
            }

            const submitBtn = orderForm.querySelector('[type="submit"]');
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting…'; }

            fetch('api/submit_order.php', { method: 'POST', body: formData })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showOrderStatus('Thank you! Your order has been placed. We will contact you shortly.', 'success');
                        showToast('Order placed successfully!', 'success');
                        buildWhatsappLink(formData);
                        orderForm.reset();
                        localStorage.removeItem(CART_KEY);
                        updateCartUI();
                    } else {
                        showOrderStatus(data.message || 'Something went wrong. Please try again.', 'danger');
                    }
                })
                .catch(() => {
                    showOrderStatus('Unable to submit now. Please WhatsApp us directly.', 'danger');
                })
                .finally(() => {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Order'; }
                });
        });
    }

    function showOrderStatus(message, type) {
        if (!orderStatus) return;
        orderStatus.textContent = message;
        orderStatus.className = 'alert mt-3 alert-' + type;
        orderStatus.classList.remove('d-none');
    }

    function buildWhatsappLink(formData) {
        if (!whatsappOrderLink) return;
        const product = formData.get('product_name');
        const name = formData.get('name');
        const mobile = formData.get('mobile');
        const quantity = formData.get('quantity');
        const delivery = formData.get('delivery_type');
        const address = formData.get('address') || '';
        const preferredDate = formData.get('preferred_date');
        const notes = formData.get('notes') || '';

        let msg = `New Order - Sai Ram PalaKova%0A%0A`;
        msg += `Name: ${encodeURIComponent(name)}%0A`;
        msg += `Mobile: ${encodeURIComponent(mobile)}%0A`;
        msg += `Product: ${encodeURIComponent(product)}%0A`;
        msg += `Quantity: ${encodeURIComponent(quantity)} kg%0A`;
        msg += `Delivery: ${encodeURIComponent(delivery)}%0A`;
        if (address.trim()) msg += `Address: ${encodeURIComponent(address)}%0A`;
        msg += `Date: ${encodeURIComponent(preferredDate)}%0A`;
        if (notes.trim()) msg += `Notes: ${encodeURIComponent(notes)}%0A`;

        const waNumber = whatsappOrderLink.dataset.waNumber || '';
        whatsappOrderLink.href = `https://wa.me/${waNumber}?text=${msg}`;
        whatsappOrderLink.classList.remove('d-none');
    }

    /* ── Contact form ── */
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('[type="submit"]');
            if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

            fetch('api/submit_contact.php', { method: 'POST', body: formData })
                .then(r => r.json())
                .then(data => {
                    if (data.success) {
                        showContactStatus('Thank you! Your message has been sent.', 'success');
                        showToast('Message sent successfully!', 'success');
                        contactForm.reset();
                    } else {
                        showContactStatus(data.message || 'Something went wrong.', 'danger');
                    }
                })
                .catch(() => showContactStatus('Unable to send. Please WhatsApp us.', 'danger'))
                .finally(() => {
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send Message'; }
                });
        });
    }

    function showContactStatus(message, type) {
        if (!contactStatus) return;
        contactStatus.textContent = message;
        contactStatus.className = 'alert mt-3 alert-' + type;
        contactStatus.classList.remove('d-none');
    }

    const preferredDateInput = document.getElementById('preferredDate');
    if (preferredDateInput) {
        preferredDateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    /* ── Lazy images ── */
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) img.classList.add('loaded');
        else img.addEventListener('load', () => img.classList.add('loaded'));
    });

    /* ── Smooth anchor scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── Sticky CTA (desktop side) ── */
    const stickyCta = document.getElementById('stickyCta');
    if (stickyCta) {
        window.addEventListener('scroll', () => {
            stickyCta.classList.toggle('visible', window.scrollY > 600);
        }, { passive: true });
    }

    /* ── GSAP animations ── */
    function initGSAP() {
        if (typeof gsap === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

        const heroTl = document.querySelector('.hero-cinematic');
        if (heroTl) {
            gsap.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
            gsap.from('.hero-headline', { opacity: 0, y: 40, duration: 1, delay: 0.35, ease: 'power3.out' });
            gsap.from('.hero-lead', { opacity: 0, y: 24, duration: 0.8, delay: 0.55 });
            gsap.from('.hero-cta-row .btn', { opacity: 0, y: 20, duration: 0.6, stagger: 0.12, delay: 0.7 });
            gsap.from('.hero-trust-row .trust-pill', { opacity: 0, y: 16, duration: 0.5, stagger: 0.08, delay: 0.85 });
            gsap.from('.hero-main-image', { opacity: 0, scale: 0.92, duration: 1.2, delay: 0.4, ease: 'power2.out' });
            gsap.from('.hero-float-card', { opacity: 0, x: 30, duration: 0.8, stagger: 0.2, delay: 0.9 });
        }

        gsap.utils.toArray('.section-title').forEach(el => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 88%' },
                opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
            });
        });

        gsap.utils.toArray('.feature-card, .product-card-premium').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 92%' },
                opacity: 0, y: 36, duration: 0.7, delay: (i % 3) * 0.08, ease: 'power2.out'
            });
        });

        const milkFill = document.querySelector('.milk-meter-fill');
        if (milkFill && typeof ScrollTrigger !== 'undefined') {
            gsap.from(milkFill, {
                scrollTrigger: { trigger: milkFill, start: 'top 85%' },
                scaleX: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left'
            });
        }
    }

})();

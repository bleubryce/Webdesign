// Main JavaScript for Get Up & Down Golf Shopify Theme

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initHeader();
  initMobileMenu();
  initProductGallery();
  initQuantitySelectors();
  initCartDrawer();
  initAccordions();
  initNewsletterPopup();
  initProductRecommendations();
  initAnimations();
  
  // Add to cart functionality
  setupAddToCartForms();
  initHeroVideo();
});

// Header functionality
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  // Sticky header
  if (header.classList.contains('header-sticky')) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.classList.add('is-sticky');
        
        // Hide on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
      } else {
        header.classList.remove('is-sticky');
      }
      
      lastScrollTop = scrollTop;
    });
  }
  
  // Mega menu functionality
  const megaMenuTriggers = document.querySelectorAll('.has-mega-menu');
  
  megaMenuTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', function() {
      const megaMenu = this.querySelector('.mega-menu');
      if (megaMenu) {
        megaMenu.classList.add('is-active');
      }
    });
    
    trigger.addEventListener('mouseleave', function() {
      const megaMenu = this.querySelector('.mega-menu');
      if (megaMenu) {
        megaMenu.classList.remove('is-active');
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.mobile-menu-close');
  const overlay = document.querySelector('.mobile-menu-overlay');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', function() {
    mobileMenu.classList.add('is-active');
    document.body.classList.add('mobile-menu-open');
    if (overlay) overlay.classList.add('is-active');
  });
  
  if (closeMenu) {
    closeMenu.addEventListener('click', closeMobileMenu);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
  
  // Submenu toggles
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');
  
  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parent = this.closest('li');
      const submenu = parent.querySelector('.mobile-submenu');
      
      if (parent.classList.contains('submenu-active')) {
        parent.classList.remove('submenu-active');
        submenu.style.maxHeight = '0px';
      } else {
        parent.classList.add('submenu-active');
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
      }
    });
  });
  
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-active');
    document.body.classList.remove('mobile-menu-open');
    if (overlay) overlay.classList.remove('is-active');
  }
}

// Product gallery with zoom and slider
function initProductGallery() {
  const productGallery = document.querySelector('.product-gallery');
  if (!productGallery) return;
  
  const mainImage = productGallery.querySelector('.product-gallery-main');
  const thumbnails = productGallery.querySelectorAll('.product-gallery-thumbnail');
  
  // Thumbnail click handling
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      const imageId = this.dataset.imageId;
      const mediaType = this.dataset.mediaType;
      
      // Remove active class from all thumbnails
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      
      // Add active class to clicked thumbnail
      this.classList.add('active');
      
      // Show corresponding main image or video
      const mainMedia = productGallery.querySelectorAll('.product-gallery-item');
      mainMedia.forEach(item => {
        if (item.dataset.imageId === imageId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    });
  });
  
  // Image zoom functionality
  if (window.innerWidth > 768 && mainImage) {
    const zoomImages = mainImage.querySelectorAll('.zoom-enabled');
    
    zoomImages.forEach(image => {
      image.addEventListener('mousemove', function(e) {
        const zoomer = this;
        const offsetX = e.offsetX;
        const offsetY = e.offsetY;
        const x = (offsetX / zoomer.offsetWidth) * 100;
        const y = (offsetY / zoomer.offsetHeight) * 100;
        
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
      });
    });
  }
}

// Quantity selector functionality
function initQuantitySelectors() {
  const quantitySelectors = document.querySelectorAll('.quantity-selector');
  
  quantitySelectors.forEach(selector => {
    const decreaseBtn = selector.querySelector('.quantity-decrease');
    const increaseBtn = selector.querySelector('.quantity-increase');
    const input = selector.querySelector('.quantity-input');
    
    if (!decreaseBtn || !increaseBtn || !input) return;
    
    decreaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(input.value);
      if (currentValue > 1) {
        input.value = currentValue - 1;
        input.dispatchEvent(new Event('change'));
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      const currentValue = parseInt(input.value);
      input.value = currentValue + 1;
      input.dispatchEvent(new Event('change'));
    });
    
    input.addEventListener('change', function() {
      if (parseInt(this.value) < 1) {
        this.value = 1;
      }
    });
  });
}

// Cart drawer functionality
function initCartDrawer() {
  const cartDrawer = document.querySelector('.cart-drawer');
  if (!cartDrawer) return;
  
  const cartToggle = document.querySelector('.cart-toggle');
  const closeCart = document.querySelector('.cart-drawer-close');
  const overlay = document.querySelector('.cart-drawer-overlay');
  
  if (cartToggle) {
    cartToggle.addEventListener('click', function(e) {
      e.preventDefault();
      cartDrawer.classList.add('is-active');
      document.body.classList.add('cart-drawer-open');
      if (overlay) overlay.classList.add('is-active');
    });
  }
  
  if (closeCart) {
    closeCart.addEventListener('click', closeCartDrawer);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeCartDrawer);
  }
  
  function closeCartDrawer() {
    cartDrawer.classList.remove('is-active');
    document.body.classList.remove('cart-drawer-open');
    if (overlay) overlay.classList.remove('is-active');
  }
}

// Accordion functionality
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(accordion => {
    const triggers = accordion.querySelectorAll('.accordion-trigger');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const parent = this.parentElement;
        
        if (parent.classList.contains('is-active')) {
          parent.classList.remove('is-active');
          content.style.maxHeight = '0px';
        } else {
          // If accordion is exclusive, close other items
          if (accordion.classList.contains('accordion-exclusive')) {
            const activeItems = accordion.querySelectorAll('.accordion-item.is-active');
            activeItems.forEach(item => {
              item.classList.remove('is-active');
              item.querySelector('.accordion-content').style.maxHeight = '0px';
            });
          }
          
          parent.classList.add('is-active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
}

// Newsletter popup
function initNewsletterPopup() {
  const popup = document.querySelector('.newsletter-popup');
  if (!popup) return;
  
  const closePopup = popup.querySelector('.newsletter-popup-close');
  const overlay = document.querySelector('.newsletter-popup-overlay');
  const dontShowAgain = popup.querySelector('#dont-show-again');
  
  // Check if user has closed the popup before
  const popupClosed = localStorage.getItem('newsletter_popup_closed');
  
  if (!popupClosed) {
    // Show popup after 5 seconds
    setTimeout(function() {
      popup.classList.add('is-active');
      if (overlay) overlay.classList.add('is-active');
    }, 5000);
  }
  
  if (closePopup) {
    closePopup.addEventListener('click', function() {
      closeNewsletterPopup();
      
      if (dontShowAgain && dontShowAgain.checked) {
        localStorage.setItem('newsletter_popup_closed', 'true');
      }
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeNewsletterPopup);
  }
  
  function closeNewsletterPopup() {
    popup.classList.remove('is-active');
    if (overlay) overlay.classList.remove('is-active');
  }
}

// Product recommendations
function initProductRecommendations() {
  const container = document.querySelector('[data-product-recommendations]');
  if (!container) return;
  
  const productId = container.dataset.productId;
  const limit = container.dataset.limit || 4;
  
  if (!productId) return;
  
  // Fetch product recommendations
  fetch(`/recommendations/products?product_id=${productId}&limit=${limit}&section_id=product-recommendations`)
    .then(response => response.text())
    .then(text => {
      const html = document.createElement('div');
      html.innerHTML = text;
      const recommendations = html.querySelector('[data-product-recommendations]');
      
      if (recommendations && recommendations.innerHTML.trim().length) {
        container.innerHTML = recommendations.innerHTML;
        
        // Initialize any sliders or functionality for recommendations
        initProductRecommendationsSlider();
      } else {
        container.closest('.product-recommendations-section').style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Error fetching product recommendations:', error);
      container.closest('.product-recommendations-section').style.display = 'none';
    });
}

// Initialize product recommendations slider
function initProductRecommendationsSlider() {
  const slider = document.querySelector('.product-recommendations-slider');
  if (!slider) return;
  
  // Simple slider functionality
  const slideContainer = slider.querySelector('.product-recommendations-slides');
  const slides = slider.querySelectorAll('.product-recommendations-slide');
  const prevButton = slider.querySelector('.slider-prev');
  const nextButton = slider.querySelector('.slider-next');
  
  if (!slideContainer || !slides.length) return;
  
  let currentIndex = 0;
  const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 4;
  
  function updateSlider() {
    const slideWidth = 100 / slidesToShow;
    const offset = -currentIndex * slideWidth;
    slideContainer.style.transform = `translateX(${offset}%)`;
  }
  
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }
  
  if (nextButton) {
    nextButton.addEventListener('click', function() {
      if (currentIndex < slides.length - slidesToShow) {
        currentIndex++;
        updateSlider();
      }
    });
  }
  
  // Initialize slider
  updateSlider();
  
  // Update on window resize
  window.addEventListener('resize', function() {
    const newSlidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 4;
    
    if (newSlidesToShow !== slidesToShow) {
      slidesToShow = newSlidesToShow;
      currentIndex = 0;
      updateSlider();
    }
  });
}

// Add to cart functionality
function setupAddToCartForms() {
  const addToCartForms = document.querySelectorAll('form[action="/cart/add"]');
  
  addToCartForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitButton = form.querySelector('[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      
      // Change button text/state
      submitButton.innerHTML = 'Adding...';
      submitButton.disabled = true;
      
      // Get form data
      const formData = new FormData(form);
      
      // Add to cart via AJAX
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Update cart count
        updateCartCount();
        
        // Show success message or open cart drawer
        if (document.querySelector('.cart-drawer')) {
          // Fetch updated cart and open drawer
          fetch('/cart.js')
            .then(response => response.json())
            .then(cart => {
              updateCartDrawer(cart);
              document.querySelector('.cart-drawer').classList.add('is-active');
              document.body.classList.add('cart-drawer-open');
              document.querySelector('.cart-drawer-overlay').classList.add('is-active');
            });
        } else {
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.classList.add('add-to-cart-success');
          successMessage.innerHTML = `<span>${data.title} has been added to your cart!</span>`;
          
          document.body.appendChild(successMessage);
          
          setTimeout(() => {
            successMessage.classList.add('is-visible');
          }, 100);
          
          setTimeout(() => {
            successMessage.classList.remove('is-visible');
            setTimeout(() => {
              document.body.removeChild(successMessage);
            }, 300);
          }, 3000);
        }
        
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
        
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('add-to-cart-error');
        errorMessage.innerHTML = `<span>There was an error adding this item to your cart. Please try again.</span>`;
        
        document.body.appendChild(errorMessage);
        
        setTimeout(() => {
          errorMessage.classList.add('is-visible');
        }, 100);
        
        setTimeout(() => {
          errorMessage.classList.remove('is-visible');
          setTimeout(() => {
            document.body.removeChild(errorMessage);
          }, 300);
        }, 3000);
        
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      });
    });
  });
}

// Update cart count
function updateCartCount() {
  fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      const cartCountElements = document.querySelectorAll('.cart-count');
      
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
        
        if (cart.item_count > 0) {
          element.classList.add('has-items');
        } else {
          element.classList.remove('has-items');
        }
      });
    });
}

// Update cart drawer
function updateCartDrawer(cart) {
  const cartDrawerItems = document.querySelector('.cart-drawer-items');
  if (!cartDrawerItems) return;
  
  // Update cart items
  if (cart.item_count === 0) {
    cartDrawerItems.innerHTML = '<div class="cart-drawer-empty">Your cart is empty</div>';
  } else {
    let itemsHtml = '';
    
    cart.items.forEach(item => {
      itemsHtml += `
        <div class="cart-drawer-item" data-variant-id="${item.variant_id}">
          <div class="cart-drawer-item-image">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cart-drawer-item-content">
            <h4 class="cart-drawer-item-title">${item.title}</h4>
            <div class="cart-drawer-item-variant">${item.variant_title || ''}</div>
            <div class="cart-drawer-item-price">${formatMoney(item.price)}</div>
            <div class="cart-drawer-item-quantity">
              <button class="cart-drawer-item-quantity-decrease" data-variant-id="${item.variant_id}">-</button>
              <input type="number" class="cart-drawer-item-quantity-input" value="${item.quantity}" min="1" data-variant-id="${item.variant_id}">
              <button class="cart-drawer-item-quantity-increase" data-variant-id="${item.variant_id}">+</button>
            </div>
          </div>
          <button class="cart-drawer-item-remove" data-variant-id="${item.variant_id}">×</button>
        </div>
      `;
    });
    
    cartDrawerItems.innerHTML = itemsHtml;
    
    // Setup quantity changers and remove buttons
    setupCartDrawerItemControls();
  }
  
  // Update cart subtotal
  const cartDrawerSubtotal = document.querySelector('.cart-drawer-subtotal-value');
  if (cartDrawerSubtotal) {
    cartDrawerSubtotal.textContent = formatMoney(cart.total_price);
  }
}

// Setup cart drawer item controls
function setupCartDrawerItemControls() {
  // Quantity decrease buttons
  const decreaseButtons = document.querySelectorAll('.cart-drawer-item-quantity-decrease');
  decreaseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const variantId = this.dataset.variantId;
      const input = document.querySelector(`.cart-drawer-item-quantity-input[data-variant-id="${variantId}"]`);
      const currentValue = parseInt(input.value);
      
      if (currentValue > 1) {
        updateCartItemQuantity(variantId, currentValue - 1);
      }
    });
  });
  
  // Quantity increase buttons
  const increaseButtons = document.querySelectorAll('.cart-drawer-item-quantity-increase');
  increaseButtons.forEach(button => {
    button.addEventListener('click', function() {
      const variantId = this.dataset.variantId;
      const input = document.querySelector(`.cart-drawer-item-quantity-input[data-variant-id="${variantId}"]`);
      const currentValue = parseInt(input.value);
      
      updateCartItemQuantity(variantId, currentValue + 1);
    });
  });
  
  // Quantity inputs
  const quantityInputs = document.querySelectorAll('.cart-drawer-item-quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const variantId = this.dataset.variantId;
      const newValue = parseInt(this.value);
      
      if (newValue < 1) {
        this.value = 1;
        updateCartItemQuantity(variantId, 1);
      } else {
        updateCartItemQuantity(variantId, newValue);
      }
    });
  });
  
  // Remove buttons
  const removeButtons = document.querySelectorAll('.cart-drawer-item-remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const variantId = this.dataset.variantId;
      updateCartItemQuantity(variantId, 0);
    });
  });
}

// Update cart item quantity
function updateCartItemQuantity(variantId, quantity) {
  const updates = {};
  updates[variantId] = quantity;
  
  fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ updates })
  })
  .then(response => response.json())
  .then(cart => {
    updateCartDrawer(cart);
    updateCartCount();
  })
  .catch(error => {
    console.error('Error updating cart:', error);
  });
}

// Format money
function formatMoney(cents) {
  const value = (cents / 100).toFixed(2);
  return '$' + value;
}

// Animations
function initAnimations() {
  // Fade-in animations for elements
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (fadeElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Hero video functionality
function initHeroVideo() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  const video = heroSection.querySelector('.hero-video');
  const playButton = heroSection.querySelector('.hero-button');

  if (video && playButton) {
    playButton.addEventListener('click', () => video.play());
  }
}


// Cart Drawer Functionality
class CartDrawer {
  constructor() {
    this.drawer = document.getElementById('cart-drawer');
    this.overlay = this.drawer.querySelector('.cart-drawer-overlay');
    this.closeButton = this.drawer.querySelector('.cart-drawer-close');
    this.form = this.drawer.querySelector('.cart-drawer-form');
    this.items = this.drawer.querySelector('.cart-items');
    
    this.bindEvents();
  }

  bindEvents() {
    this.closeButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    // Quantity change handlers
    this.items.addEventListener('click', (e) => {
      if (e.target.matches('.quantity-decrease')) {
        this.updateQuantity(e.target.nextElementSibling, -1);
      } else if (e.target.matches('.quantity-increase')) {
        this.updateQuantity(e.target.previousElementSibling, 1);
      }
    });

    // Form submission
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.updateCart();
    });
  }

  open() {
    this.drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  async updateQuantity(input, change) {
    const newValue = parseInt(input.value) + change;
    if (newValue >= 0) {
      input.value = newValue;
      await this.updateCart();
    }
  }

  async updateCart() {
    const formData = new FormData(this.form);
    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        body: formData
      });
      const cart = await response.json();
      this.updateCartUI(cart);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }

  updateCartUI(cart) {
    // Update cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = cart.item_count;
    }

    // Update cart items
    if (cart.item_count === 0) {
      this.items.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon">
            ${this.getCartIcon()}
          </div>
          <p class="cart-empty-text">Your cart is empty</p>
          <a href="/collections/all" class="btn btn-primary">Continue Shopping</a>
        </div>
      `;
    } else {
      // Update existing items or render new ones
      this.renderCartItems(cart.items);
    }

    // Update subtotal
    const subtotal = this.drawer.querySelector('.cart-subtotal-price');
    if (subtotal) {
      subtotal.textContent = this.formatMoney(cart.total_price);
    }
  }

  renderCartItems(items) {
    this.items.innerHTML = items.map(item => `
      <div class="cart-item" data-item-key="${item.key}">
        <div class="cart-item-image">
          <a href="${item.url}">
            <img src="${item.image}" alt="${item.title}" loading="lazy" width="60" height="60">
          </a>
        </div>
        <div class="cart-item-content">
          <div class="cart-item-title">
            <a href="${item.url}">${item.product_title}</a>
            ${item.variant_title !== 'Default Title' ? `<p class="cart-item-variant">${item.variant_title}</p>` : ''}
          </div>
          <div class="cart-item-price">
            ${this.formatMoney(item.final_price)}
          </div>
          <div class="cart-item-quantity">
            <div class="quantity-selector">
              <button type="button" class="quantity-decrease" aria-label="Decrease quantity">-</button>
              <input type="number" name="updates[]" value="${item.quantity}" min="0" aria-label="Quantity" class="quantity-input" data-item-key="${item.key}">
              <button type="button" class="quantity-increase" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  formatMoney(cents) {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  getCartIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>`;
  }
}

// Search Drawer Functionality
class SearchDrawer {
  constructor() {
    this.drawer = document.getElementById('search-drawer');
    this.overlay = this.drawer.querySelector('.search-drawer-overlay');
    this.closeButton = this.drawer.querySelector('.search-drawer-close');
    this.searchInput = this.drawer.querySelector('.search-input');
    this.searchForm = this.drawer.querySelector('.search-form');
    this.resultsContainer = this.drawer.querySelector('.search-results');
    this.loadingElement = this.drawer.querySelector('.search-loading');
    this.emptyElement = this.drawer.querySelector('.search-empty');
    
    this.bindEvents();
  }

  bindEvents() {
    this.closeButton.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    let searchTimeout;
    this.searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.performSearch(this.searchInput.value);
    });
  }

  open() {
    this.drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.searchInput.focus();
  }

  close() {
    this.drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  async performSearch(query) {
    if (!query) {
      this.showEmpty();
      return;
    }

    this.showLoading();

    try {
      const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      this.displayResults(data);
    } catch (error) {
      console.error('Error performing search:', error);
      this.showEmpty();
    }
  }

  displayResults(data) {
    this.hideLoading();
    this.hideEmpty();

    const productsContainer = this.resultsContainer.querySelector('.search-results-products .search-results-grid');
    const collectionsContainer = this.resultsContainer.querySelector('.search-results-collections .search-results-list');
    const pagesContainer = this.resultsContainer.querySelector('.search-results-pages .search-results-list');

    // Display products
    if (data.products && data.products.length > 0) {
      productsContainer.innerHTML = data.products.map(product => `
        <div class="search-result-item">
          <a href="${product.url}" class="search-result-link">
            <div class="search-result-image">
              <img src="${product.featured_image.url}" alt="${product.title}" loading="lazy" width="60" height="60">
            </div>
            <div class="search-result-content">
              <h4 class="search-result-title">${product.title}</h4>
              <p class="search-result-price">${this.formatMoney(product.price)}</p>
            </div>
          </a>
        </div>
      `).join('');
    } else {
      productsContainer.innerHTML = '<p class="search-no-results">No products found</p>';
    }

    // Display collections
    if (data.collections && data.collections.length > 0) {
      collectionsContainer.innerHTML = data.collections.map(collection => `
        <div class="search-result-item">
          <a href="${collection.url}" class="search-result-link">
            <div class="search-result-content">
              <h4 class="search-result-title">${collection.title}</h4>
            </div>
          </a>
        </div>
      `).join('');
    } else {
      collectionsContainer.innerHTML = '<p class="search-no-results">No collections found</p>';
    }

    // Display pages
    if (data.pages && data.pages.length > 0) {
      pagesContainer.innerHTML = data.pages.map(page => `
        <div class="search-result-item">
          <a href="${page.url}" class="search-result-link">
            <div class="search-result-content">
              <h4 class="search-result-title">${page.title}</h4>
            </div>
          </a>
        </div>
      `).join('');
    } else {
      pagesContainer.innerHTML = '<p class="search-no-results">No pages found</p>';
    }
  }

  showLoading() {
    this.loadingElement.style.display = 'flex';
    this.resultsContainer.style.display = 'none';
    this.emptyElement.style.display = 'none';
  }

  hideLoading() {
    this.loadingElement.style.display = 'none';
    this.resultsContainer.style.display = 'block';
  }

  showEmpty() {
    this.emptyElement.style.display = 'flex';
    this.resultsContainer.style.display = 'none';
    this.loadingElement.style.display = 'none';
  }

  hideEmpty() {
    this.emptyElement.style.display = 'none';
  }

  formatMoney(cents) {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }
}

// Initialize cart and search drawers
document.addEventListener('DOMContentLoaded', () => {
  const cartDrawer = new CartDrawer();
  const searchDrawer = new SearchDrawer();

  // Add click handlers to cart and search buttons
  document.querySelectorAll('.cart-trigger').forEach(button => {
    button.addEventListener('click', () => cartDrawer.open());
  });

  document.querySelectorAll('.search-trigger').forEach(button => {
    button.addEventListener('click', () => searchDrawer.open());
  });
});

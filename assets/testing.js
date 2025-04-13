// Testing Script for Get Up & Down Golf Shopify Theme
// This script helps test various functionality of the Shopify store

document.addEventListener('DOMContentLoaded', function() {
  // Initialize testing functions
  console.log('Shopify Store Testing Script Initialized');
  
  // Test responsive design
  testResponsiveDesign();
  
  // Test navigation functionality
  testNavigation();
  
  // Test product functionality
  testProductFunctionality();
  
  // Test collection filtering and sorting
  testCollectionFunctionality();
  
  // Test cart functionality
  testCartFunctionality();
  
  // Test form submissions
  testFormSubmissions();
  
  // Test SEO elements
  testSEOElements();
  
  // Log test completion
  console.log('All tests completed. Check console for results.');
});

/**
 * Tests responsive design breakpoints and elements
 */
function testResponsiveDesign() {
  console.log('Testing Responsive Design...');
  
  // Get current viewport width
  const viewportWidth = window.innerWidth;
  console.log(`Current viewport width: ${viewportWidth}px`);
  
  // Check which breakpoint we're at
  let currentBreakpoint = '';
  if (viewportWidth < 576) {
    currentBreakpoint = 'xs (mobile)';
  } else if (viewportWidth < 768) {
    currentBreakpoint = 'sm (small tablet)';
  } else if (viewportWidth < 992) {
    currentBreakpoint = 'md (large tablet)';
  } else if (viewportWidth < 1200) {
    currentBreakpoint = 'lg (desktop)';
  } else {
    currentBreakpoint = 'xl (large desktop)';
  }
  console.log(`Current breakpoint: ${currentBreakpoint}`);
  
  // Test container width
  const container = document.querySelector('.container');
  if (container) {
    console.log(`Container width: ${container.offsetWidth}px`);
  }
  
  // Test mobile menu visibility
  const mobileMenuToggle = document.querySelector('.header-mobile-toggle');
  const desktopNav = document.querySelector('.header-navigation');
  
  if (viewportWidth < 992) {
    console.log('Mobile breakpoint: Mobile menu toggle should be visible');
    if (mobileMenuToggle && window.getComputedStyle(mobileMenuToggle).display !== 'none') {
      console.log('✓ Mobile menu toggle is visible');
    } else {
      console.warn('✗ Mobile menu toggle is not visible or not found');
    }
    
    if (desktopNav && window.getComputedStyle(desktopNav).display === 'none') {
      console.log('✓ Desktop navigation is hidden');
    } else {
      console.warn('✗ Desktop navigation is visible or not found');
    }
  } else {
    console.log('Desktop breakpoint: Desktop navigation should be visible');
    if (desktopNav && window.getComputedStyle(desktopNav).display !== 'none') {
      console.log('✓ Desktop navigation is visible');
    } else {
      console.warn('✗ Desktop navigation is not visible or not found');
    }
    
    if (mobileMenuToggle && window.getComputedStyle(mobileMenuToggle).display === 'none') {
      console.log('✓ Mobile menu toggle is hidden');
    } else {
      console.warn('✗ Mobile menu toggle is visible or not found');
    }
  }
  
  // Test image responsiveness
  const images = document.querySelectorAll('img');
  let responsiveImagesCount = 0;
  
  images.forEach(img => {
    if (img.hasAttribute('srcset') || img.hasAttribute('sizes')) {
      responsiveImagesCount++;
    }
  });
  
  console.log(`Found ${responsiveImagesCount} of ${images.length} images with responsive attributes`);
  
  // Test touch target sizes on mobile
  if (viewportWidth < 768) {
    const touchTargets = document.querySelectorAll('button, .btn, a.btn, input[type="button"], input[type="submit"]');
    let adequateTouchTargets = 0;
    
    touchTargets.forEach(target => {
      const height = target.offsetHeight;
      if (height >= 44) {
        adequateTouchTargets++;
      }
    });
    
    console.log(`Found ${adequateTouchTargets} of ${touchTargets.length} touch targets with adequate size (≥44px)`);
  }
}

/**
 * Tests navigation functionality
 */
function testNavigation() {
  console.log('Testing Navigation Functionality...');
  
  // Test mobile menu toggle
  const mobileMenuToggle = document.querySelector('.header-mobile-toggle');
  const mobileMenu = document.querySelector('.header-mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    console.log('Mobile menu elements found');
    
    // Add test click handler
    mobileMenuToggle.addEventListener('click', function testClick() {
      console.log('Mobile menu toggle clicked');
      
      // Check if menu becomes visible
      setTimeout(() => {
        if (mobileMenu.classList.contains('active')) {
          console.log('✓ Mobile menu opened successfully');
        } else {
          console.warn('✗ Mobile menu did not open');
        }
        
        // Remove test handler
        mobileMenuToggle.removeEventListener('click', testClick);
      }, 300);
    });
    
    // Don't actually trigger the click in automated testing
    console.log('Mobile menu toggle click test ready (manual verification required)');
  } else {
    console.log('Mobile menu elements not found on this page');
  }
  
  // Test dropdown menus
  const dropdownTriggers = document.querySelectorAll('.has-dropdown > a');
  
  if (dropdownTriggers.length > 0) {
    console.log(`Found ${dropdownTriggers.length} dropdown menus`);
    
    dropdownTriggers.forEach((trigger, index) => {
      // Add test hover handler
      trigger.addEventListener('mouseenter', function testHover() {
        console.log(`Dropdown ${index + 1} hovered`);
        
        // Check if dropdown becomes visible
        const dropdown = trigger.nextElementSibling;
        if (dropdown && window.getComputedStyle(dropdown).display !== 'none') {
          console.log(`✓ Dropdown ${index + 1} opened successfully on hover`);
        } else {
          console.warn(`✗ Dropdown ${index + 1} did not open on hover`);
        }
        
        // Remove test handler
        trigger.removeEventListener('mouseenter', testHover);
      });
      
      // Don't actually trigger the hover in automated testing
      console.log(`Dropdown ${index + 1} hover test ready (manual verification required)`);
    });
  } else {
    console.log('No dropdown menus found on this page');
  }
  
  // Test active page highlighting
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.header-navigation a, .header-mobile-menu a');
  let activeLinksFound = 0;
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath && link.classList.contains('active')) {
      activeLinksFound++;
    }
  });
  
  if (activeLinksFound > 0) {
    console.log(`✓ Found ${activeLinksFound} correctly highlighted active navigation links`);
  } else {
    console.warn('✗ No active navigation links found for current page');
  }
}

/**
 * Tests product page functionality
 */
function testProductFunctionality() {
  console.log('Testing Product Functionality...');
  
  // Check if we're on a product page
  const productForm = document.querySelector('form[action="/cart/add"]');
  if (!productForm) {
    console.log('Not on a product page, skipping product tests');
    return;
  }
  
  console.log('Product page detected');
  
  // Test variant selectors
  const variantSelectors = productForm.querySelectorAll('select[data-option-index]');
  if (variantSelectors.length > 0) {
    console.log(`Found ${variantSelectors.length} variant selectors`);
    
    // Test if changing variant updates price and availability
    variantSelectors.forEach((selector, index) => {
      console.log(`Testing variant selector ${index + 1}`);
      
      // Get current selection
      const currentOption = selector.options[selector.selectedIndex];
      console.log(`Current selection: ${currentOption.value}`);
      
      // Find a different option to test with
      let differentOptionIndex = -1;
      for (let i = 0; i < selector.options.length; i++) {
        if (i !== selector.selectedIndex) {
          differentOptionIndex = i;
          break;
        }
      }
      
      if (differentOptionIndex >= 0) {
        console.log(`Will test with option: ${selector.options[differentOptionIndex].value}`);
        console.log('Change event test ready (manual verification required)');
      } else {
        console.log('No alternative options available for testing');
      }
    });
  } else {
    console.log('No variant selectors found, product may have only one variant');
  }
  
  // Test quantity selector
  const quantityInput = productForm.querySelector('input[name="quantity"]');
  if (quantityInput) {
    console.log('Quantity selector found');
    
    // Test quantity increment/decrement buttons
    const quantityDecrease = document.querySelector('.quantity-decrease');
    const quantityIncrease = document.querySelector('.quantity-increase');
    
    if (quantityDecrease && quantityIncrease) {
      console.log('Quantity controls found');
      console.log('Quantity control test ready (manual verification required)');
    } else {
      console.warn('Quantity increment/decrement controls not found');
    }
  } else {
    console.warn('Quantity selector not found');
  }
  
  // Test product image gallery
  const productGallery = document.querySelector('.product-gallery');
  if (productGallery) {
    console.log('Product gallery found');
    
    const galleryItems = productGallery.querySelectorAll('.product-gallery-item');
    const thumbnails = productGallery.querySelectorAll('.product-gallery-thumbnail');
    
    console.log(`Found ${galleryItems.length} gallery items and ${thumbnails.length} thumbnails`);
    
    if (thumbnails.length > 0) {
      console.log('Thumbnail click test ready (manual verification required)');
    }
    
    // Test zoom functionality if enabled
    const zoomImages = productGallery.querySelectorAll('.zoom-enabled');
    if (zoomImages.length > 0) {
      console.log(`Found ${zoomImages.length} zoomable images`);
      console.log('Zoom functionality test ready (manual verification required)');
    } else {
      console.log('No zoomable images found');
    }
  } else {
    console.warn('Product gallery not found');
  }
  
  // Test product tabs
  const productTabs = document.querySelector('.product-tabs');
  if (productTabs) {
    console.log('Product tabs found');
    
    const tabTriggers = productTabs.querySelectorAll('.product-tab-trigger');
    const tabContents = productTabs.querySelectorAll('.product-tab-content');
    
    console.log(`Found ${tabTriggers.length} tab triggers and ${tabContents.length} tab contents`);
    
    if (tabTriggers.length > 0) {
      console.log('Tab click test ready (manual verification required)');
    }
  } else {
    console.log('No product tabs found');
  }
}

/**
 * Tests collection page functionality
 */
function testCollectionFunctionality() {
  console.log('Testing Collection Functionality...');
  
  // Check if we're on a collection page
  const collectionTemplate = document.querySelector('.collection-template');
  if (!collectionTemplate) {
    console.log('Not on a collection page, skipping collection tests');
    return;
  }
  
  console.log('Collection page detected');
  
  // Test sort functionality
  const sortSelect = document.getElementById('SortBy');
  if (sortSelect) {
    console.log('Sort selector found');
    console.log(`Current sort: ${sortSelect.value}`);
    console.log('Sort change test ready (manual verification required)');
  } else {
    console.warn('Sort selector not found');
  }
  
  // Test filter functionality
  const filterToggle = document.querySelector('.filter-toggle-button');
  const filters = document.getElementById('collection-filters');
  
  if (filterToggle && filters) {
    console.log('Filter elements found');
    console.log('Filter toggle test ready (manual verification required)');
    
    // Test filter form
    const filterForm = document.getElementById('CollectionFiltersForm');
    if (filterForm) {
      console.log('Filter form found');
      
      const filterInputs = filterForm.querySelectorAll('[data-filter-update]');
      console.log(`Found ${filterInputs.length} filter inputs`);
      
      if (filterInputs.length > 0) {
        console.log('Filter input change test ready (manual verification required)');
      }
    } else {
      console.warn('Filter form not found');
    }
  } else {
    console.warn('Filter elements not found');
  }
  
  // Test view toggle (grid/list)
  const gridViewButton = document.querySelector('.grid-view');
  const listViewButton = document.querySelector('.list-view');
  
  if (gridViewButton && listViewButton) {
    console.log('View toggle buttons found');
    console.log('View toggle test ready (manual verification required)');
  } else {
    console.log('View toggle buttons not found');
  }
  
  // Test pagination
  const pagination = document.querySelector('.pagination');
  if (pagination) {
    console.log('Pagination found');
    
    const paginationLinks = pagination.querySelectorAll('a');
    console.log(`Found ${paginationLinks.length} pagination links`);
    
    if (paginationLinks.length > 0) {
      console.log('Pagination link test ready (manual verification required)');
    }
  } else {
    console.log('No pagination found, collection may have only one page');
  }
}

/**
 * Tests cart functionality
 */
function testCartFunctionality() {
  console.log('Testing Cart Functionality...');
  
  // Test add to cart buttons
  const addToCartButtons = document.querySelectorAll('button[name="add"], .product-card-add');
  
  if (addToCartButtons.length > 0) {
    console.log(`Found ${addToCartButtons.length} add to cart buttons`);
    console.log('Add to cart test ready (manual verification required)');
  } else {
    console.log('No add to cart buttons found on this page');
  }
  
  // Check if we're on the cart page
  const cartPage = document.querySelector('.cart-template');
  if (!cartPage) {
    console.log('Not on cart page, skipping cart page specific tests');
    return;
  }
  
  console.log('Cart page detected');
  
  // Test quantity update
  const quantityInputs = document.querySelectorAll('.cart-item-quantity input');
  if (quantityInputs.length > 0) {
    console.log(`Found ${quantityInputs.length} cart quantity inputs`);
    console.log('Cart quantity update test ready (manual verification required)');
  } else {
    console.log('No cart quantity inputs found, cart may be empty');
  }
  
  // Test remove buttons
  const removeButtons = document.querySelectorAll('.cart-item-remove button');
  if (removeButtons.length > 0) {
    console.log(`Found ${removeButtons.length} cart remove buttons`);
    console.log('Cart remove item test ready (manual verification required)');
  } else {
    console.log('No cart remove buttons found, cart may be empty');
  }
  
  // Test checkout button
  const checkoutButton = document.querySelector('.cart-checkout-button');
  if (checkoutButton) {
    console.log('Checkout button found');
    console.log('Checkout button test ready (manual verification required)');
  } else {
    console.warn('Checkout button not found');
  }
}

/**
 * Tests form submissions
 */
function testFormSubmissions() {
  console.log('Testing Form Submissions...');
  
  // Test newsletter form
  const newsletterForm = document.querySelector('form.newsletter-form');
  if (newsletterForm) {
    console.log('Newsletter form found');
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    
    if (emailInput && submitButton) {
      console.log('Newsletter form elements found');
      console.log('Newsletter form submission test ready (manual verification required)');
    } else {
      console.warn('Newsletter form elements not found');
    }
  } else {
    console.log('No newsletter form found on this page');
  }
  
  // Test contact form
  const contactForm = document.querySelector('form[action="/contact#contact_form"]');
  if (contactForm) {
    console.log('Contact form found');
    
    const requiredInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    console.log(`Found ${requiredInputs.length} required fields in contact form`);
    
    console.log('Contact form submission test ready (manual verification required)');
  } else {
    console.log('No contact form found on this page');
  }
  
  // Test search form
  const searchForm = document.querySelector('form[action="/search"]');
  if (searchForm) {
    console.log('Search form found');
    
    const searchInput = searchForm.querySelector('input[type="search"]');
    const searchButton = searchForm.querySelector('button[type="submit"]');
    
    if (searchInput && searchButton) {
      console.log('Search form elements found');
      console.log('Search form submission test ready (manual verification required)');
    } else {
      console.warn('Search form elements not found');
    }
  } else {
    console.log('No search form found on this page');
  }
}

/**
 * Tests SEO elements
 */
function testSEOElements() {
  console.log('Testing SEO Elements...');
  
  // Test meta tags
  const metaTags = {
    title: document.querySelector('title'),
    description: document.querySelector('meta[name="description"]'),
    keywords: document.querySelector('meta[name="keywords"]'),
    canonical: document.querySelector('link[rel="canonical"]'),
    ogTitle: document.querySelector('meta[property="og:title"]'),
    ogDescription: document.querySelector('meta[property="og:description"]'),
    ogImage: document.querySelector('meta[property="og:image"]'),
    ogUrl: document.querySelector('meta[property="og:url"]'),
    ogType: document.querySelector('meta[property="og:type"]'),
    twitterCard: document.querySelector('meta[name="twitter:card"]'),
    twitterTitle: document.querySelector('meta[name="twitter:title"]'),
    twitterDescription: document.querySelector('meta[name="twitter:description"]'),
    twitterImage: document.querySelector('meta[name="twitter:image"]')
  };
  
  let metaTagsFound = 0;
  for (const [key, value] of Object.entries(metaTags)) {
    if (value) {
      metaTagsFound++;
      console.log(`✓ ${key} meta tag found`);
    } else {
      console.warn(`✗ ${key} meta tag not found`);
    }
  }
  
  console.log(`Found ${metaTagsFound} of ${Object.keys(metaTags).length} important meta tags`);
  
  // Test structured data
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length > 0) {
    console.log(`✓ Found ${structuredData.length} structured data scripts`);
    
    structuredData.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent);
        console.log(`✓ Structured data script ${index + 1} is valid JSON`);
        console.log(`  Type: ${data['@type'] || 'Unknown'}`);
      } catch (error) {
        console.warn(`✗ Structured data script ${index + 1} contains invalid JSON`);
      }
    });
  } else {
    console.warn('✗ No structured data found');
  }
  
  // Test heading hierarchy
  const h1Tags = document.querySelectorAll('h1');
  const h2Tags = document.querySelectorAll('h2');
  const h3Tags = document.querySelectorAll('h3');
  
  if (h1Tags.length === 1) {
    console.log('✓ Page has exactly one H1 tag');
  } else if (h1Tags.length === 0) {
    console.warn('✗ Page is missing an H1 tag');
  } else {
    console.warn(`✗ Page has ${h1Tags.length} H1 tags (should have exactly one)`);
  }
  
  console.log(`Found ${h2Tags.length} H2 tags and ${h3Tags.length} H3 tags`);
  
  // Test image alt attributes
  const images = document.querySelectorAll('img');
  let imagesWithAlt = 0;
  
  images.forEach(img => {
    if (img.hasAttribute('alt')) {
      imagesWithAlt++;
    }
  });
  
  console.log(`${imagesWithAlt} of ${images.length} images have alt attributes`);
  
  // Test links
  const links = document.querySelectorAll('a');
  let linksWithTitle = 0;
  let externalLinksWithRel = 0;
  let externalLinks = 0;
  
  links.forEach(link => {
    if (link.hasAttribute('title')) {
      linksWithTitle++;
    }
    
    if (link.hostname !== window.location.hostname && link.hostname !== '') {
      externalLinks++;
      if (link.hasAttribute('rel') && (link.getAttribute('rel').includes('noopener') || link.getAttribute('rel').includes('noreferrer'))) {
        externalLinksWithRel++;
      }
    }
  });
  
  console.log(`${linksWithTitle} of ${links.length} links have title attributes`);
  console.log(`${externalLinksWithRel} of ${externalLinks} external links have proper rel attributes`);
}

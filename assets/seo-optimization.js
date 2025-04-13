// SEO Optimization Script for Get Up & Down Golf Shopify Theme
// This script enhances SEO performance by implementing best practices

document.addEventListener('DOMContentLoaded', function() {
  // Lazy load images for better performance
  lazyLoadImages();
  
  // Add structured data for products
  addProductStructuredData();
  
  // Add structured data for organization
  addOrganizationStructuredData();
  
  // Enhance internal linking
  enhanceInternalLinking();
  
  // Optimize image alt tags
  optimizeImageAltTags();
  
  // Track outbound links
  trackOutboundLinks();
});

/**
 * Lazy loads images for better page performance
 */
function lazyLoadImages() {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyImages = document.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            if (image.dataset.srcset) {
              image.srcset = image.dataset.srcset;
            }
            image.classList.remove('lazy-image');
            imageObserver.unobserve(image);
          }
        });
      });
      
      lazyImages.forEach(image => {
        imageObserver.observe(image);
      });
    } else {
      // Fallback for browsers without IntersectionObserver support
      let active = false;
      
      const lazyLoad = function() {
        if (active === false) {
          active = true;
          
          setTimeout(function() {
            lazyImages.forEach(lazyImage => {
              if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== 'none') {
                lazyImage.src = lazyImage.dataset.src;
                if (lazyImage.dataset.srcset) {
                  lazyImage.srcset = lazyImage.dataset.srcset;
                }
                lazyImage.classList.remove('lazy-image');
                
                lazyImages = lazyImages.filter(image => image !== lazyImage);
                
                if (lazyImages.length === 0) {
                  document.removeEventListener('scroll', lazyLoad);
                  window.removeEventListener('resize', lazyLoad);
                  window.removeEventListener('orientationchange', lazyLoad);
                }
              }
            });
            
            active = false;
          }, 200);
        }
      };
      
      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
      lazyLoad();
    }
  }
}

/**
 * Adds structured data for products using JSON-LD
 */
function addProductStructuredData() {
  const productElement = document.querySelector('.product-template');
  
  if (!productElement) return;
  
  try {
    const productData = JSON.parse(document.getElementById('ProductJson-product-template').textContent);
    
    if (!productData) return;
    
    const selectedVariant = productData.variants.find(variant => {
      return variant.id === parseInt(document.querySelector('input[name="id"]').value);
    });
    
    if (!selectedVariant) return;
    
    const structuredData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: productData.title,
      image: productData.featured_image,
      description: productData.description.replace(/<[^>]*>?/gm, '').trim(),
      sku: selectedVariant.sku || '',
      brand: {
        '@type': 'Brand',
        name: productData.vendor || 'Get Up & Down Golf'
      },
      offers: {
        '@type': 'Offer',
        url: window.location.href,
        priceCurrency: 'USD',
        price: selectedVariant.price / 100,
        availability: selectedVariant.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Get Up & Down Golf'
        }
      }
    };
    
    // Add review data if available
    if (productData.reviews && productData.reviews.length > 0) {
      structuredData.review = productData.reviews.map(review => {
        return {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: review.rating,
            bestRating: '5'
          },
          author: {
            '@type': 'Person',
            name: review.author
          },
          reviewBody: review.content
        };
      });
      
      // Add aggregate rating
      const totalRating = productData.reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / productData.reviews.length;
      
      structuredData.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: averageRating.toFixed(1),
        reviewCount: productData.reviews.length
      };
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error adding product structured data:', error);
  }
}

/**
 * Adds organization structured data using JSON-LD
 */
function addOrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsGoodsStore',
    name: 'Get Up & Down Golf',
    url: window.location.origin,
    logo: window.location.origin + '/assets/logo.png',
    sameAs: [
      'https://www.facebook.com/getupanddowngolf',
      'https://www.instagram.com/getupanddowngolf',
      'https://twitter.com/getupanddowngolf'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: window.location.origin + '/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

/**
 * Enhances internal linking for better SEO
 */
function enhanceInternalLinking() {
  // Add rel attributes to external links
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  externalLinks.forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  });
  
  // Add title attributes to links without them
  const linksWithoutTitle = document.querySelectorAll('a:not([title])');
  linksWithoutTitle.forEach(link => {
    if (link.textContent.trim()) {
      link.setAttribute('title', link.textContent.trim());
    }
  });
}

/**
 * Optimizes image alt tags for better SEO and accessibility
 */
function optimizeImageAltTags() {
  const images = document.querySelectorAll('img:not([alt])');
  images.forEach(img => {
    // Try to generate alt text from parent elements or filename
    let altText = '';
    
    // Check if image is in a product context
    const productParent = img.closest('.product-card, .product-gallery-item');
    if (productParent) {
      const productTitle = productParent.querySelector('.product-card-title, .product-title');
      if (productTitle) {
        altText = productTitle.textContent.trim() + ' - Get Up & Down Golf';
      }
    }
    
    // If no alt text was found, use the filename as a fallback
    if (!altText && img.src) {
      const filename = img.src.split('/').pop().split('?')[0];
      altText = filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '');
      // Capitalize first letter of each word
      altText = altText.replace(/\b\w/g, l => l.toUpperCase());
    }
    
    // Set the alt attribute
    if (altText) {
      img.setAttribute('alt', altText);
    } else {
      // If we couldn't determine a meaningful alt text, use an empty alt for decorative images
      img.setAttribute('alt', '');
    }
  });
}

/**
 * Tracks outbound links for analytics
 */
function trackOutboundLinks() {
  const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
  
  externalLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      // If analytics is available, track the outbound link
      if (typeof gtag === 'function') {
        event.preventDefault();
        
        gtag('event', 'click', {
          'event_category': 'outbound',
          'event_label': link.href,
          'transport_type': 'beacon',
          'event_callback': function() {
            document.location = link.href;
          }
        });
      }
    });
  });
}

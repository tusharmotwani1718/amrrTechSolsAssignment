import React from 'react';
import { 
  AiOutlineFacebook, 
  AiOutlineTwitter, 
  AiOutlineInstagram, 
  AiOutlineYoutube,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineHeart
} from 'react-icons/ai';

const Footer = ({ 
  footerSections = [], 
  socialLinks = [], 
  contactInfo = {},
  companyInfo = {},
  paymentMethods = [],
  showNewsletter = true 
}) => {
  const currentYear = new Date().getFullYear();

  const defaultSocialIcons = {
    facebook: AiOutlineFacebook,
    twitter: AiOutlineTwitter,
    instagram: AiOutlineInstagram,
    youtube: AiOutlineYoutube
  };

  return (
    <footer className="bg-surface dark:bg-dark-surface border-t border-border dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="py-8 border-b border-border dark:border-dark-border">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-text dark:text-dark-text font-heading mb-2">
                Stay Updated
              </h3>
              <p className="text-text-muted dark:text-dark-text-muted mb-6">
                Subscribe to our newsletter for the latest deals and updates
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-border dark:border-dark-border rounded-lg bg-background dark:bg-dark-background text-text dark:text-dark-text placeholder-text-muted dark:placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
                />
                <button className="px-6 py-3 bg-primary dark:bg-dark-primary text-white rounded-lg hover:bg-primary/90 dark:hover:bg-dark-primary/90 transition-colors duration-200 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-primary dark:text-dark-primary font-heading mb-4">
                {companyInfo.name || 'ShopLogo'}
              </h3>
              <p className="text-text-muted dark:text-dark-text-muted mb-6 leading-relaxed">
                {companyInfo.description || 'Your trusted e-commerce destination for quality products and exceptional service.'}
              </p>
              
              {/* Contact Info */}
              {contactInfo && (
                <div className="space-y-3">
                  {contactInfo.email && (
                    <div className="flex items-center text-text-muted dark:text-dark-text-muted">
                      <AiOutlineMail className="h-5 w-5 mr-3 text-primary dark:text-dark-primary" />
                      <span className="text-sm">{contactInfo.email}</span>
                    </div>
                  )}
                  {contactInfo.phone && (
                    <div className="flex items-center text-text-muted dark:text-dark-text-muted">
                      <AiOutlinePhone className="h-5 w-5 mr-3 text-primary dark:text-dark-primary" />
                      <span className="text-sm">{contactInfo.phone}</span>
                    </div>
                  )}
                  {contactInfo.address && (
                    <div className="flex items-start text-text-muted dark:text-dark-text-muted">
                      <AiOutlineEnvironment className="h-5 w-5 mr-3 text-primary dark:text-dark-primary mt-0.5" />
                      <span className="text-sm">{contactInfo.address}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dynamic Footer Sections */}
            {footerSections.map((section, sectionIndex) => (
              <div key={section.id || sectionIndex} className="lg:col-span-1">
                <h4 className="text-lg font-semibold text-text dark:text-dark-text font-heading mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links && section.links.map((link, linkIndex) => (
                    <li key={link.id || linkIndex}>
                      <a
                        href={link.href}
                        className="text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border dark:border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center text-text-muted dark:text-dark-text-muted text-sm">
              <span>© {currentYear} {companyInfo.name || 'ShopLogo'}. All rights reserved.</span>
              <AiOutlineHeart className="h-4 w-4 mx-2 text-error dark:text-dark-error" />
              <span>Made with love</span>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-text-muted dark:text-dark-text-muted text-sm mr-2">Follow us:</span>
                {socialLinks.map((social, index) => {
                  const IconComponent = defaultSocialIcons[social.platform] || AiOutlineFacebook;
                  return (
                    <a
                      key={social.id || index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-200"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}

            {/* Payment Methods */}
            {paymentMethods.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-text-muted dark:text-dark-text-muted text-sm mr-2">We accept:</span>
                {paymentMethods.map((method, index) => (
                  <div
                    key={method.id || index}
                    className="px-2 py-1 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded text-xs text-text-muted dark:text-dark-text-muted"
                  >
                    {method.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Example usage:
// const footerSections = [
//   {
//     id: 1,
//     title: 'Shop',
//     links: [
//       { id: 1, name: 'All Products', href: '/products' },
//       { id: 2, name: 'Categories', href: '/categories' },
//       { id: 3, name: 'Sale', href: '/sale' }
//     ]
//   },
//   {
//     id: 2,
//     title: 'Support',
//     links: [
//       { id: 1, name: 'Help Center', href: '/help' },
//       { id: 2, name: 'Contact Us', href: '/contact' },
//       { id: 3, name: 'Returns', href: '/returns' }
//     ]
//   }
// ];

// const socialLinks = [
//   { id: 1, platform: 'facebook', href: 'https://facebook.com' },
//   { id: 2, platform: 'twitter', href: 'https://twitter.com' },
//   { id: 3, platform: 'instagram', href: 'https://instagram.com' }
// ];

// const contactInfo = {
//   email: 'hello@shop.com',
//   phone: '+1 (555) 123-4567',
//   address: '123 Commerce St, City, State 12345'
// };

// const companyInfo = {
//   name: 'ShopLogo',
//   description: 'Your trusted e-commerce destination.'
// };

// const paymentMethods = [
//   { id: 1, name: 'Visa' },
//   { id: 2, name: 'Mastercard' },
//   { id: 3, name: 'PayPal' }
// ];

// <Footer 
//   footerSections={footerSections}
//   socialLinks={socialLinks}
//   contactInfo={contactInfo}
//   companyInfo={companyInfo}
//   paymentMethods={paymentMethods}
//   showNewsletter={true}
// />

export default Footer;
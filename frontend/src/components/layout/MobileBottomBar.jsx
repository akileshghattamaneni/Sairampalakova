import { memo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE, waLink } from '../../config/site';

function MobileBottomBar() {
  const [actionsOpen, setActionsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleActions = (e) => {
    e.preventDefault();
    setActionsOpen((prev) => !prev);
  };

  return (
    <>
      {/* 1. Immersive Dimming Backdrop Overlay */}
      <AnimatePresence>
        {actionsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActionsOpen(false)}
            className="mob-nav-overlay"
          />
        )}
      </AnimatePresence>

      {/* 2. Floating Action Drawer + Bottom Navigation Bar */}
      <div className="mobile-bottom-bar-wrapper d-lg-none" role="navigation" aria-label="Mobile navigation">
        <nav className="mobile-bottom-nav">
          {/* 1. Home */}
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}
          >
            <motion.div whileTap={{ scale: 0.9 }} className="mob-nav-icon-wrap">
              <span className="mob-nav-icon">🏠</span>
              <span className="mob-nav-label">Home</span>
            </motion.div>
          </NavLink>

          {/* 2. Our Story */}
          <NavLink 
            to="/about" 
            className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}
          >
            <motion.div whileTap={{ scale: 0.9 }} className="mob-nav-icon-wrap">
              <span className="mob-nav-icon">📖</span>
              <span className="mob-nav-label">Our Story</span>
            </motion.div>
          </NavLink>

          {/* 3. Center CTA: Order (Circular Toggle Button) */}
          <div className="mob-nav-item-cta">
            <AnimatePresence>
              {actionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.85, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: 35, scale: 0.85, x: '-50%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className="mob-nav-actions-popup"
                >
                  {/* Green Action: Chat on WhatsApp */}
                  <a
                    href={waLink("Hello, I would like to place an order.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mob-action-item"
                    onClick={() => setActionsOpen(false)}
                  >
                    <div className="mob-action-circle wa-bg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span className="mob-action-label">Chat</span>
                  </a>

                  {/* Gold Action: Direct Call */}
                  <a
                    href={`tel:${SITE.phone}`}
                    className="mob-action-item"
                    onClick={() => setActionsOpen(false)}
                  >
                    <div className="mob-action-circle call-bg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                    <span className="mob-action-label">Call</span>
                  </a>

                  {/* Blue Action: Location Map */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mob-action-item"
                    onClick={() => setActionsOpen(false)}
                  >
                    <div className="mob-action-circle map-bg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="mob-action-label">Map</span>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="button"
              onClick={toggleActions}
              className="mob-cta-circle"
              whileTap={{ scale: 0.9 }}
              animate={actionsOpen ? { rotate: 0 } : {}}
            >
              <span className="mob-cta-circle-icon">{actionsOpen ? '✕' : '🛒'}</span>
              <span className="mob-cta-circle-label">{actionsOpen ? 'Close' : 'Order'}</span>
            </motion.button>
          </div>

          {/* 4. Shop */}
          <NavLink 
            to="/products" 
            className={({ isActive }) => `mob-nav-item ${isActive ? 'active' : ''}`}
          >
            <motion.div whileTap={{ scale: 0.9 }} className="mob-nav-icon-wrap">
              <span className="mob-nav-icon">🍬</span>
              <span className="mob-nav-label">Shop</span>
            </motion.div>
          </NavLink>

          {/* 5. Location */}
          <NavLink 
            to="/contact#map" 
            className={({ isActive }) => `mob-nav-item ${isActive || pathname === '/contact' ? 'active' : ''}`}
          >
            <motion.div whileTap={{ scale: 0.9 }} className="mob-nav-icon-wrap">
              <span className="mob-nav-icon">📍</span>
              <span className="mob-nav-label">Location</span>
            </motion.div>
          </NavLink>
        </nav>
      </div>
    </>
  );
}

export default memo(MobileBottomBar);

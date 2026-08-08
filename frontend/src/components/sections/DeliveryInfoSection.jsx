import { memo } from 'react';
import { waLink } from '../../config/site';

const BULK_WA_MESSAGE =
  'Hello, I would like to enquire about a bulk/outstation order (5 kg or more). Please share delivery charges and availability for my location.';

function DeliveryInfoSection({ className = '' }) {
  return (
    <div className={`delivery-info-block reveal ${className}`.trim()}>
      <div className="row g-3 g-md-4 align-items-stretch">
        <div className="col-md-6">
          <article className="delivery-info-card delivery-info-card--local h-100">
            <div className="delivery-info-card-head">
              <span className="delivery-info-card-icon" aria-hidden="true">🚚</span>
              <div>
                <h3 className="delivery-info-card-title">Local Delivery</h3>
                <p className="delivery-info-card-areas">Nellore · Nayudupeta · Nearby Areas</p>
              </div>
            </div>
            <p className="delivery-info-card-text mb-0">
              Product prices and quantities on this page apply to local delivery in Nellore, Nayudupeta
              and surrounding nearby locations.
            </p>
          </article>
        </div>

        <div className="col-md-6">
          <article className="delivery-info-card delivery-info-card--bulk h-100">
            <div className="delivery-info-card-head">
              <span className="delivery-info-card-icon" aria-hidden="true">📦</span>
              <div>
                <h3 className="delivery-info-card-title">Long-Distance Orders</h3>
                <p className="delivery-info-card-areas">
                  Hyderabad · Bangalore · Chennai · Other Cities
                </p>
              </div>
            </div>
            <p className="delivery-info-card-text">
              Bulk orders of <strong className="delivery-info-highlight">5 kg or more</strong> only.
              Delivery charges and availability vary by location — contact us to confirm before ordering.
            </p>
            <a
              href={waLink(BULK_WA_MESSAGE)}
              className="btn btn-saffron btn-glow delivery-info-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire for Bulk Order
            </a>
          </article>
        </div>
      </div>
    </div>
  );
}

export default memo(DeliveryInfoSection);

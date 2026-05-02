import './mockups.css';

/* Restaurant orders — menu + cart */
export default function RestaurantMockup() {
  const items = [
    { name: 'Truffle pasta',   price: '64',  tag: 'Popular' },
    { name: 'Wagyu burger',    price: '78',  tag: null },
    { name: 'Garden salad',    price: '42',  tag: 'New' },
    { name: 'Citrus salmon',   price: '92',  tag: null },
  ];
  return (
    <div className="mu-restaurant" style={{ '--mock-accent': '#f97316', '--mock-accent-2': '#ec4899' }}>
      <div className="mu-restaurant__head">
        <div>
          <h4 className="mu-restaurant__title">Dinner menu</h4>
          <span className="mu-restaurant__meta">Tonight · open until 23:00</span>
        </div>
        <span className="mu-pill mu-pill--brand">Live</span>
      </div>

      <div className="mu-restaurant__cats">
        {['Starters', 'Mains', 'Desserts', 'Drinks'].map((c, i) => (
          <span key={c} className={`mu-restaurant__cat${i === 1 ? ' mu-restaurant__cat--active' : ''}`}>
            {c}
          </span>
        ))}
      </div>

      <div className="mu-restaurant__items">
        {items.map((it, i) => (
          <div key={it.name} className="mu-restaurant__item">
            <div className="mu-restaurant__item-thumb" data-shade={i % 3} />
            <div className="mu-restaurant__item-meta">
              <span className="mu-restaurant__item-name">{it.name}</span>
              <div className="mu-row">
                <span className="mu-restaurant__item-price">₪{it.price}</span>
                {it.tag && <span className="mu-pill">{it.tag}</span>}
              </div>
            </div>
            <span className="mu-restaurant__item-add" aria-hidden>+</span>
          </div>
        ))}
      </div>

      <div className="mu-restaurant__cart">
        <span className="mu-restaurant__cart-label">Cart · 3 items</span>
        <span className="mu-restaurant__cart-total">₪204</span>
        <span className="mu-cta">Order</span>
      </div>
    </div>
  );
}

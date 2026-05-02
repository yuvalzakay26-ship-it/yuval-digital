import './mockups.css';

/* Marzipan Bakery — premium product showcase + online ordering */
export default function MarzipanMockup() {
  const products = [
    { name: 'Almond ring',    price: '38' },
    { name: 'Pistachio roll', price: '54' },
    { name: 'Honey cake',     price: '46' },
    { name: 'Rugelach box',   price: '62' },
  ];

  return (
    <div
      className="mu-marzipan"
      style={{ '--mock-accent': '#9f1239', '--mock-accent-2': '#f59e0b' }}
    >
      <div className="mu-marzipan__nav">
        <span className="mu-marzipan__brand">MARZIPAN</span>
        <span className="mu-marzipan__since">Est · 1986</span>
        <span className="mu-pill mu-pill--brand">Order</span>
      </div>

      <div className="mu-marzipan__hero">
        <span className="mu-pill">Jerusalem · Bakery</span>
        <h4 className="mu-marzipan__title">
          Crafted daily, <span>since 1986.</span>
        </h4>
        <div className="mu-marzipan__sub">
          <span className="mu-line" style={{ width: '82%' }} />
          <span className="mu-line" style={{ width: '58%' }} />
        </div>
      </div>

      <div className="mu-marzipan__products">
        {products.map((p, i) => (
          <div key={p.name} className="mu-marzipan__product">
            <div className="mu-marzipan__product-thumb" data-shade={i % 4} />
            <div className="mu-marzipan__product-meta">
              <span className="mu-marzipan__product-name">{p.name}</span>
              <span className="mu-marzipan__product-price">₪{p.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mu-marzipan__cart">
        <span className="mu-marzipan__cart-label">Cart · 2 items</span>
        <span className="mu-marzipan__cart-total">₪92</span>
        <span className="mu-cta">Checkout</span>
      </div>
    </div>
  );
}

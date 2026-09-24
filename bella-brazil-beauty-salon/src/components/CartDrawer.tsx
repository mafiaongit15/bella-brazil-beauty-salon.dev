import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { Product } from '../data/salonData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'bahrain' | 'gcc'>('bahrain');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card_on_delivery'>('cod');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= 25 ? 0 : deliveryArea === 'bahrain' ? 2.5 : 8.0;
  const total = subtotal + (items.length > 0 ? deliveryFee : 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleWhatsAppOrder = () => {
    const itemsList = items
      .map((i) => `• ${i.product.brand} ${i.product.name} x${i.quantity} = BHD ${(i.product.price * i.quantity).toFixed(2)}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hello Bella Brazil Boutique! I would like to place an order:\n\n` +
      `${itemsList}\n\n` +
      `Subtotal: BHD ${subtotal.toFixed(2)}\n` +
      `Delivery: ${deliveryFee === 0 ? 'FREE' : `BHD ${deliveryFee.toFixed(2)}`}\n` +
      `Total: BHD ${total.toFixed(2)}\n` +
      `Payment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'BenefitPay / Card on Delivery'}\n\n` +
      `Customer: ${recipientName}\n` +
      `Phone: ${recipientPhone}\n` +
      `Address: ${recipientAddress}, Bahrain\n\n` +
      `Please confirm dispatch timing.`
    );
    window.open(`https://wa.me/97333520102?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-[#0B2118] border-l border-[#1D4A35] text-[#F2EBDD] flex flex-col h-full shadow-2xl animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1D4A35] flex items-center justify-between bg-[#123524]/60">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B59A62]">
              Salon Retail Boutique
            </span>
            <h3 className="font-serif text-xl text-[#F2EBDD]">
              {checkoutStep === 'cart' ? 'Your Shopping Bag' : checkoutStep === 'details' ? 'Delivery Details' : 'Order Confirmed'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9BAA8C] hover:text-[#F2EBDD] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {checkoutStep !== 'success' && (
          <div className="px-5 py-2.5 bg-[#123524] text-[11px] border-b border-[#1D4A35] flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-[#B59A62] shrink-0" />
            {subtotal >= 25 ? (
              <span className="text-[#9BAA8C]">
                Complimentary delivery applied across <strong className="text-[#F2EBDD]">Bahrain</strong>!
              </span>
            ) : (
              <span className="text-[#9BAA8C]">
                Add <strong className="text-[#B59A62] tabular-nums">BHD {(25 - subtotal).toFixed(2)}</strong> more for free Bahrain delivery
              </span>
            )}
          </div>
        )}

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkoutStep === 'success' ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-14 h-14 mx-auto bg-[#123524] border border-[#B59A62] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-[#B59A62]" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#B59A62]">Order Received</span>
                <h4 className="font-serif text-2xl text-[#F2EBDD]">Preparing Your Haircare</h4>
                <p className="text-xs text-[#9BAA8C] max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#F2EBDD]">{recipientName}</strong>. Our Seef salon boutique is packing your order.
                </p>
              </div>

              <div className="bg-[#123524]/60 border border-[#1D4A35] p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[#9BAA8C]">Recipient:</span>
                  <span className="text-[#F2EBDD]">{recipientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9BAA8C]">Contact:</span>
                  <span className="text-[#F2EBDD]">{recipientPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9BAA8C]">Delivery Location:</span>
                  <span className="text-[#F2EBDD] truncate max-w-[180px]">{recipientAddress}</span>
                </div>
                <div className="flex justify-between border-t border-[#1D4A35] pt-2">
                  <span className="text-[#9BAA8C]">Total Payable:</span>
                  <span className="text-[#B59A62] font-semibold tabular-nums">BHD {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-[#0B2118] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Track via WhatsApp (+973 33520102)
                </button>
                <button
                  onClick={() => {
                    onClearCart();
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="w-full py-2.5 border border-[#1D4A35] hover:border-[#9BAA8C] text-[#F2EBDD] text-xs uppercase tracking-wider"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : checkoutStep === 'cart' ? (
            items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#123524] flex items-center justify-center text-[#9BAA8C]">
                  🛍️
                </div>
                <p className="font-serif text-lg text-[#F2EBDD]">Your shopping bag is empty</p>
                <p className="text-xs text-[#9BAA8C] max-w-xs">
                  Discover professional haircare from Wella, K18, Kadus, and our proprietary Brazilian botanical line.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#F2EBDD] text-[#0B2118] text-xs uppercase tracking-wider font-medium hover:bg-[#B59A62] transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex gap-3 p-3 bg-[#123524]/40 border border-[#1D4A35] group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover shrink-0 bg-[#0B2118]"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#B59A62]">
                            {product.brand}
                          </span>
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="text-[#9BAA8C] hover:text-red-400 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs font-medium text-[#F2EBDD] truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-[#9BAA8C]">{product.volume}</span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#1D4A35] bg-[#0B2118]">
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="p-1 text-[#9BAA8C] hover:text-[#F2EBDD]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs tabular-nums text-[#F2EBDD]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="p-1 text-[#9BAA8C] hover:text-[#F2EBDD]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#F2EBDD] tabular-nums">
                          BHD {(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Checkout Details Step */
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-wider text-[#9BAA8C]">
                  Delivery Information
                </p>

                <div>
                  <label className="block text-xs text-[#9BAA8C] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2 focus:outline-none focus:border-[#B59A62]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9BAA8C] mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+973 XXXXXXXX"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2 focus:outline-none focus:border-[#B59A62]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9BAA8C] mb-1">Area & Address in Bahrain *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Building, Road, Block, Area (e.g. Seef, Saar, Riffa, Amwaj)..."
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    className="w-full bg-[#123524] border border-[#1D4A35] text-[#F2EBDD] text-xs px-3 py-2 focus:outline-none focus:border-[#B59A62] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#9BAA8C] mb-1">Payment Preference</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label
                      className={`p-2.5 border cursor-pointer flex flex-col justify-between ${
                        paymentMethod === 'cod' ? 'border-[#B59A62] bg-[#123524]' : 'border-[#1D4A35]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="sr-only"
                      />
                      <span className="font-medium text-[#F2EBDD]">Cash on Delivery</span>
                      <span className="text-[10px] text-[#9BAA8C] mt-1">Pay driver in cash</span>
                    </label>

                    <label
                      className={`p-2.5 border cursor-pointer flex flex-col justify-between ${
                        paymentMethod === 'card_on_delivery' ? 'border-[#B59A62] bg-[#123524]' : 'border-[#1D4A35]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card_on_delivery'}
                        onChange={() => setPaymentMethod('card_on_delivery')}
                        className="sr-only"
                      />
                      <span className="font-medium text-[#F2EBDD]">Card / BenefitPay</span>
                      <span className="text-[10px] text-[#9BAA8C] mt-1">POS machine on delivery</span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {checkoutStep !== 'success' && items.length > 0 && (
          <div className="p-5 border-t border-[#1D4A35] bg-[#0B2118] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#9BAA8C]">
                <span>Subtotal</span>
                <span className="text-[#F2EBDD] tabular-nums">BHD {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#9BAA8C]">
                <span>Delivery (Bahrain)</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-[#25D366] font-medium">FREE</span>
                  ) : (
                    `BHD ${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#F2EBDD] pt-2 border-t border-[#1D4A35]">
                <span>Total Amount</span>
                <span className="text-[#B59A62] tabular-nums">BHD {total.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('details')}
                className="w-full py-3 bg-[#F2EBDD] hover:bg-[#B59A62] text-[#0B2118] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                Proceed to Checkout <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 border border-[#1D4A35] text-xs text-[#9BAA8C] hover:text-[#F2EBDD]"
                >
                  Back
                </button>
                <button
                  form="checkout-form"
                  type="submit"
                  disabled={!recipientName || !recipientPhone || !recipientAddress}
                  className="flex-1 py-3 bg-[#F2EBDD] hover:bg-[#B59A62] disabled:opacity-50 text-[#0B2118] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Place Delivery Order
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

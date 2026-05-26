const PHONE_NUMBER = "4431181055";

export function generateWhatsAppUrl(items, subtotal) {
  const lines = [
    "Hi! I'd like to request a quote for the following items:",
    "",
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.product.name} — Desired quantity: ${item.quantity}`
    );
  });

  lines.push(
    "",
    `Estimated selection subtotal: $${subtotal.toFixed(2)}`,
    "",
    "Thank you!",
    "",
    "— Sent from Velas & Succulentas"
  );

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${PHONE_NUMBER}?text=${message}`;
}

export function getWhatsAppPhone() {
  return PHONE_NUMBER;
}

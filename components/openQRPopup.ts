export function openQRPopup(qrImage: string): Window | null {
  const popup = window.open(
    "",
    "_blank",
    "width=300,height=300,scrollbars=no,resizable=no"
  );

  if (popup) {
    popup.document.write(`
        <html>
          <head><title>QR Code</title></head>
          <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh;">
            <img src="${qrImage}" style="width:250px;height:250px;" />
          </body>
        </html>
      `);
    popup.document.close();
  }

  return popup;
}

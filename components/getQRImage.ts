import axios from "axios";

export async function getQRImage() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const response = await axios.get(`${url}/api/qr/generate`, {
    withCredentials: true,
  });

  const qrImage = response.data.qrImage;

  return { qrImage };
}

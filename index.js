const express = require('express');
const axios = require('axios');
const app = express();

app.get('/getign', async (req, res) => {
  const { userId, zoneId } = req.query;
  if (!userId || !zoneId) return res.json({ error: 'Missing userId or zoneId' });

  try {
    const response = await axios.post(
      'https://www.codashop.com/api/latest/customer-validation',
      new URLSearchParams({
        'voucherPricePoint.id': '3',
        'voucherPricePoint.price': '0',
        'voucherPricePoint.variablePrice': '0',
        'user.userId': userId,
        'user.zoneId': zoneId,
        'shop.id': '52',
        'product.id': '56',
        'appVersion': '2.0'
      }),
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Origin': 'https://www.codashop.com',
          'Referer': 'https://www.codashop.com/en-ph/mobile-legends-bang-bang',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-PH,en;q=0.9',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Send back full raw response so we can see exactly what Codashop returns
    console.log("STATUS:", response.status);
    console.log("DATA:", JSON.stringify(response.data));
    res.json({ raw: response.data });

  } catch (e) {
    console.log("ERROR:", e.message);
    res.json({ error: e.message, details: e.response ? e.response.data : null });
  }
});

app.listen(3000, () => console.log('Running'));

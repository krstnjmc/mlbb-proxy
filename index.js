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
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Origin': 'https://www.codashop.com',
          'Referer': 'https://www.codashop.com/en-ph/mobile-legends-bang-bang',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    const data = response.data;
    const username = (data.confirmationFields && data.confirmationFields.username)
      || data.username || data.nickname || 'Not found';
    res.json({ username });
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Running'));

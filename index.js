const express = require('express');
const axios = require('axios');
const app = express();

app.get('/getign', async (req, res) => {
  const { userId, zoneId } = req.query;
  if (!userId || !zoneId) return res.json({ error: 'Missing userId or zoneId' });

  try {
    const response = await axios.get(
      'https://api.mobilelegends.com/base/user/getInfoByUid',
      {
        params: {
          uid: userId,
          zone_id: zoneId
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': 'application/json'
        }
      }
    );

    console.log("DATA:", JSON.stringify(response.data));
    res.json({ raw: response.data });

  } catch (e) {
    // Try backup endpoint
    try {
      const response2 = await axios.post(
        'https://api.mobilelegends.com/base/user/checkUser',
        { uid: userId, zone_id: zoneId },
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      );
      console.log("BACKUP DATA:", JSON.stringify(response2.data));
      res.json({ raw: response2.data });
    } catch (e2) {
      res.json({ error: e.message, error2: e2.message });
    }
  }
});

app.listen(3000, () => console.log('Running'));

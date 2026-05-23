-- Seed products into PostgreSQL
-- Run this in psql: \i seed.sql  OR  psql -U postgres -d ecommerce_db -f seed.sql

TRUNCATE TABLE products;

INSERT INTO products (id, url, detailUrl, title, price, quantity, description, discount, tagline) VALUES
(
  'product1',
  'https://rukminim1.flixcart.com/image/150/150/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70',
  '{"shortTitle":"Home & Kitchen","longTitle":"Pigeon FAVOURITE Electric Kettle (1.5 L, Silver, Black)"}',
  '{"mrp":1195,"cost":625,"discount":"47%"}',
  1,
  'This electric kettle from Pigeon will soon become a travelers best friend. Boil water for instant noodles, soup, coffee and green tea.',
  'Extra 10% Off',
  'Deal of the day'
),
(
  'product2',
  'https://rukminim1.flixcart.com/image/416/416/kl6wx3k0/sandwich-maker/8/r/d/sandwich-01-flipkart-smartbuy-original-imagydds4zthxt8z.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/kl6wx3k0/sandwich-maker/8/r/d/sandwich-01-flipkart-smartbuy-original-imagydds4zthxt8z.jpeg?q=70',
  '{"shortTitle":"Sandwich Makers","longTitle":"Flipkart SmartBuy Sandwich 01 Grill (Black)"}',
  '{"mrp":1499,"cost":899,"discount":"40%"}',
  1,
  'This non-stick sandwich toaster is easy to use and very handy. Makes tasty toasts and toasted sandwiches.',
  'From 99+5% Off',
  'Prestige, Nova & more'
),
(
  'product3',
  'https://rukminim1.flixcart.com/image/150/150/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/kohigsw0/resistance-tube/c/s/e/new-adjustable-single-resistance-tube-multicolor-na-ajro-deal-original-imag2xg88mhmwxz5.jpeg?q=70',
  '{"shortTitle":"Fitness Gear","longTitle":"AJRO DEAL New Adjustable Single Resistance Tube (Multicolor)"}',
  '{"mrp":499,"cost":166,"discount":"66%"}',
  1,
  'Tone your back muscles, reduce belly fat, improve blood circulation and body posture. Increases stamina, energy and vitality.',
  'Upto 70% Off',
  'Deal of the Day'
),
(
  'product4',
  'https://rukminim1.flixcart.com/image/300/300/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70',
  '{"shortTitle":"Smart Watches","longTitle":"Molife Sense 500 Smartwatch (Black Strap, Freesize)"}',
  '{"mrp":6999,"cost":4049,"discount":"42%"}',
  1,
  'The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Bluetooth 5.0 connectivity, changeable straps.',
  'Grab Now',
  'Best Seller'
),
(
  'product5',
  'https://rukminim1.flixcart.com/image/416/416/k3uhhu80/hair-dryer/n/m/t/nova-2800-w-professional-nhp-8220-original-imafmvwfhmzsxdrw.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/k3uhhu80/hair-dryer/n/m/t/nova-2800-w-professional-nhp-8220-original-imafmvwfhmzsxdrw.jpeg?q=70',
  '{"shortTitle":"Trimmers, Dryers & more","longTitle":"Nova Professional NHP 8220 Hair Dryer (1800 W, Multicolor)"}',
  '{"mrp":1899,"cost":1124,"discount":"40%"}',
  1,
  'Nova Professional Hair Dryer with 1800W power and multiple heat settings.',
  'From Rs.499',
  'Kubra, Nova & more'
),
(
  'product6',
  'https://rukminim1.flixcart.com/image/150/150/kk01pjk0/fan/d/d/l/tiktik-quiet-portable-table-fan-zigma-original-imafzg7ftzuckpad.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/kk01pjk0/fan/d/d/l/tiktik-quiet-portable-table-fan-zigma-original-imafzg7ftzuckpad.jpeg?q=70',
  '{"shortTitle":"Table Fans","longTitle":"Portable 300mm Ultra High Speed 3 Blade Table Fan (Black, Pack of 1)"}',
  '{"mrp":2250,"cost":1199,"discount":"46%"}',
  1,
  'Perfect size fan for use on a table or desk. Whisper quiet, powerful airflow in a compact size. Two adjustable speed settings.',
  'Minimum 40% Off',
  'Top Selling'
),
(
  'product7',
  'https://rukminim1.flixcart.com/image/150/150/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70',
  'https://rukminim1.flixcart.com/image/416/416/kcgk1ow0/headphone/n/u/a/235v2-fast-charging-boat-original-imaftk6us4af7bca.jpeg?q=70',
  '{"shortTitle":"Headphones","longTitle":"boAt Rockerz 235v2 with ASAP Charging Version 5.0 Bluetooth Headset"}',
  '{"mrp":2990,"cost":1199,"discount":"59%"}',
  1,
  'Let music brighten up your mood with the boAt 235v2 Fast Charging Bluetooth Headset. Features Call Vibration Alert and Easy Access Controls.',
  'Minimum 50% Off',
  'Grab Now!'
);

SELECT id, title->>'shortTitle' AS category, price FROM products;

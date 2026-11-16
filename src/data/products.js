// Built-in product list. The website shows products straight from this file (no server or database needed).
// The ids match the ones the backend adds to the database, so Add to cart works for every product.
const products = [
 {
  "_id": "000000000000000000000001",
  "category": "men",
  "type": "shirt",
  "title": "Pink Textured Casual Shirt",
  "description": "Soft textured shirt in pink with a relaxed collar. Easy to dress up for a day out or keep casual.",
  "price": 449,
  "color": "pink",
  "sizes": [
   "S",
   "M",
   "L"
  ],
  "rating": 4.5,
  "reviewCount": 120,
  "stock": 25,
  "image": "/assets/img/men/1.webp",
  "tags": [
   "men",
   "shirt",
   "pink",
   "textured",
   "casual"
  ]
 },
 {
  "_id": "000000000000000000000002",
  "category": "men",
  "type": "shirt",
  "title": "Sage Green Checked Shirt",
  "description": "Half-sleeve shirt in a sage green check. Light and breathable for warm days.",
  "price": 669,
  "color": "green",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 4.2,
  "reviewCount": 85,
  "stock": 25,
  "image": "/assets/img/men/2.webp",
  "tags": [
   "men",
   "shirt",
   "green",
   "sage",
   "checked"
  ]
 },
 {
  "_id": "000000000000000000000003",
  "category": "men",
  "type": "kurta",
  "title": "Indigo Printed Kurta",
  "description": "Straight kurta in indigo with a fine all-over print. Pairs well with white pyjamas.",
  "price": 1300,
  "color": "blue",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 4,
  "reviewCount": 60,
  "stock": 25,
  "image": "/assets/img/men/3.webp",
  "tags": [
   "men",
   "kurta",
   "blue",
   "indigo",
   "printed"
  ]
 },
 {
  "_id": "000000000000000000000004",
  "category": "men",
  "type": "shirt",
  "title": "Brown Full-Sleeve Shirt",
  "description": "Full-sleeve shirt in a rich brown with a clean, slim look. Works for office and evenings.",
  "price": 759,
  "color": "brown",
  "sizes": [
   "S",
   "M",
   "L"
  ],
  "rating": 4.1,
  "reviewCount": 55,
  "stock": 25,
  "image": "/assets/img/men/4.webp",
  "tags": [
   "men",
   "shirt",
   "brown",
   "full-sleeve"
  ]
 },
 {
  "_id": "000000000000000000000005",
  "category": "men",
  "type": "kurta",
  "title": "Cream Kurta Pyjama Set",
  "description": "Cream kurta with matching pyjamas. A simple, elegant pick for festivals and family functions.",
  "price": 2999,
  "color": "cream",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 3.9,
  "reviewCount": 40,
  "stock": 25,
  "image": "/assets/img/men/5.webp",
  "tags": [
   "men",
   "kurta",
   "cream",
   "pyjama",
   "set"
  ]
 },
 {
  "_id": "000000000000000000000006",
  "category": "men",
  "type": "kurta",
  "title": "Navy Embroidered Kurta",
  "description": "Navy kurta with subtle embroidery at the placket. A smart choice for weddings and celebrations.",
  "price": 3350,
  "color": "blue",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.3,
  "reviewCount": 70,
  "stock": 25,
  "image": "/assets/img/men/6.webp",
  "tags": [
   "men",
   "kurta",
   "blue",
   "navy",
   "embroidered"
  ]
 },
 {
  "_id": "000000000000000000000007",
  "category": "men",
  "type": "shirt",
  "title": "Olive Green Half-Sleeve Shirt",
  "description": "Half-sleeve shirt in olive green with a plain front. Easy to wear with jeans or chinos.",
  "price": 840,
  "color": "green",
  "sizes": [
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 4,
  "reviewCount": 50,
  "stock": 25,
  "image": "/assets/img/men/7.webp",
  "tags": [
   "men",
   "shirt",
   "green",
   "olive",
   "half-sleeve"
  ]
 },
 {
  "_id": "000000000000000000000008",
  "category": "men",
  "type": "kurta",
  "title": "Pink Embroidered Kurta",
  "description": "Pink kurta with delicate embroidery on the front. Made for festive days.",
  "price": 3350,
  "color": "pink",
  "sizes": [
   "S",
   "M",
   "L"
  ],
  "rating": 3.8,
  "reviewCount": 35,
  "stock": 25,
  "image": "/assets/img/men/8.webp",
  "tags": [
   "men",
   "kurta",
   "pink",
   "embroidered"
  ]
 },
 {
  "_id": "000000000000000000000009",
  "category": "women",
  "type": "jeans",
  "title": "Black Bell-Bottom Jeans",
  "description": "High-waist black jeans with a flared bottom. Looks good with crop tops and sneakers.",
  "price": 950,
  "color": "black",
  "sizes": [
   "S",
   "M"
  ],
  "rating": 4.6,
  "reviewCount": 110,
  "stock": 25,
  "image": "/assets/img/women/1.webp",
  "tags": [
   "women",
   "jeans",
   "black",
   "bell-bottom"
  ]
 },
 {
  "_id": "00000000000000000000000a",
  "category": "women",
  "type": "jeans",
  "title": "Light Blue Straight Jeans",
  "description": "Light blue high-rise jeans with a straight leg. A wardrobe staple for everyday wear.",
  "price": 2999,
  "color": "blue",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.7,
  "reviewCount": 95,
  "stock": 25,
  "image": "/assets/img/women/2.webp",
  "tags": [
   "women",
   "jeans",
   "blue",
   "light",
   "straight"
  ]
 },
 {
  "_id": "00000000000000000000000b",
  "category": "women",
  "type": "jeans",
  "title": "Blue Bell-Bottom Jeans",
  "description": "Blue wide-leg jeans in a long, flowing cut. Comfortable for all-day wear.",
  "price": 400,
  "color": "blue",
  "sizes": [
   "S",
   "2XL",
   "3XL"
  ],
  "rating": 4.3,
  "reviewCount": 60,
  "stock": 25,
  "image": "/assets/img/women/3.webp",
  "tags": [
   "women",
   "jeans",
   "blue",
   "bell-bottom"
  ]
 },
 {
  "_id": "00000000000000000000000c",
  "category": "women",
  "type": "jeans",
  "title": "Grey High-Rise Denim Jeans",
  "description": "Washed grey denim with a high rise and straight fit. Goes with almost any top.",
  "price": 3589,
  "color": "grey",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 4.4,
  "reviewCount": 80,
  "stock": 25,
  "image": "/assets/img/women/4.webp",
  "tags": [
   "women",
   "jeans",
   "grey",
   "high-rise",
   "denim"
  ]
 },
 {
  "_id": "00000000000000000000000d",
  "category": "women",
  "type": "ethnic",
  "title": "Pink Lehenga Choli",
  "description": "Pink lehenga choli with a flared skirt and matching dupatta. Ideal for sangeet and receptions.",
  "price": 5999,
  "color": "pink",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 4.1,
  "reviewCount": 45,
  "stock": 25,
  "image": "/assets/img/women/5.webp",
  "tags": [
   "women",
   "ethnic",
   "pink",
   "lehenga",
   "choli"
  ]
 },
 {
  "_id": "00000000000000000000000e",
  "category": "women",
  "type": "ethnic",
  "title": "Red Banarasi-Style Saree",
  "description": "Deep red saree with a gold woven border and pallu. A classic for weddings and puja.",
  "price": 1900,
  "color": "red",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.5,
  "reviewCount": 70,
  "stock": 25,
  "image": "/assets/img/women/6.webp",
  "tags": [
   "women",
   "ethnic",
   "red",
   "banarasi-style",
   "saree"
  ]
 },
 {
  "_id": "00000000000000000000000f",
  "category": "women",
  "type": "ethnic",
  "title": "Golden Lehenga for Weddings",
  "description": "Golden embellished lehenga with a heavy flare and dupatta. Made to stand out at weddings.",
  "price": 5000,
  "color": "yellow",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL",
   "3XL"
  ],
  "rating": 4.2,
  "reviewCount": 55,
  "stock": 25,
  "image": "/assets/img/women/7.webp",
  "tags": [
   "women",
   "ethnic",
   "yellow",
   "golden",
   "lehenga",
   "for",
   "weddings"
  ]
 },
 {
  "_id": "000000000000000000000010",
  "category": "women",
  "type": "ethnic",
  "title": "Maroon and Mustard Saree",
  "description": "Maroon saree with a contrasting mustard pallu. Drapes well for festive evenings.",
  "price": 4100,
  "color": "red",
  "sizes": [
   "S",
   "M",
   "L",
   "XL",
   "2XL"
  ],
  "rating": 4.6,
  "reviewCount": 90,
  "stock": 25,
  "image": "/assets/img/women/8.webp",
  "tags": [
   "women",
   "ethnic",
   "red",
   "maroon",
   "and",
   "mustard",
   "saree"
  ]
 },
 {
  "_id": "000000000000000000000011",
  "category": "women",
  "type": "ethnic",
  "title": "Navy Embroidered Lehenga",
  "description": "Navy lehenga with silver thread embroidery and a matching dupatta. Great for evening functions.",
  "price": 7499,
  "color": "blue",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.4,
  "reviewCount": 38,
  "stock": 25,
  "image": "/assets/img/women/9.webp",
  "tags": [
   "women",
   "ethnic",
   "blue",
   "navy",
   "embroidered",
   "lehenga"
  ]
 },
 {
  "_id": "000000000000000000000012",
  "category": "women",
  "type": "ethnic",
  "title": "Red Festive Ethnic Set",
  "description": "Red festive outfit with fine detailing on the neckline. Pair it with statement jewellery.",
  "price": 3299,
  "color": "red",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.2,
  "reviewCount": 42,
  "stock": 25,
  "image": "/assets/img/women/10.webp",
  "tags": [
   "women",
   "ethnic",
   "red",
   "festive",
   "set"
  ]
 },
 {
  "_id": "000000000000000000000013",
  "category": "women",
  "type": "kurti",
  "title": "Green Floral Printed Kurti",
  "description": "Short kurti with a bright green floral print and three-quarter sleeves. Light for daily wear.",
  "price": 799,
  "color": "green",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.3,
  "reviewCount": 150,
  "stock": 25,
  "image": "/assets/img/women/11.webp",
  "tags": [
   "women",
   "kurti",
   "green",
   "floral",
   "printed"
  ]
 },
 {
  "_id": "000000000000000000000014",
  "category": "women",
  "type": "kurti",
  "title": "Blue Floral Cotton Tunic",
  "description": "Easy tunic in blue floral print with a relaxed fit. Wear it to college or work.",
  "price": 649,
  "color": "blue",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.1,
  "reviewCount": 98,
  "stock": 25,
  "image": "/assets/img/women/12.webp",
  "tags": [
   "women",
   "kurti",
   "blue",
   "floral",
   "cotton",
   "tunic"
  ]
 },
 {
  "_id": "000000000000000000000015",
  "category": "women",
  "type": "top",
  "title": "Dusty Pink Knit Top",
  "description": "Lightweight knit top in dusty pink with batwing sleeves. Team it with jeans.",
  "price": 499,
  "color": "pink",
  "sizes": [
   "S",
   "M",
   "L"
  ],
  "rating": 4,
  "reviewCount": 76,
  "stock": 25,
  "image": "/assets/img/women/13.webp",
  "tags": [
   "women",
   "top",
   "pink",
   "dusty",
   "knit"
  ]
 },
 {
  "_id": "000000000000000000000016",
  "category": "women",
  "type": "ethnic",
  "title": "Pink Salwar Suit with Dupatta",
  "description": "Pink salwar suit with a printed dupatta and embroidered neckline. A good festive option.",
  "price": 2199,
  "color": "pink",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.4,
  "reviewCount": 64,
  "stock": 25,
  "image": "/assets/img/women/14.webp",
  "tags": [
   "women",
   "ethnic",
   "pink",
   "salwar",
   "suit",
   "with",
   "dupatta"
  ]
 },
 {
  "_id": "000000000000000000000017",
  "category": "women",
  "type": "top",
  "title": "Brown Button-Up Shirt",
  "description": "Brown shirt with short sleeves and a relaxed cut. Neat for work and casual days.",
  "price": 699,
  "color": "brown",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.2,
  "reviewCount": 58,
  "stock": 25,
  "image": "/assets/img/women/15.webp",
  "tags": [
   "women",
   "top",
   "brown",
   "button-up",
   "shirt"
  ]
 },
 {
  "_id": "000000000000000000000018",
  "category": "women",
  "type": "kurti",
  "title": "Beige Printed Short Kurti",
  "description": "Short beige kurti with a small block print. Comfortable with jeans or leggings.",
  "price": 599,
  "color": "cream",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4,
  "reviewCount": 88,
  "stock": 25,
  "image": "/assets/img/women/16.webp",
  "tags": [
   "women",
   "kurti",
   "cream",
   "beige",
   "printed",
   "short"
  ]
 },
 {
  "_id": "000000000000000000000019",
  "category": "women",
  "type": "kurti",
  "title": "Black Embroidered Kurti",
  "description": "Black kurti with small embroidered motifs on the front. Easy to style for any day.",
  "price": 899,
  "color": "black",
  "sizes": [
   "S",
   "M",
   "L",
   "XL"
  ],
  "rating": 4.5,
  "reviewCount": 72,
  "stock": 25,
  "image": "/assets/img/women/17.webp",
  "tags": [
   "women",
   "kurti",
   "black",
   "embroidered"
  ]
 },
 {
  "_id": "00000000000000000000001a",
  "category": "kids",
  "type": "set",
  "title": "Toddler Tank and Shorts Set",
  "description": "Soft tank top with pink shorts for toddlers. Easy to put on and comfortable to play in.",
  "price": 700,
  "color": "pink",
  "sizes": [
   "1-2Y",
   "2-3Y",
   "3-4Y"
  ],
  "rating": 4.3,
  "reviewCount": 30,
  "stock": 25,
  "image": "/assets/img/kid/1.webp",
  "tags": [
   "kids",
   "set",
   "pink",
   "toddler",
   "tank",
   "and",
   "shorts"
  ]
 },
 {
  "_id": "00000000000000000000001b",
  "category": "kids",
  "type": "set",
  "title": "Black Tee and Checkered Shorts Set",
  "description": "Black t-shirt with black-and-white checkered shorts. A fun everyday set for boys.",
  "price": 899,
  "color": "black",
  "sizes": [
   "4-5Y",
   "6-7Y",
   "8-9Y"
  ],
  "rating": 4.6,
  "reviewCount": 25,
  "stock": 25,
  "image": "/assets/img/kid/2.webp",
  "tags": [
   "kids",
   "set",
   "black",
   "tee",
   "and",
   "checkered",
   "shorts"
  ]
 },
 {
  "_id": "00000000000000000000001c",
  "category": "kids",
  "type": "shirt",
  "title": "White Pintuck Shirt Jacket",
  "description": "White shirt jacket with pintuck detail and button front. Wear it open or closed.",
  "price": 650,
  "color": "white",
  "sizes": [
   "4-5Y",
   "6-7Y",
   "8-9Y"
  ],
  "rating": 4.4,
  "reviewCount": 20,
  "stock": 25,
  "image": "/assets/img/kid/3.webp",
  "tags": [
   "kids",
   "shirt",
   "white",
   "pintuck",
   "jacket"
  ]
 },
 {
  "_id": "00000000000000000000001d",
  "category": "electronics",
  "type": "camera",
  "title": "Canon EOS DSLR Camera with 18-55mm Lens",
  "description": "Canon EOS DSLR with an 18-55mm kit lens. A good first camera for photos and video.",
  "price": 78000,
  "color": "black",
  "sizes": [],
  "rating": 4.8,
  "reviewCount": 200,
  "stock": 25,
  "image": "/assets/img/electronics/1.webp",
  "tags": [
   "electronics",
   "camera",
   "black",
   "canon",
   "eos",
   "dslr",
   "with",
   "18-55mm",
   "lens"
  ]
 },
 {
  "_id": "00000000000000000000001e",
  "category": "electronics",
  "type": "appliance",
  "title": "Double Door Refrigerator",
  "description": "Double door refrigerator in a metallic grey finish with a surface disinfection feature.",
  "price": 28990,
  "color": "grey",
  "sizes": [],
  "rating": 4.6,
  "reviewCount": 90,
  "stock": 25,
  "image": "/assets/img/electronics/2.webp",
  "tags": [
   "electronics",
   "appliance",
   "grey",
   "double",
   "door",
   "refrigerator"
  ]
 },
 {
  "_id": "00000000000000000000001f",
  "category": "electronics",
  "type": "camera",
  "title": "Nikon DSLR Camera with Zoom Lens",
  "description": "Nikon DSLR with a zoom lens for sharp photos in different lighting. Built for serious hobbyists.",
  "price": 89990,
  "color": "black",
  "sizes": [],
  "rating": 4.4,
  "reviewCount": 80,
  "stock": 25,
  "image": "/assets/img/electronics/3.webp",
  "tags": [
   "electronics",
   "camera",
   "black",
   "nikon",
   "dslr",
   "with",
   "zoom",
   "lens"
  ]
 },
 {
  "_id": "000000000000000000000020",
  "category": "electronics",
  "type": "phone",
  "title": "Samsung Galaxy A36 5G",
  "description": "Samsung Galaxy A36 5G with a bright display and a clean, light design.",
  "price": 26900,
  "color": "white",
  "sizes": [],
  "rating": 4.3,
  "reviewCount": 65,
  "stock": 25,
  "image": "/assets/img/electronics/4.webp",
  "tags": [
   "electronics",
   "phone",
   "white",
   "samsung",
   "galaxy",
   "a36"
  ]
 },
 {
  "_id": "000000000000000000000021",
  "category": "electronics",
  "type": "appliance",
  "title": "Samsung Bespoke AI 5-in-1 Convertible AC",
  "description": "Convertible split AC that adjusts its cooling capacity to your room. Comes with a 5-year warranty.",
  "price": 52990,
  "color": "white",
  "sizes": [],
  "rating": 4.9,
  "reviewCount": 170,
  "stock": 25,
  "image": "/assets/img/electronics/5.webp",
  "tags": [
   "electronics",
   "appliance",
   "white",
   "samsung",
   "bespoke",
   "5-in-1",
   "convertible"
  ]
 },
 {
  "_id": "000000000000000000000022",
  "category": "electronics",
  "type": "appliance",
  "title": "Godrej 5-in-1 Convertible Split AC",
  "description": "Split AC with five cooling modes so you can match the capacity to the weather.",
  "price": 38990,
  "color": "white",
  "sizes": [],
  "rating": 4.6,
  "reviewCount": 90,
  "stock": 25,
  "image": "/assets/img/electronics/6.webp",
  "tags": [
   "electronics",
   "appliance",
   "white",
   "godrej",
   "5-in-1",
   "convertible",
   "split"
  ]
 },
 {
  "_id": "000000000000000000000023",
  "category": "electronics",
  "type": "phone",
  "title": "Smartphone with Waterdrop Display",
  "description": "Everyday smartphone with a waterdrop-notch display and a gradient back.",
  "price": 9999,
  "color": "black",
  "sizes": [],
  "rating": 4.5,
  "reviewCount": 75,
  "stock": 25,
  "image": "/assets/img/electronics/7.webp",
  "tags": [
   "electronics",
   "phone",
   "black",
   "smartphone",
   "with",
   "waterdrop",
   "display"
  ]
 },
 {
  "_id": "000000000000000000000024",
  "category": "electronics",
  "type": "phone",
  "title": "OPPO K12x 5G",
  "description": "OPPO K12x 5G with a 120Hz display, 45W SUPERVOOC charging and a 7.68mm slim body.",
  "price": 12999,
  "color": "white",
  "sizes": [],
  "rating": 4.2,
  "reviewCount": 60,
  "stock": 25,
  "image": "/assets/img/electronics/8.webp",
  "tags": [
   "electronics",
   "phone",
   "white",
   "oppo",
   "k12x"
  ]
 },
 {
  "_id": "000000000000000000000025",
  "category": "electronics",
  "type": "laptop",
  "title": "Apple MacBook Air",
  "description": "Thin and light MacBook Air for work, study and travel. Quiet, fast and long-lasting.",
  "price": 99900,
  "color": "grey",
  "sizes": [],
  "rating": 4.8,
  "reviewCount": 140,
  "stock": 25,
  "image": "/assets/img/electronics/9.webp",
  "tags": [
   "electronics",
   "laptop",
   "grey",
   "apple",
   "macbook",
   "air"
  ]
 },
 {
  "_id": "000000000000000000000026",
  "category": "electronics",
  "type": "laptop",
  "title": "Samsung Galaxy Book5 360",
  "description": "2-in-1 laptop that folds into a tablet and works with a stylus.",
  "price": 124990,
  "color": "grey",
  "sizes": [],
  "rating": 4.5,
  "reviewCount": 48,
  "stock": 25,
  "image": "/assets/img/electronics/10.webp",
  "tags": [
   "electronics",
   "laptop",
   "grey",
   "samsung",
   "galaxy",
   "book5",
   "360"
  ]
 },
 {
  "_id": "000000000000000000000027",
  "category": "electronics",
  "type": "phone",
  "title": "Samsung Galaxy Smartphone with Triple Camera",
  "description": "Samsung smartphone with a triple rear camera and a large, bright screen.",
  "price": 13499,
  "color": "white",
  "sizes": [],
  "rating": 4.2,
  "reviewCount": 82,
  "stock": 25,
  "image": "/assets/img/electronics/11.webp",
  "tags": [
   "electronics",
   "phone",
   "white",
   "samsung",
   "galaxy",
   "smartphone",
   "with",
   "triple",
   "camera"
  ]
 },
 {
  "_id": "000000000000000000000028",
  "category": "electronics",
  "type": "phone",
  "title": "vivo T4x 5G",
  "description": "vivo T4x 5G with a big 6500mAh battery, 44W fast charging and a Dimensity 7300 chip.",
  "price": 14999,
  "color": "black",
  "sizes": [],
  "rating": 4.5,
  "reviewCount": 110,
  "stock": 25,
  "image": "/assets/img/electronics/12.webp",
  "tags": [
   "electronics",
   "phone",
   "black",
   "vivo",
   "t4x"
  ]
 },
 {
  "_id": "000000000000000000000029",
  "category": "electronics",
  "type": "laptop",
  "title": "ASUS Vivobook with Ryzen 7000",
  "description": "Slim ASUS Vivobook powered by a Ryzen 7000 series processor for study and work.",
  "price": 44990,
  "color": "grey",
  "sizes": [],
  "rating": 4.3,
  "reviewCount": 57,
  "stock": 25,
  "image": "/assets/img/electronics/13.webp",
  "tags": [
   "electronics",
   "laptop",
   "grey",
   "asus",
   "vivobook",
   "with",
   "ryzen",
   "7000"
  ]
 },
 {
  "_id": "00000000000000000000002a",
  "category": "electronics",
  "type": "phone",
  "title": "Smartphone with Full-HD Display",
  "description": "Budget smartphone with a vivid screen and a colourful gradient back.",
  "price": 11999,
  "color": "black",
  "sizes": [],
  "rating": 4.1,
  "reviewCount": 66,
  "stock": 25,
  "image": "/assets/img/electronics/14.webp",
  "tags": [
   "electronics",
   "phone",
   "black",
   "smartphone",
   "with",
   "full-hd",
   "display"
  ]
 },
 {
  "_id": "00000000000000000000002b",
  "category": "electronics",
  "type": "appliance",
  "title": "Samsung Convection Microwave Oven",
  "description": "Convection microwave that bakes, grills and has a tandoor and curd mode.",
  "price": 16490,
  "color": "black",
  "sizes": [],
  "rating": 4.5,
  "reviewCount": 73,
  "stock": 25,
  "image": "/assets/img/electronics/15.webp",
  "tags": [
   "electronics",
   "appliance",
   "black",
   "samsung",
   "convection",
   "microwave",
   "oven"
  ]
 },
 {
  "_id": "00000000000000000000002c",
  "category": "electronics",
  "type": "appliance",
  "title": "BLDC Ceiling Fan with Remote",
  "description": "Energy-saving BLDC ceiling fan with a remote and a quiet motor.",
  "price": 3299,
  "color": "cream",
  "sizes": [],
  "rating": 4.4,
  "reviewCount": 120,
  "stock": 25,
  "image": "/assets/img/electronics/16.webp",
  "tags": [
   "electronics",
   "appliance",
   "cream",
   "bldc",
   "ceiling",
   "fan",
   "with",
   "remote"
  ]
 },
 {
  "_id": "00000000000000000000002d",
  "category": "electronics",
  "type": "tv",
  "title": "Samsung Crystal 4K Vision Pro Smart TV",
  "description": "4K smart TV with multiple voice assistants and 4K upscaling.",
  "price": 44990,
  "color": "black",
  "sizes": [],
  "rating": 4.6,
  "reviewCount": 155,
  "stock": 25,
  "image": "/assets/img/electronics/17.webp",
  "tags": [
   "electronics",
   "black",
   "samsung",
   "crystal",
   "vision",
   "pro",
   "smart"
  ]
 },
 {
  "_id": "00000000000000000000002e",
  "category": "electronics",
  "type": "tv",
  "title": "Thomson QLED Google TV",
  "description": "QLED TV with Google TV, Dolby audio and 40W speakers.",
  "price": 28999,
  "color": "black",
  "sizes": [],
  "rating": 4.3,
  "reviewCount": 98,
  "stock": 25,
  "image": "/assets/img/electronics/18.webp",
  "tags": [
   "electronics",
   "black",
   "thomson",
   "qled",
   "google"
  ]
 },
 {
  "_id": "00000000000000000000002f",
  "category": "electronics",
  "type": "laptop",
  "title": "HP Laptop with AMD Ryzen",
  "description": "HP laptop with an AMD Ryzen processor and a slim body, made for everyday work.",
  "price": 52990,
  "color": "grey",
  "sizes": [],
  "rating": 4.4,
  "reviewCount": 101,
  "stock": 25,
  "image": "/assets/img/electronics/19.webp",
  "tags": [
   "electronics",
   "laptop",
   "grey",
   "with",
   "amd",
   "ryzen"
  ]
 },
 {
  "_id": "000000000000000000000030",
  "category": "electronics",
  "type": "appliance",
  "title": "Electric Dry Iron",
  "description": "Lightweight electric dry iron in teal with a non-stick soleplate.",
  "price": 899,
  "color": "blue",
  "sizes": [],
  "rating": 4.1,
  "reviewCount": 210,
  "stock": 25,
  "image": "/assets/img/electronics/20.webp",
  "tags": [
   "electronics",
   "appliance",
   "blue",
   "electric",
   "dry",
   "iron"
  ]
 },
 {
  "_id": "000000000000000000000031",
  "category": "electronics",
  "type": "phone",
  "title": "Apple iPhone SE",
  "description": "Compact iPhone SE with a 4.7-inch display and Touch ID.",
  "price": 29900,
  "color": "black",
  "sizes": [],
  "rating": 4.5,
  "reviewCount": 88,
  "stock": 25,
  "image": "/assets/img/electronics/21.webp",
  "tags": [
   "electronics",
   "phone",
   "black",
   "apple",
   "iphone"
  ]
 },
 {
  "_id": "000000000000000000000032",
  "category": "furniture",
  "type": "sofa",
  "title": "Teal Modern L-Shape Sofa Set",
  "description": "Modern L-shape sofa set in teal and white with matching ottomans.",
  "price": 38500,
  "color": "green",
  "sizes": [],
  "rating": 4.2,
  "reviewCount": 40,
  "stock": 25,
  "image": "/assets/img/furniture/1.webp",
  "tags": [
   "furniture",
   "sofa",
   "green",
   "teal",
   "modern",
   "l-shape",
   "set"
  ]
 },
 {
  "_id": "000000000000000000000033",
  "category": "furniture",
  "type": "sofa",
  "title": "Charcoal Sofa Set (3+2)",
  "description": "Charcoal fabric sofas with a curved back. A calm, modern look for the living room.",
  "price": 32000,
  "color": "black",
  "sizes": [],
  "rating": 4.5,
  "reviewCount": 35,
  "stock": 25,
  "image": "/assets/img/furniture/2.webp",
  "tags": [
   "furniture",
   "sofa",
   "black",
   "charcoal",
   "set",
   "(3+2)"
  ]
 },
 {
  "_id": "000000000000000000000034",
  "category": "furniture",
  "type": "sofa",
  "title": "Rust Orange Lounge Chairs with Coffee Table",
  "description": "Two rust orange lounge chairs with a round coffee table for a warm, stylish corner.",
  "price": 24500,
  "color": "orange",
  "sizes": [],
  "rating": 4.1,
  "reviewCount": 28,
  "stock": 25,
  "image": "/assets/img/furniture/3.webp",
  "tags": [
   "furniture",
   "sofa",
   "orange",
   "rust",
   "lounge",
   "chairs",
   "with",
   "coffee",
   "table"
  ]
 }
];

export default products;
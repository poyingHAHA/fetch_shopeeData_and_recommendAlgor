import fetch from "node-fetch";
import fs from "fs-extra";

// const product_url_v4 = "https://shopee.tw/api/v4/item/get?itemid=6916925903&shopid=191096305"
// const product_url_v2 = "https://shopee.tw/api/v2/item/get?itemid=6916925903&shopid=191096305"
// const rating_url = "https://shopee.tw/api/v2/item/get_ratings?filter=0&flag=1&itemid=6916925903&limit=6&offset=0&shopid=191096305&type=0"
// const shop_url = "https://shopee.tw/api/v4/shop/get_shop_detail?shopid=191096305"
// const image_url = `https://cf.shopee.tw/file/${imageID}`

// const shopids = [
//   191096305,
// ]

// 獲取商店商品ID資料，目前一家店抓100樣商品
const getShopItem = async (fetchSize, shopid) => {
  console.log("start fetching items' id");
  const itemlist = [];
  const items_url = `https://shopee.tw/api/v4/search/search_items?by=pop&limit=${fetchSize}&match_id=${shopid}&order=desc&page_type=shop&scenario=PAGE_OTHERS&version=2`;
  const response = await fetch(items_url);
  const itemsJSON = await response.json();
  const items = itemsJSON.items;
  const itemids = items.map((item) => item.itemid);
  // console.log(itemids)

  const data_save = await JSON.stringify(itemids);
  try {
    await fs.outputFile(
      `D:/shopee/shop_${shopid}/itemids/itemids_${fetchSize}.json`,
      data_save
    );
  } catch (err) {
    console.log(err);
  }
  console.log("fetching item ids done");
};

// 獲取商品資訊
const fetchProduct = async (itemid, shopid) => {
  console.log("start fetching product");
  // product的部分
  const product_url_v4 = `https://shopee.tw/api/v4/item/get?itemid=${itemid}&shopid=${shopid}`;
  const productResponse = await fetch(product_url_v4);
  const productRes = await productResponse.json();
  const productData = productRes.data;

  const productPost = {
    sp_itemid: productData.itemid,
    sp_shopid: productData.shopid,
    name: productData.name,
    content: productData.description,
    labels: productData.categories.map((cat) => {
      return { labelid: cat.catid, display_name: cat.display_name };
    }),
    feLabels: productData.fe_categories
      ? productData.fe_categories.map((fecat) => {
          return { labelid: fecat.catid, display_name: fecat.display_name };
        })
      : null,
    display: true,
    variation: productData.tier_variations ? productData.tier_variations : null,
    models: productData.tier_variations
      ? productData.models.map((model) => {
          return {
            name: model.name ? model.name : productData.name,
            price: model.price,
            stock: model.stock,
            modelid: model.modelid,
            itemid: model.itemid,
          };
        })
      : null,
    price: productData.price / 100000,
    priceMin: productData.price_min / 100000,
    priceMax: productData.price_max / 100000,
    shipping_free: false,
    historicalSold: productData.historical_sold,
    MonthSold: productData.sold,
    discount: productData.show_discount
      ? (100 - productData.show_discount) / 100
      : 0,
    images: productData.images,
    stock: productData.stock, // 庫存
    rating: productData.item_rating, // 這只有staring跟count，要內容再另外發request
    likes: [],
    // timestamp: // 存入資料庫在放
    // shared:
  };
  // console.log(productPost)

  try {
    const data_save = await JSON.stringify(productData);
    const post_save = await JSON.stringify(productPost);
    await fs.outputFile(
      `D:/shopee/shop_${shopid}/itemsInfo_shopee/${itemid}.json`,
      data_save
    );
    await fs.outputFile(
      `D:/shopee/shop_${shopid}/itemsInfo_tinder/${itemid}.json`,
      post_save
    );
  } catch (err) {
    console.log(err);
  }

  console.log("fetching product done");
};

//獲取商品評價資訊，先拿59個，因為蝦皮一次最多59個
const getRatings = async (shopid, itemid, offset, limit) => {
  console.log("Fetching: ",itemid)
  const rating_url = `https://shopee.tw/api/v2/item/get_ratings?filter=0&flag=1&itemid=${itemid}&limit=${limit}&offset=${offset}&shopid=${shopid}&type=0`
  const response = await fetch(rating_url)
  const ratingJSON = await response.json()
  const ratings = await ratingJSON.data.ratings;
  // console.log(ratings)
  if(ratings==null){
    return
  }
  const ratings_save = await ratings.map(rating => {
    return {
      sp_orderid: rating.orderid,
      sp_itemid: rating.itemid,
      ctime: rating.ctime,
      rating_star: rating.rating_star,
      buyerid: rating.userid,
      shopid: rating.shopid,
      comment: rating.comment,
      buyerPic: rating.author_portrait,
      images: rating.images? rating.images: [],
      product_items: rating.product_items?rating.product_items:[] 
    }
  })
  // console.log(ratings[0])

  try {
    await fs.outputFile(`D://shopee/shop_${ratings[0].shopid}/ratings_shopee/${itemid}_ratings.json`, JSON.stringify(ratings))
    await fs.outputFile(`D://shopee/shop_${ratings[0].shopid}/ratings_tinder/${itemid}_ratings.json`, JSON.stringify(ratings_save))
  } catch (error) {
    console.log("something go wrong ",itemid)
  }

  console.log("fetch rating done")
}

// 獲取商店資訊
const fetchShop = async (shopid) => {
  console.log("Starting fetch shop data");
  // shop部分
  const shop_url = `https://shopee.tw/api/v4/shop/get_shop_detail?shopid=${shopid}`;
  const shopResponse = await fetch(shop_url);
  const shopJson = await shopResponse.json();
  const shopData = shopJson.data;
  // const shop_save = await JSON.stringify(shopData)

  const shop = {
    sp_shopid: shopData.shopid,
    name: shopData.name,
    itemcount: shopData.item_count,
    role: "shop",
    account: shopData.account.username,
    password: "shopeetest",
    profilePic: shopData.cover,
    selfIntro: shopData.description,
    // productPost: 根據shopID拿,
    // productCount: 等等看一家點要拿多少資料,
    follower: {
      buyer: [{ buyerid: null, buyerPic: null }],
      shop: [{ shopid: null, shopPic: null }],
      count: 0,
    },
    following: {
      buyer: [{ buyerid: null, buyerPic: null }],
      shop: [{ shopid: null, shopPic: null }],
      count: 0,
    },
    rating: {
      ratingStar: shopData.rating_star, // 先用蝦皮的
      ratingBad: shopData.rating_bad, // 先用蝦皮的
      ratingNormal: shopData.rating_normal, // 先用蝦皮的
      ratingGood: shopData.rating_good, // 先用蝦皮的
    },
    shared: [
      {
        postid: null,
        buyerid: null,
      },
    ],
    // productList: [] // 到時候用virtual關聯
    // timestamp: true,
  };
  // console.log(JSON.stringify(shop))
  const shop_save = await JSON.stringify(shopData);
  console.log(shop.name);
  await fs.outputFile(
    `D:/shopee/shop_${shopid}/shopInfo_${shopid}_${shop.name.replaceAll(
      "/",
      ""
    )}.json`,
    shop_save
  );
  await fs.outputFile(
    `D:/shopee/shop_${shopid}/shopInfo_${shopid}_post.json`,
    JSON.stringify(shop)
  );

  console.log("fetching shop data done");
};

// 透過shopid跟要讀的數量讀取itemid
const readIDs = async (shopid, amount) => {
  console.log("Reading ids from folder");
  try {
    const itemids = await fs.readJSON(
      `D:/shopee/shop_${shopid}/itemids/itemids_${amount}.json`
    );
    // console.log(itemids)
    return itemids;
  } catch (err) {
    console.log(err);
    return err;
  }
  console.log("Read done");
};

// 更新已經抓下來的商品資料用
const update_product_to_tinder = async (itemid, shopid) => {
  const productData = await fs.readJSON(
    `D:/shopee/shop_${shopid}/itemsInfo_shopee/${itemid}.json`
  );

  const productPost = {
    sp_itemid: productData.itemid,
    sp_shopid: productData.shopid,
    name: productData.name,
    content: productData.description,
    labels: productData.categories.map((cat) => {
      return { labelid: cat.catid, display_name: cat.display_name };
    }),
    feLabels: productData.fe_categories
      ? productData.fe_categories.map((fecat) => {
          return { labelid: fecat.catid, display_name: fecat.display_name };
        })
      : null,
    display: true,
    variation: productData.tier_variations ? productData.tier_variations : null,
    models: productData.tier_variations
      ? productData.models.map((model) => {
          return {
            name: model.name ? model.name : productData.name,
            price: model.price,
            stock: model.stock,
            modelid: model.modelid,
            itemid: model.itemid,
          };
        })
      : null,
    price: productData.price / 100000,
    priceMin: productData.price_min / 100000,
    priceMax: productData.price_max / 100000,
    shipping_free: false,
    historicalSold: productData.historical_sold,
    monthSold: productData.sold,
    discount: productData.show_discount
      ? (100 - productData.show_discount) / 100
      : 0,
    images: productData.images,
    stock: productData.stock, // 庫存
    rating: productData.item_rating, // 這只有staring跟count，要內容再另外發request
    likes: [],
    // timestamp: // 存入資料庫在放
    // shared:
  };

  try {
    const post_save = await JSON.stringify(productPost);
    await fs.outputFile(
      `D:/shopee/shop_${shopid}/itemsInfo_tinder/${itemid}.json`,
      post_save
    );
  } catch (err) {
    console.log(err);
  }
};

// 更新商店資訊用
const update_shop_to_tinder = async (shopid) => {
  const oriData = await fs.readJSON(
    `D:/shopee/shop_${shopid}/shopInfo_${shopid}_post.json`
  )
  const shopData = await fs.readJSON(
    `D:/shopee/shop_${shopid}/shopInfo_${shopid}_${oriData.name}.json`
  );

  const shop = {
    sp_shopid: shopData.shopid,
    name: shopData.name,
    itemcount: shopData.item_count,
    role: "shop",
    account: shopData.account.username,
    password: "shopeetest",
    profilePic: shopData.cover,
    selfIntro: shopData.description,
    // productPost: 根據shopID拿,
    // productCount: 等等看一家點要拿多少資料,
    follower: {
      buyer: [{ buyerid: null, buyerPic: null }],
      shop: [{ shopid: null, shopPic: null }],
      count: 0,
    },
    following: {
      buyer: [{ buyerid: null, buyerPic: null }],
      shop: [{ shopid: null, shopPic: null }],
      count: 0,
    },
    rating: {
      ratingStar: shopData.rating_star, // 先用蝦皮的
      ratingBad: shopData.rating_bad, // 先用蝦皮的
      ratingNormal: shopData.rating_normal, // 先用蝦皮的
      ratingGood: shopData.rating_good, // 先用蝦皮的
    },
    shared: [
      {
        postid: null,
        buyerid: null,
      },
    ]
    // productList: [] // 到時候用virtual關聯
    // timestamp: true,
  };

  await fs.outputFile(
    `D:/shopee/shop_${shopid}/shopInfo_${shopid}_post.json`,
    JSON.stringify(shop)
  );
};

// getShopItem(100, "191096305")
// fetchShop("267479790")
export {
  getShopItem,
  fetchProduct,
  fetchShop,
  readIDs,
  getRatings,
  update_product_to_tinder,
  update_shop_to_tinder,
};

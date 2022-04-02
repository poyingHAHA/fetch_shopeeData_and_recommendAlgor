import "./db/tinder_app_db.js";
import fs from "fs-extra";

import Shop from "./models/shop.js";
import ProductPost from "./models/productPost.js";
import Rating from "./models/Rating.js";

// shop database manipulation-------------------------------------------------------

const addShop = async (shopid) => {
  const data = await fs.readJSON(
    `D:/shopee/shop_${shopid}/shopInfo_${shopid}_post.json`
  );
  const shop = new Shop(data);
  shop
    .save()
    .then(() => {
      console.log("saved");
      console.log(shop);
    })
    .catch((err) => {
      console.log(err);
    });
};


//Rating databases manipulation----------------------------------------------------

const addRatings = async (itemid, sp_itemid, shopid, sp_shopid, items, idx) => {
  try {
    const ratingsData = await fs.readJSON(
      `D:/shopee/shop_${sp_shopid}/ratings_tinder/${sp_itemid}_ratings.json`
    );
    ratingsData.forEach((rating) => {
      (rating.itemid = itemid), (rating.shopid = shopid);
    });
  
    const ratings = new Rating({
      itemid: itemid,
      shopid: shopid,
      sp_shopid: sp_shopid,
      sp_itemid: sp_itemid,
      ratings: ratingsData,
    });
  
    await ratings.save().then(() => {
        console.log("saved");
        if (idx == items.length - 1) {
          console.log("last one done");
        }
      }).catch((err) => {
        console.log(err);
      })
  } catch (err) {
    console.log(err)
  }
};

// productPost databasse manipulation-----------------------------------------------

const addProducts = async (sp_itemid, sp_shopid, shopInfo, items, idx) => {
  const data = await fs.readJSON(
    `D:/shopee/shop_${sp_shopid}/itemsInfo_tinder/${sp_itemid}.json`
  );

  const productPost = new ProductPost({
    ...data,
    shopid: shopInfo._id,
  });

  await productPost.save().then(() => {
      if (idx == items.length - 1) {
        console.log("last one done");
      }
    }).catch((err) => {
      console.log(err);
    });
};

//測試------------------------------------------------------------------------------

// 目前 fs 中所有的shop
const shops = await fs.readdir("D:/shopee");

// 刪除shops所有資料
// await Shop.deleteMany({})

// 刪除productPosts所有資料
// await ProductPost.deleteMany({})

// 刪除所有Rating資料
// await Rating.deleteMany({})

// 更新商品與評論用
// shops.forEach(async (shop) => {
//   const sp_shopid = shop.replace("shop_", "");
//   const shopInfo = await Shop.findOne({ sp_shopid: +sp_shopid });
//   const items = await fs.readdir(`D:/shopee/shop_${sp_shopid}/itemsInfo_tinder`);
//   items.forEach(async (sp_itemid, idx) => {
//     sp_itemid = sp_itemid.replace('.json', '')
//     await addProducts(sp_itemid, sp_shopid, shopInfo, items, idx)
    
//     const item = await ProductPost.findOne({ sp_itemid: +sp_itemid });
//     const itemid = item._id;
//     addRatings(itemid, sp_itemid, shopInfo._id, sp_shopid, items, idx);
//   });
// });

// 更新商店資訊用
// shops.forEach(shop=>{
//   const id = shop.replace('shop_', '')
//   console.log(id)
//   addShop(id)
// })
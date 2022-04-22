import fs from "fs";
import {
  getShopItem,
  fetchProduct,
  fetchShop,
  readIDs,
  update_product_to_tinder,
  update_shop_to_tinder,
  getRatings,
} from "./fetch_shopee1.js";
import {
  shoes,
  exeshop,
  mclothes,
  fClothes,
  cosmetics,
  baby,
  fbag,
  mbag,
  accessories,
  household,
  food,
  car,
  gameNcollection,
  pet,
  phone,
  pc,
  appliance,
  creative
} from "./shops.js";

const shops = [shoes, exeshop, mclothes, fClothes, cosmetics, baby, fbag, mbag, accessories, household, food,
  car, gameNcollection, pet, phone, pc, appliance, creative]

// const product_url_v4 = "https://shopee.tw/api/v4/item/get?itemid=6916925903&shopid=191096305"
// const product_url_v2 = "https://shopee.tw/api/v2/item/get?itemid=6916925903&shopid=191096305"
// const rating_url = "https://shopee.tw/api/v2/item/get_ratings?filter=0&flag=1&itemid=6916925903&limit=6&offset=0&shopid=191096305&type=0"
// const shop_url = "https://shopee.tw/api/v4/shop/get_shop_detail?shopid=191096305"


// 讀取目前已經有的店家
const read_dirs = fs.readdirSync("D:/shopee").map((dir) => dir.replace("shop_", ""));

// 檢查商店是否已經存在資料夾
const checkShop = async(shopid) => {
  // check if already been fetched
  const tocheck = shopids[i].toString()
  if( read_dirs.indexOf(tocheck) > -1 ){
      console.log(shopids[i], "had already done")
      return true
  }  
}

const fetch_shopee = async (shopid) => {
  const shop = await fetchShop(shopid);
  await getShopItem(100, 100, shop.itemCount, shopid);
  const itemids = await readIDs(shopid, shop.itemCount);
  console.log(itemids)
  for (let i = 0; i < itemids.length; i++) {
    fetchProduct(itemids[i], shopid);
  }
};
// fetch_shopee('142427276')

// 爬取蝦皮資料用
// for(let i=0; i<shopids.length; i++){
//     // check if already been fetched
//     const tocheck = shopids[i].toString()
//     if( read_dirs.indexOf(tocheck) > -1 ){
//         console.log(shopids[i], "had already done")
//         continue
//     }
//     fetch_shopee(shopids[i])
// }

// 更新蝦皮商品資料與爬取品論
// for (let i = 0; i < shopids.length; i++) {
//   console.log("shop: ", shopids[i]);
//   const items = fs.readdirSync(`D:/shopee/shop_${shopids[i]}/itemsInfo_shopee`);
//     // console.log(items);
//   for (let j = 0; j < items.length; j++) {
//     const item = +items[j].replace(".json", "");
//     console.log(item);
//     // update_product_to_tinder(item, shopids[i]);
//     getRatings(shopids[i], item, 0, 59);
//   }
// }

//更新蝦皮店家資料用
// for (let i = 0; i < shopids.length; i++) {
//     update_shop_to_tinder(shopids[i])
//     console.log("done")
// }

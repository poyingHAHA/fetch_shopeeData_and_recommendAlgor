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

// const product_url_v4 = "https://shopee.tw/api/v4/item/get?itemid=6916925903&shopid=191096305"
// const product_url_v2 = "https://shopee.tw/api/v2/item/get?itemid=6916925903&shopid=191096305"
// const rating_url = "https://shopee.tw/api/v2/item/get_ratings?filter=0&flag=1&itemid=6916925903&limit=6&offset=0&shopid=191096305&type=0"
// const shop_url = "https://shopee.tw/api/v4/shop/get_shop_detail?shopid=191096305"

const shopids = [
//   191096305, // adidas
  79684414, // gap
  37004578, // L'Oréal Paris巴黎萊雅
  // 76650281, // DR.WU官方旗艦店
  // 364159, // KIMIS零食泡麵美妝台灣快速出貨
  // 5321159, // 艾比百貨 Abby生活百貨
  // 68758442, // ASUS華碩旗艦店
  // 4862389, // DaPoLuLuMi@露營中毒本鋪--蝦皮旗艦店
  // 24726251, // Vitos Lifestyle 飛拓思
  // 292252839, // Lululemon 瑜伽健身 高品質高質量版原廠店
  // 17133621, // BLADEZ X BH 官方旗艦店
  // 3782790, // 悠遊戶外-Camp Plus 天幕露營精品專門店
  // 253406451, // KANGOL官方授權旗艦店 - PPBOX
  // 107927509, // anello 官方旗艦店
];

const read_dirs = fs.readdirSync("D:/shopee").map((dir) => dir.replace("shop_", ""));

const fetch_shopee = async (shopid) => {
  await fetchShop(shopid);
  await getShopItem(100, shopid);
  const itemids = await readIDs(shopid, 100);
  for (let i = 0; i < itemids.length; i++) {
    fetchProduct(itemids[i], shopid);
  }
};

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
//     update_product_to_tinder(item, shopids[i]);
//     // getRatings(shopids[i], item, 0, 59);
//   }
// }

//更新蝦皮店家資料用
for (let i = 0; i < shopids.length; i++) {
    update_shop_to_tinder(shopids[i])
    console.log("done")
}

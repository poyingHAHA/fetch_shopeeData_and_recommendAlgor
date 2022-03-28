import ws from "./word_similarity_test1.js";

let str1 =
  "熱銷超舒適 汽車枕頭 記憶枕 枕頭 頸枕 護頸枕 汽車靠枕 頭枕 車枕 腰靠墊 靠墊 椅背墊 腰枕 汽車靠墊";
let str2 =
  "『台灣現貨免運-可拆卸』腰靠 汽車頭枕 頭枕 頸枕 汽車腰靠 腰靠墊 靠枕 靠墊 汽車靠枕 腰靠枕 汽車靠墊 車枕 記憶";
let str3 =
  "HD5 車用MP3 藍牙 車用藍芽 播音樂 藍芽 接收器 3.1A快速充電 車用藍牙 汽車百貨 車用 車充";
let str4 =
  "卡通華碩zenfone6 5 5z zs630kl ze620kl x00tdb x01ad max pro m1手機殼";

const test12 = new ws(str1, str2);
const test13 = new ws(str1, str3);
const test14 = new ws(str1, str4);

console.log(test12.run());
console.log(test13.run());
console.log(test14.run());

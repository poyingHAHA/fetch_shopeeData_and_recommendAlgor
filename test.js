let cat = [
  {
    catid: 100630,
    display_name: "美妝保養",
    no_sub: false,
    is_default_subcat: false,
  },
  {
    catid: 100664,
    display_name: "肌膚保養",
    no_sub: false,
    is_default_subcat: false,
  },
  {
    catid: 100893,
    display_name: "乳液、乳霜",
    no_sub: true,
    is_default_subcat: false,
  },
];



const m_cat = cat.map((cat) => {
  return {
    catid: cat.catid,
    display_name: cat.display_name,
  };
});

console.log(m_cat)
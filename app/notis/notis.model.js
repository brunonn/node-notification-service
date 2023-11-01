exports.NOTI_TYPE = {
  NEW_MESSAGE: "NEW_MESSAGE",
};

function customNotiRes(noti) {
  return {
    ...noti,
    title: "new title from " + noti.args.userName,
    content: "new content",
  };
}

exports.notiRes = function notiRes(data) {
  return data.map(customNotiRes);
};

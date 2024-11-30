const { Firestore } = require("@google-cloud/firestore");

async function historiesHandler(request, h) {
  try {
    const db = new Firestore({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.PATH_SERVICE_KEY,
    });
    const predictCollection = await db.collection("predictions").get();
    let histories = [];
    predictCollection.forEach((doc) => {
      histories.push(doc.data());
    });
    const response = h.response({
      status: "success",
      data: histories,
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error("Error getting documents", error);
  }
}

module.exports = historiesHandler;

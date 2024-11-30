const tf = require("@tensorflow/tfjs-node");
const ClientError = require("../exceptions/error");

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeJpeg(image).resizeNearestNeighbor([224, 224]).expandDims().toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const classes = ["Cancer", "Non-cancer"];
    const classResult = Math.max(...score) * 100 > 50 ? classes[0] : classes[1];
    const label = classResult;
    let suggestion;

    if (label === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    } 
    if (label === "Non-cancer") {
      suggestion = "Penyakit kanker tidak terdeteksi.";
    }
    return { label, suggestion };
  } catch (error) {
    throw new ClientError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;

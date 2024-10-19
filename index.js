require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const { getNextImage, deleteImage  } = require("./utilities");



const tweet = async () => {
    try {
        const imagePath = await getNextImage();

        if (imagePath) {
            const mediaId = await twitterClient.v1.uploadMedia(imagePath);
            await twitterClient.v2.tweet({
                text: 'Texto\n'+
                '\n'+
                "Texto\n"+
                '\n'+
                'Texto\n'+
                '\n'+
                "Texto",
                media:{
                    media_ids: [mediaId]
                }
            });
            
            console.log(`Imagen cargada y tweeted con éxito: ${imagePath}`);

            // Eliminar la imagen después de subirla
            await deleteImage(imagePath);
            console.log(`Imagen eliminada: ${imagePath}`);
        } else {
            console.log("No se encontraron archivos de imagen para cargar.");
        }
    } catch (e) {
        console.log(e);
    }
};

//Esta funcion es la encargada del tiempo de ejecucion te recomiento visitar cron.guru para que cambies el parametro 

const cronTweet = new CronJob(" */30 * * * * ", async () => {
    tweet();
});

cronTweet.start();
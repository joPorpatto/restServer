const  mongoose = require("mongoose")


const dbConnection = async() =>{

        try {

                await mongoose.connect(process.env.MONGODB_ATLAS_CNN,{

                        useNewUrlParser : true,
                        useUnifiedTopology: true,
                        
                } )  
                console.log('base de datos online')

        } catch (error) {
                console.log(error)
                throw new Error('Error a la  hora de inicializar la base de datos');
        }

}


module.exports = {
        dbConnection
}
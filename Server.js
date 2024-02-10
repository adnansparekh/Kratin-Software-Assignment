const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const fs = require('fs').promises; 
const path = require('path'); 

app.get("/userdata/",async(req,res)=>{
    const {city,bpLevel,sugarLevel} = req.query;

console.log(city);
try{
    const hospitalData = await loadHospitalData();
    if(bpLevel > 140 || sugarLevel > 126){
        const filteredHospitals = hospitalData.filter(hospital => hospital.District === city);
        console.log(filteredHospitals);
        res.json({
            message: "Considering your health parameters, It would be good to visit a nearby hospital",
            hospitals : filteredHospitals})
    }else if((bpLevel >= 120 && bpLevel <= 139) || (sugarLevel >=100 && sugarLevel <= 126)){
        const filteredHospitals = hospitalData.filter(hospital => hospital.District === city);
        res.json({ 
            message: "Considering your health parameters, It would be good to visit a nearby hospital",
            hospitals: filteredHospitals 
        });
    }
    else{
        res.json({message: "Everything looks good"})
    }
}
catch(err){
    res.status(500).json({message: 'Server error'});
}

});

async function loadHospitalData() {
    try {
        const filePath = 'C:/Users/AWAYS.SAUDAGAR/Desktop/Adnan/hospital_database-may_2016_1.json';
        const data = await fs.readFile(filePath, 'utf8'); 
        return JSON.parse(data); 
    } catch (err) {
        throw new Error('Error loading hospital data');
    }
}

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});



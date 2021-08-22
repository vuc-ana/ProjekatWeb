import {Restoran} from "./Restoran.js"

//const restoran=new Restoran("Madam",4,5,4);
//restoran.crtajRestoran(document.body);

fetch("https://localhost:5001/Restoran/PreuzmiRestorane").then(p=>
{
    p.json().then(data=>
        {
           data.forEach(restoran => {
               const Restoran1=new Restoran(restoran.id,restoran.naziv,restoran.x,restoran.y,restoran.kapacitet);
               Restoran1.crtajRestoran(document.body);
               restoran.stolovi.forEach(s=>{
                   var sto= Restoran1.stolovi[s.n*Restoran1.x+parseInt(s.m)];
                    
            
                  
                   if(s.maxKapacitet>=s.kapacitet+sto.kapacitet)
                   {
                      sto.popuniSto(s.n,s.m,s.kapacitet, s.n*Restoran1.x + parseInt(s.m));
                      
                   }
               });
               restoran.porudzbine.forEach(p=>{

                var por=Restoran1.porudzbine[p.x*Restoran1.x+parseInt(p.y)];
                 por.azurirajPorudzbinu(p.x*Restoran1.x+parseInt(p.y),p.tip,p.cena,p.redniBroj);
               });
           });
        })

    
});
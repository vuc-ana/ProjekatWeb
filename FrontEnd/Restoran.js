import{Sto} from "./Sto.js"
import{Porudzbina} from "./Porudzbine.js"
export class Restoran
{
    constructor(id,Naziv,x,y,kapacitetStola)
    {
        this.id=id;
        this.Naziv=Naziv;
        this.x=x;
        this.y=y;
        this.kapacitetStola=kapacitetStola;
        this.kontejner=null;
        this.stolovi=[];
        this.porudzbine=[];
    
    
    }
    dodajSto(sto)
    {
        this.stolovi.push(sto);

    }
    dodajPorudzbinu(porudzbina)
    {
        this.porudzbine.push(porudzbina);

    }
    crtajRestoran(host)
    {
       
        if(!host)
        throw new Error("Host ne postoji.");
        
        this.kontejner=document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        this.crtajFormu(this.kontejner);
        this.crtajStolove(this.kontejner);

    }

    crtajFormu(host)
    {
        if(!host)
        throw new Error("Greska,host ne postoji.");
        const kontForma=document.createElement("div");
        kontForma.classList.add("kontForma");
        host.appendChild(kontForma);
        kontForma.style.backgroundImage = "url('poz5.jpg')";
        

        let labela=document.createElement("h3");
        labela.innerHTML="Dobrošli u restoran "+ this.Naziv+"!";
        kontForma.appendChild(labela);
        
        this.crtajFormuIzaberiSto(kontForma);
        this.crtajFormuPoruci(kontForma);

        


    }
    crtajFormuIzaberiSto(host)
    {
        if(!host)
        throw new Error("Greska,host ne postoji.");
        const divIzaberi=document.createElement("div");
        divIzaberi.className="divIzaberi";
        host.appendChild(divIzaberi);

        let labela=document.createElement("label");
        labela.innerHTML="Molimo Vas izaberite sto koji želite. ";
        divIzaberi.appendChild(labela);

        let poljeLabela=["Izaberite red:","Izaberite kolonu:","Izaberite broj ljudi:"];
        let poljeKlasa=["redStola","kolona","brLjudi"];

       poljeLabela.forEach((el,i)=>{
        labela=document.createElement("label");
        labela.innerHTML=el;
        let polje=document.createElement("input");
        polje.type="number";
        polje.style.width="100px";
        polje.className=poljeKlasa[i];
        divIzaberi.appendChild(labela);
        divIzaberi.appendChild(polje);

        

       });

        let dugme=document.createElement("button");
        let dugme2=document.createElement("button");
        let dugme3=document.createElement("button");
        const divDugme=document.createElement("div");
        divDugme.className="divDugme";
        dugme.innerHTML="Izaberi sto";
        dugme2.innerHTML="Oslobodi sto";
        dugme3.innerHTML="Izmeni sto";

        divDugme.appendChild(dugme);
        divDugme.appendChild(dugme2);
        divDugme.appendChild(dugme3);
        divIzaberi.appendChild(divDugme);

        
        dugme.onclick=(ev)=>{
          
            let red=divIzaberi.querySelector(".redStola").value;
            let kolona=divIzaberi.querySelector(".kolona").value;
            let brLjudi=divIzaberi.querySelector(".brLjudi").value;
           
 
        
           if(red==="" || kolona==="" ||brLjudi==="" )
           {
               alert("Molimo Vas da popunite sva polja.");
           }
           
           else if(red<0 || red>this.y || kolona<0 || kolona>this.x)
           {
               alert("Izabrali ste nepostojeći sto.Maksimalni broj reda koji možete izabrati je: "+this.y+" ,a maksimalni broj kolona: "+this.x+". Molimo Vas pokušajte ponovo.");

           }
           
           else if(brLjudi>this.kapacitetStola)
           {
               alert("Žao nam je, nemamo sto za "+brLjudi+" osoba.Zbog epidemioloških mera maksimalni broj osoba za stolom je "+this.kapacitetStola+" .");

           }
          
           else{
              
           
           fetch("https://localhost:5001/Restoran/ZauzmiSto"+this.id,{

           method:"POST",
           headers:{
               "Content-Type" : "application/json"
           },
           body: JSON.stringify({
               n:red,
               m:kolona,
               kapacitet:brLjudi,
               maxKapacitet:this.kapacitetStola
           })

           }).then(p=>{
               if(p.ok)
               {
               
                this.stolovi[this.x*red+parseInt(kolona)].popuniSto(red,kolona,brLjudi,this.x*red+parseInt(kolona));
        
               }

           })
        }
        
          
        }

        dugme2.onclick=(ev)=>
        {
            let red=divIzaberi.querySelector(".redStola").value;
            let kolona=divIzaberi.querySelector(".kolona").value;
            
            if(red>this.y || kolona>this.x)
            {
                alert("Red ili kolona je van opsega.");

            }
           else if( this.stolovi[this.x*red+parseInt(kolona)].kapacitet<=0)
           {
               alert("Ovaj sto nije zauzet.");
               

           }
           else{
         //   this.stolovi[this.x*red+parseInt(kolona)].oslobodiSto(this.x*red+parseInt(kolona));
             fetch("https://localhost:5001/Restoran/OslobodiSto/"+red+"/"+kolona+"/"+this.id,{
                        method: "DELETE"
                    }).then(resp=>{
                        if(resp.ok){
                            location.reload();
                        }
                     }).catch (err=>{
                          console.log(err);
                     });
           }

           
           

         
        }
        
        dugme3.onclick=(ev)=>
        {
            let red=divIzaberi.querySelector(".redStola").value;
            let kolona=divIzaberi.querySelector(".kolona").value;
            let brLjudi=divIzaberi.querySelector(".brLjudi").value;
            if(brLjudi>this.kapacitetStola)
            {
                
                alert("Zao mi je, ne mozete promeniti broj ljudi za ovim stolom jer ovaj broj je van opsega dozvoljenog.");
            }
            else
            {

               // this.stolovi[this.x*red+parseInt(kolona)].izmeniSto(this.x*red+parseInt(kolona),brLjudi);

               fetch("https://localhost:5001/Restoran/IzmeniSto/"+red+"/"+kolona+"/"+brLjudi+"/"+this.id,{
                        method: "PUT"
                    }).then(resp=>{
                        if(resp.ok){
                            location.reload();
                        }
                     }).catch(err=>{
                          console.log(err);
                     });
                

            }

        }
       
    
    }
    
    crtajStolove(host)
    {
        if(!host)
        throw new Error("Greska, host ne postoji.");

        const kontStolovi=document.createElement("div");
        kontStolovi.className="kontStolovi";
        host.appendChild(kontStolovi);
        kontStolovi.style.backgroundImage = "url('pozadina3.jpg')";
    
        let red;
        let kolona;
        let sto;
        for(let i=0;i<this.y;i++)
        {
            red=document.createElement("div");
            red.classList.add("red");
           
            
           kontStolovi.appendChild(red);
            for(let j=0;j<this.x;j++)
            {
                
                sto=new Sto(i,j,this.kapacitetStola);
                this.dodajSto(sto);
                sto.crtajSto(red,i*this.x+parseInt(j));
            }
        }
    }

    crtajFormuPoruci(host)
    {
               
        if(!host)
        throw new Error("Host ne postoji.");
        
        const kontejnerPoruci=document.createElement("div");
        kontejnerPoruci.classList.add("kontejnerPoruci");
        host.appendChild(kontejnerPoruci);

        let labela=document.createElement("h3");
        labela.innerHTML="Porucite:";
        kontejnerPoruci.appendChild(labela);
        
        labela=document.createElement("label");
        labela.innerHTML="Broj stola koji poručuje:";
        kontejnerPoruci.appendChild(labela);

        let redniBroj=document.createElement("select");
        let option;
        kontejnerPoruci.appendChild(redniBroj);
        for(let i=0;i<this.x*this.y;i++)
        {
            option=document.createElement("option");
            
            option.innerHTML=i;
            option.value=i;
            redniBroj.appendChild(option);
           
            
        }
        labela=document.createElement("label");
        labela.innerHTML="Tip porudzbine:";
        
        let tipPor=document.createElement("select");
        kontejnerPoruci.appendChild(labela);
        kontejnerPoruci.appendChild(tipPor);

        let tipovi=["Hrana","Piće","Hrana-Piće"];
        let opcija;
        tipovi.forEach(el=>
            {
                option=document.createElement("option");
                option.innerHTML=el;
                tipPor.appendChild(option);
            })
        
        labela=document.createElement("label");
        labela.innerHTML="Unesite cenu ove porudzbine:";
        kontejnerPoruci.appendChild(labela);

        let polje=document.createElement("input");
        polje.type="number";
        polje.className="cena";
        kontejnerPoruci.appendChild(polje);

        let dugme =document.createElement("button");
        dugme.innerHTML="Dodaj porudzbinu.";
        kontejnerPoruci.appendChild(dugme);
        
        this.crtajPorudzbine(kontejnerPoruci);
        let i=1;
        let sto=redniBroj.value;

        

        dugme.onclick=(ev)=>{
           

           let sto=redniBroj.value;
            let tippor=tipPor.value;
            let cenaPor=kontejnerPoruci.querySelector(".cena").value;   
            let x1=this.porudzbine[sto].n;
            let x2=this.porudzbine[sto].m;
        
            if(this.stolovi[x1*this.x+parseInt(x2)].kapacitet==0)
            {
                alert("Greska, ne mozete dodati porudzbinu za prazan sto!");

            }
            else
            {

          
            fetch("https://localhost:5001/Restoran/DodajPorudzbinu"+this.id,{

           method:"POST",
           headers:{
               "Content-Type" : "application/json"
           },
           body: JSON.stringify({
               redniBroj:i++,
               cena:cenaPor,
               x:x1,
               y:x2,
               tip:tippor
               
           })

           }).then(p=>{
               if(p.ok)
               {
               
                this.porudzbine[sto].azurirajPorudzbinu(sto,tippor,cenaPor,i++);
        
               }

           }) 
        }
        }
        labela=document.createElement("label");
        labela.innerHTML="Unesite broj stola koji otkazuje porudzbinu";
        kontejnerPoruci.appendChild(labela);

        polje=document.createElement("input");
        polje.type="number";
        polje.className="brOtkazuje";
        kontejnerPoruci.appendChild(polje);

        dugme =document.createElement("button");
        dugme.innerHTML="Otkazi porudzbinu";
        kontejnerPoruci.appendChild(dugme);

        dugme.onclick=(ev)=>
        {
            let sto=kontejnerPoruci.querySelector(".brOtkazuje").value;
            let red=this.porudzbine[sto].n;
            let kolona=this.porudzbine[sto].m;           
           // this.porudzbine[sto].otkaziPorudzbinu();
           
           {
            fetch("https://localhost:5001/Restoran/OtkaziPorudzbinu/"+red+"/"+kolona,{
                method: "DELETE"
            }).then(resp=>{
                if(resp.ok){
                    location.reload();
                }
             }).catch(err=>{
                  console.log(err);
             });
           }

        }


    }

    crtajPorudzbine(host)
    {
        const kontPorudzbine=document.createElement("div");
        kontPorudzbine.classList.add("kontPorudzbine");
        host.appendChild(kontPorudzbine);
        
        let red;
        let kolona;
        let porudzbina;
        for(let i=0;i<this.y;i++)
        {
            red=document.createElement("div");
            red.classList.add("red");
           
            
           kontPorudzbine.appendChild(red);
            for(let j=0;j<this.x;j++)
            {
                
                porudzbina=new Porudzbina(i,j,"","","");
                this.dodajPorudzbinu(porudzbina);
                porudzbina.crtajPorudzbinu(red,i*this.x+parseInt(j));
            }
        }

    }

}
export class Porudzbina{

    constructor(n,m,redniBroj,cena,tip)
    {
        this.n=n;
        this.m=m;
        this.redniBroj=redniBroj;
        this.cena=0;
        this.tip=tip;
        this.kontejnerPor=null;

    }
    crtajPorudzbinu(host,n)
    {

        this.kontejnerPor=document.createElement("div");
        this.kontejnerPor.className="kontejnerPor";
        this.kontejnerPor.innerHTML=n;
        host.appendChild(this.kontejnerPor);
        this.kontejnerPor.onclick=(ev)=>
        {
            if(this.cena==0)
            {
                alert("Za ovaj sto nema porudzbina.");

            }
            else
            {
                alert("Tip porudzbine je: "+this.tip+", a konacna cena:"+this.cena+".");
            }
        }

    }
    azurirajPorudzbinu(sto,tip,cena,i)
    {
        this.kontejnerPor.className="porudzbina";
        this.redniBroj=i;
        this.cena+=parseInt(cena);
        this.tip=tip;
    }
    otkaziPorudzbinu()
    {
        this.kontejnerPor.className="kontejnerPor";
        this.redniBroj=0;
        this.cena=0;
        this.tip="";
    }

}
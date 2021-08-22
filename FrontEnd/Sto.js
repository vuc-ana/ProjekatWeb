export class Sto
{
    constructor(n,m,maxKapacitet)
    {
        this.n=n;
        this.m=m;
        this.kapacitet=0;
        this.maxKapacitet=maxKapacitet;
        this.kontejnerSto=null;

    }

    crtajSto(host,n)
    {

        this.kontejnerSto=document.createElement("div");
        this.kontejnerSto.className="kontejnerSto";
        this.kontejnerSto.innerHTML="Prazan sto broj "+n+".";
        host.appendChild(this.kontejnerSto);
    }
    popuniSto(red,kolona,brLjudi,n)
    {
        if(this.kapacitet>0)
        {
            alert("Žao nam je, sto je vec zauzet.");
        }
        else{
            this.kapacitet=parseInt(brLjudi);
           // this.kontejnerSto.className="ZauzetiSto";
            this.kontejnerSto.innerHTML="Zauzet sto broj "+n+".Broj ljudi:"+this.kapacitet;
            this.kontejnerSto.style.backgroundColor="black";
        }

    }
    oslobodiSto(n)
    {
        this.kapacitet=0;
        this.kontejnerSto.className="SlobodniSto";
        this.kontejnerSto.innerHTML="Prazan sto broj "+n+".";

    }
    izmeniSto(n,m)
    {
        this.kapacitet+=parseInt(m);
        this.kontejnerSto.innerHTML="Zauzet sto broj "+n+".Broj ljudi:"+this.kapacitet;
    }
}
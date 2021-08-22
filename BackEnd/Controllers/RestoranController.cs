using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
//using System.Collections.Generic;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RestoranController : ControllerBase
    {
        public RestoranContext Context { get; set; }

        public RestoranController(RestoranContext context)
        {
            Context=context;
        }
        [Route("PreuzmiRestorane")]
        [HttpGet]
        public async Task< List<Restoran>> PreuzmiRestorane()
        {
            return await Context.Restorani.Include(p=>p.Stolovi ).Include(p=>p.Porudzbine).ToListAsync();

        }
        [Route("UpisiRestoran")]
        [HttpPost]
        public async Task UpisiVrtove([FromBody] Restoran restoran)
        {
           Context.Restorani.Add(restoran);
           await Context.SaveChangesAsync();

        }
        [Route("IzmeniRestoran")]
        [HttpPut]

        public async Task IzmeniRestoran([FromBody]Restoran restoran)
        {
            Context.Update<Restoran>(restoran);
            await Context.SaveChangesAsync();


        }
        [Route("IzbrisiRestoran/{id}")]
        [HttpDelete]

        public async Task IzbrisiRestoran(int id)
        {

           var rest=await Context.Restorani.FindAsync(id);
           Context.Restorani.Remove(rest);
            await Context.SaveChangesAsync();


        }

        [Route("ZauzmiSto{id}")]
        [HttpPost]
        public async Task ZauzmiSto(int id,[FromBody] Sto sto)
        {
           var rest=await Context.Restorani.FindAsync(id);
           sto.Restoran=rest;
           Context.Stolovi.Add(sto);
           
           await Context.SaveChangesAsync();

        }
        [Route("OslobodiSto/{n}/{m}/{id}")]
        [HttpDelete]

        public async Task OslobodiSto(int n,int m,int id)
        {

            var sto=await Context.Stolovi.Where( s=> s.N==n && s.M==m && s.Restoran.ID==id).FirstOrDefaultAsync();
            Context.Stolovi.Remove(sto);
            await Context.SaveChangesAsync();


        }

        
        [Route("IzmeniSto/{n}/{m}/{brLjudi}/{id}") ]
        [HttpPut]

        public async Task IzmeniSto(int n,int m,int brLjudi,int id)
        {
            var sto=await Context.Stolovi.Where( s=> s.N==n && s.M==m && s.Restoran.ID==id).FirstOrDefaultAsync();
                       
            sto.Kapacitet=brLjudi;
            await Context.SaveChangesAsync();


        }

        [Route("DodajPorudzbinu{id}")]
        [HttpPost]
        public async Task DodajPorudzbinu(int id,[FromBody] Porudzbina porudzbina)
        {
           var rest=await Context.Restorani.FindAsync(id);
           porudzbina.Restoran=rest;
           Context.Porudzbine.Add(porudzbina);
           
           await Context.SaveChangesAsync();

        }
        [Route("OtkaziPorudzbinu/{n}/{m}")]
        [HttpDelete]

        public async Task OtkaziPorudzbinu(int n,int m)
        {

           
            var por=await Context.Porudzbine.Where( s=> s.X==n && s.Y==m).FirstOrDefaultAsync();
            Context.Porudzbine.Remove(por);
            await Context.SaveChangesAsync();



        }

       
    }
}
